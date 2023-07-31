<template>
    <div>
      <div class="ubicacion-gps" :style="ubicacionGpsStyles" @click="centrarMapa">
      </div>
      <div v-show="!direccionExpanded" class="direccion-title" :style="direccionStyles" @click="direccionExpandedTogle">
        {{this.buscarPorTitulo(this.usuarioActual).direccion}}
      </div>
      <div v-show="direccionExpanded" class="direccion-expanded" :style="direccionExpandedStyles">
        <div class="direccion-header" >
          <img class="icon3" src="@/assets/svg/close.svg" alt="location1" @click="direccionExpandedTogle"/>
        </div>
        <div class="direccion-header">
          <ListaLocationsUsuarios
        :locationsUsuario="locationsUsuario" 
        :usuarioActual="usuarioActual"
        @cambiar-usuario="cambiarUsuario"
        :style="listaStyles" />
        </div>
        <div class="button-container">
          <button class="custom-button" >
            <span class="text-boton">Agregar nueva dirección</span>
        </button>
        </div>

      </div>
      <div class="switch-locations" :style="switchLocationStyles">
        <div
          class="switch-option"
          :class="{ active: locationsTipo === 'Centros' }"
          @click="setLocationOption('Centros')"
        >
          Urgencias
        </div>
        <div
          class="switch-option"
          :class="{ active: locationsTipo === 'Farmacias' }"
          @click="setLocationOption('Farmacias')"
        >
          Farmacias
        </div>
      </div>
      <div :style="recuadroStyles" :class="{ 'moved': isMoved }">
        <!-- Contenido del recuadro -->
        <div :style="botonStyles" 
        @click="togglePosition" 
        @touchstart="onTouchStart" 
        @touchmove="onTouchMove" 
        @touchend="onTouchEnd"
        @mousedown="onMouseDown">
            <svg width="38" height="13">
                <rect rx="7" ry="7" width="38" height="13" fill="#B2DDEC" />
            </svg>
            <div v-show="locationsTipo == 'Centros'" class="titulo-cuadro-deslizante">Centros de urgencia mas cercanos</div>
            <div v-show="locationsTipo == 'Farmacias'" class="titulo-cuadro-deslizante">Farmacias mas cercanas</div>  
        </div>

        <div class="container-slider">
          <div class="slider-title">
            Distancia máxima 
            <div class="slider-value">{{ sliderValue }} km</div>
          </div>
          <vue-slider v-model="sliderValue" :min="0" :max="10" :height="3" :interval="1" :tooltip="'none'" v-bind="options"/>
          <div v-show="locationsTipo == 'Centros'" class="switch-aforo-tiempo" >
            <div
              class="switch-option2"
              :class="{ active: aforoTiempoTipo === 'aforo' }"
              @click="setAforoTiempoOption('aforo')"
            >
              Aforo
            </div>
            <div
              class="switch-option2"
              :class="{ active: aforoTiempoTipo === 'tiempo' }"
              @click="setAforoTiempoOption('tiempo')"
            >
              Tiempo
            </div>
          </div>
        </div>
        <div  v-show="locationsTipo == 'Centros'"  style="margin-top: 40px;">
          <ListaCentros 
          :locations="locationsCercanas" 
          @mostrar-aforo-centro="mostrarAforoCentro" 
          :style="listaStyles" 
          :soloFavoritos="false"
          :aforoTiempoTipo="aforoTiempoTipo"/>
        </div>
        <div  v-show="locationsTipo == 'Farmacias'"  >
          <ListaFarmacias 
          :locationsFarmacias="locationsFarmaciasCercanas"   
          @mostrar-detalle-farmacia="mostrarDetalleFarmacia" 
          :style="listaStyles"
          :soloFavoritos="false"/>
        </div>
  

      </div>
    </div>
  </template>
  
  <script>
  import ListaCentros from './ListaCentros.vue';
  import ListaLocationsUsuarios from './ListaLocationsUsuarios.vue';
  import ListaFarmacias from './ListaFarmacias.vue';
  export default {
    components:{ListaCentros,ListaFarmacias,ListaLocationsUsuarios},
    props: ['locationsUsuario','usuarioActual','locationsTipo','locations','locationsFarmacias','aforoTiempoTipo'],
    watch:{
      sliderValue: function() {
        this.locationsCercanas = [];
        this.locationsFarmaciasCercanas = [];
        this.locationsCercanas= this.locations.filter((punto) => punto.distancia < this.sliderValue);
        this.locationsCercanas.sort((a, b) => a.distancia - b.distancia);
        this.locationsFarmaciasCercanas= this.locationsFarmacias.filter((punto) => punto.distancia < this.sliderValue);
        this.locationsFarmaciasCercanas.sort((a, b) => a.distancia - b.distancia);
      },
      usuarioActual: function() {
        this.locationsCercanas = [];
        this.locationsFarmaciasCercanas = [];
        this.locationsCercanas= this.locations.filter((punto) => punto.distancia < this.sliderValue);
        this.locationsCercanas.sort((a, b) => a.distancia - b.distancia);
        this.locationsFarmaciasCercanas= this.locationsFarmacias.filter((punto) => punto.distancia < this.sliderValue);
        this.locationsFarmaciasCercanas.sort((a, b) => a.distancia - b.distancia);
      },
    },
    data() {
      return {
        isMobile: false,
        isMoved: false,
        locationsCercanas: [],
        locationsFarmaciasCercanas: [],
        sliderValue: 3,
        top:0,
        left:0,
        cuadroHeight: 0,
        cuadroWidth: 0,
        direccionWidth: 0,
        direccionleft: 0,
        switchTop:0,
        switchLeft:300,
        switchWidth:300,
        gpsTop:0,
        gpsLeft:0,
        initialTop: 93,
        initialLeft: 20,
        defaultLeft: 350,
        defaultTopDesktop: 200,
        defaultTopMobile:160,
        direccionExpanded:false,
        isSwipingUp: false,
        isSwipingDown: false,
        startY: 0,
        options: {
      	dotOptions: [
        {
        	style: {
            "backgroundColor": "#2596BE",
            "border": "0px solid #ffff",
            "boxShadow": "0.5px 0.5px 2px 1px rgba(107,107,107,.36)"
          },
        }],
      },
      };
    },
    mounted() {
    
    this.onResize2()
    this.locationsCercanas= this.locations.filter((punto) => punto.distancia < this.sliderValue);
    this.locationsCercanas.sort((a, b) => a.distancia - b.distancia);
    this.locationsFarmaciasCercanas= this.locationsFarmacias.filter((punto) => punto.distancia < this.sliderValue);
    this.locationsFarmaciasCercanas.sort((a, b) => a.distancia - b.distancia);
    window.addEventListener('resize', this.onResize2, { passive: true })
    document.addEventListener("mousemove",this.onMouseMove)
    document.addEventListener("mouseup", this.onMouseUp)
  },

    computed: {
      recuadroStyles() {
        return {
          width: this.cuadroWidth + 'px',
          height: this.cuadroHeight + 'px',
          borderRadius: '20px',
          backgroundColor: '#ffffff',
          position: 'fixed',
          left: this.left,
          top:this.top,
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          transform: 'translate(-50%, -50%)',
          transition: 'top 0.5s, left 0.5s', // Añadir la transición aquí
          zIndex: 200,
        };
      },
      botonStyles(){ 
        return {
            width: '100%',
            height: '50px',
            opacity: '100%',
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }
      },
      direccionStyles() {
        return {
          height: "50px",
          width: this.direccionWidth,
          left: this.direccionleft,
          top: 10 + 'px',
          /* Agrega aquí otros estilos según tus necesidades */
        };
      },
      switchLocationStyles() {
        return {
          width: this.switchWidth + 'px',
          left: this.switchLeft + 'px',
          top:this.switchTop + 'px',
          /* Agrega aquí otros estilos según tus necesidades */
        };
      },
      listaStyles(){
        if(this.locationsTipo =='Centros'){
          return {
          height: this.cuadroHeight-134 +'px',
          /* Agrega aquí otros estilos según tus necesidades */
        };
        }else{
          return {
          height: this.cuadroHeight-100 +'px',
          /* Agrega aquí otros estilos según tus necesidades */
        };
        }

      },
      direccionExpandedStyles(){
        return {
          position: 'fixed',
          top: 10 + 'px',
          height: this.cuadroHeight-100 +'px',
          width: this.direccionWidth,
          left: this.direccionleft,
          /* Agrega aquí otros estilos según tus necesidades */
        };
      },
      ubicacionGpsStyles(){
        return {
          position: 'fixed',
          top: this.gpsTop + 'px',
          left: this.gpsLeft + 'px',
          height: 48 +'px',
          width: 48 +'px',
          /* Agrega aquí otros estilos según tus necesidades */
        };
      },
    },
    methods: {
      onResize2() {
      this.isMobile = window.innerWidth < 600
      let widthWindow = window.innerWidth //obtenga ancho de ventana
      let heightWindow = window.innerHeight //obtenga alto de ventana
      if (! this.isMobile) {
        this.gpsTop = 11;
        this.gpsLeft = 610;
        this.switchTop  =72 ; //defino altura switch para desktop
        this.switchWidth = 300;  //defino ancho switch para mobile
        this.switchLeft  =200 ; //defino posicion horizontal switch para desktop
        this.direccionleft= 100 +'px'; //se establece posicion en el eje x para la barra de direccion
        this.direccionWidth= 500 +'px'; //se establece ancho de la barra de direccion
        this.initialLeft = this.defaultLeft;
        this.cuadroHeight = 500;
        this.cuadroWidth = 360
        if (!this.isMoved) {
            this.top = heightWindow+this.defaultTopDesktop + 'px' ;
            this.left = this.defaultLeft +'px';
        } else{
            this.top = 370 + 'px' ;
            this.left = this.defaultLeft +'px';
        }
      }
      if (this.isMobile) {
        this.gpsTop = heightWindow-200;
        this.gpsLeft = widthWindow-68;
        this.switchTop  = 72 ; //defino altura switch para mobile
        this.switchWidth = widthWindow-40;  //defino ancho switch para mobile
        this.switchLeft = 20; //defino posicion horizontal switch para mobile
        this.direccionleft= 20 +'px'; //se establece posicion en el eje x para la barra de direccion
        this.direccionWidth= widthWindow - 40 +'px'; //se establece ancho de la barra de direccion
        
        this.initialLeft = widthWindow/2;
        this.cuadroHeight = 600;
        this.cuadroWidth = widthWindow;
        if (!this.isMoved) {
            this.top =  heightWindow+this.defaultTopMobile + 'px' ;
            this.left =  widthWindow/2 +'px';
        } else{
            this.top = 420 +'px';
            this.left = widthWindow/2 +'px';
        }
        
      }
    },
    direccionExpandedTogle(){
      this.direccionExpanded = !this.direccionExpanded;
    },
    togglePosition() {
        let widthWindow = window.innerWidth //obtenga ancho de ventana
        let heightWindow = window.innerHeight //obtenga alto de ventana
        this.isMoved = !this.isMoved;
        if (this.isMoved) {
          // Cambiar a la posición deseada con animación
          if (! this.isMobile) {
          this.top = 370 +'px';
          this.left = this.defaultLeft;
          } else {
            this.top =420 +'px';
            this.left = widthWindow/2 +'px';
          }
        } else {
          // Volver a la posición original con animación
          if (! this.isMobile) { //caso desktop
            this.top = heightWindow+ this.defaultTopDesktop+ 'px';
            this.left = this.defaultLeft  + 'px';
          }
          if ( this.isMobile) { //caso mobile
            this.top = heightWindow+ this.defaultTopMobile+ 'px';
            this.left = widthWindow/2  + 'px';
          }
        }
      },
    onTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.isSwipingUp = false;
    },
    onTouchMove(event) {
      const currentY = event.touches[0].clientY;
      const diffY = this.startY - currentY;
      this.isSwipingUp = diffY > 0;
      this.isSwipingDown = diffY < 0;
    },
    onTouchEnd() {
      if (this.isSwipingUp && !this.isMoved) {
        this.togglePosition();
      }else if(this.isSwipingDown && this.isMoved){
        this.togglePosition();
      }
    },
    onMouseDown(event) {
      console.log("onmousedown")
      this.startY = event.clientY;
      this.isSwipingUp = true;
    },
    onMouseMove(event) {
      console.log("onmousemove")
      if (this.isSwipingUp) {
        const currentY = event.clientY;
        const diffY = this.startY - currentY;
        if (diffY > 30 && !this.isMoved) {
          this.togglePosition();
          this.isSwipingUp = false;
        }else if (diffY < -30 && this.isMoved){
          this.togglePosition();
          this.isSwipingUp = false;
        }
      }
    },
    onMouseUp() {
      console.log("onmousedown")
      this.isSwipingUp = false;
    },
      mostrarAforoCentro(id){
        this.$emit('mostrar-aforo-centro', id);
    },
    mostrarDetalleFarmacia(id){
      this.$emit('mostrar-detalle-farmacia', id);
    },
    buscarPorTitulo(title){
      let elementoEncontrado = this.locationsUsuario.find(item => item.title === title);
      return elementoEncontrado;
    },
    cambiarUsuario(id){
      console.log(id)
      this.$emit('cambiar-usuario', id);
    },
    setLocationOption(option) {
      //this.locationsTipo = option;
      this.$emit('cambiar-tipo',option)
    },
    setAforoTiempoOption(option) {
      //this.locationsTipo = option;
      this.$emit('cambiar-aforo-tiempo',option)
    },
    centrarMapa(){
      this.$emit('centrar-mapa')
    },
    
  },
  };
  </script>

<style>


ul {
  list-style-type: none;
  padding: 0;
  margin: 20px;
}

#recuadro h1 {
  padding: 5px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 17px;
  color: #000000;
  margin-top: 10px;
  user-select: none;
}

li {
  padding: 5px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}

.moved {
  transition: top 0.5s, left 0.5s; /* Definir la transición aquí también */
}

.titulo-cuadro-deslizante {
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
}

.direccion-title {
    position: fixed;
    z-index: 98;
    border-radius: 40px;
    padding: 20px; /* Añade un espacio interno para separar el texto del borde */
    margin: auto; /* Centra el input horizontalmente en el contenedor */
    font-weight: bold;
    font-size: 16px;
    padding-left: 70px; /* Ajusta esto para separar el contenido del SVG */
    background-image: url(~@/assets/svg/LogoOscu.svg); /* Ruta a la imagen SVG */
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 48px 48px;
    background-color: #ffff;
    color: #7B7B7B;
    display: flex;
    align-items: center;
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
    /* Agrega aquí otros estilos según tus necesidades */
    text-align: center; /* Centra el texto horizontalmente */
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ubicacion-gps {
    position: fixed;
  z-index: 200;
  margin: auto;
  border-radius: 40px;
  background-image: url(~@/assets/svg/gps.svg); /* Ruta a la imagen SVG */
  background-repeat: no-repeat;
  background-position: -2.5px 0px; /* Centra la imagen */
  background-size: 53px 53px; /* Ajusta el tamaño de la imagen para cubrir todo el espacio */
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

  .switch-locations {
    position: fixed;
    z-index: 1;
    display: flex;
    border-radius: 30px;
    overflow: hidden;
    background-color: #d0f0fc;
    width: 90%;
    margin: auto; /* Centra horizontalmente el switch-container */
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
  }

  .switch-aforo-tiempo{
    position: fixed;
    z-index: 1;
    display: flex;
    border-radius: 30px;
    overflow: hidden;
    background-color: #d0f0fc;
    margin: auto; /* Centra horizontalmente el switch-container */
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
    height:25px; 
    margin-top: 10px; 
    width:40%;
    transform: translateX(-50%); /* Ajusta la posición vertical */
    left:50%;
  }
  .direccion-expanded {
    position: fixed;
    z-index: 300;
    border-radius: 25px;
    padding-top: 30px;
    padding: 13px;
    margin: auto; /* Centra el input horizontalmente en el contenedor */
    font-weight: bold;
    font-size: 16px;
    background-image: url(~@/assets/svg/LogoOscu.svg); /* Ruta a la imagen SVG */
    background-repeat: no-repeat;
    background-position: 10px 5px;
    background-size: 48px 48px;
    background-color: #ffff;
    color: #7B7B7B;
    display:flex;
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
    flex-direction: column;
    /* Agrega aquí otros estilos según tus necesidades */
    overflow: hidden;
  }

.switch-option {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.switch-option2 {
  flex: 1;
  text-align: center;
  padding: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.switch-option.active {
  background-color: #2596be;
  color: #ffffff;
  font-weight: bold;
  border-radius: 30px 30px 30px 30px;
}

/* Estilo ovalado */
.switch-option:first-child {
  border-radius: 30px 30px 30px 30px;
}

.switch-option:last-child {
  border-radius: 30px 30px 30px 30px;
}
.switch-option2.active {
  background-color: #2596be;
  color: #ffffff;
  font-weight: bold;
  border-radius: 30px 30px 30px 30px;
}

/* Estilo ovalado */
.switch-option2:first-child {
  border-radius: 30px 30px 30px 30px;
}

.switch-option2:last-child {
  border-radius: 30px 30px 30px 30px;
}

.slider-title{
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: #7B7B7B;
}
.slider-value{
  margin-left: auto;
  font-size: 14px;
  font-weight: 500;
  color: #7B7B7B;
  
}
.containerLista{
  height: 100%;
}
.container-slider{
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.icon3 {
  width: 30px; /* Ancho del icono en píxeles */
  height: 30px; /* Altura del icono en píxeles */
  margin-right: 1px; /* Espacio entre el icono y el texto */
  cursor: pointer;
}

.direccion-header {
  /* ...otros estilos... */
  display: flex;
  justify-content: flex-end; /* Alinea los elementos en el extremo derecho del contenedor */
  /* ...otros estilos... */
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: auto; /* Empuja el botón al fondo del contenedor */
  gap: 10px; /* Espacio entre los elementos (botones) */
  justify-content: center;
}
.custom-button {
  display: flex;
  align-items: center;
  border: none;
  height: 40px;
  background-color: #D0F0FC;
  padding: 4px 10px;
  border-radius: 30px; /* Bordes ovalados */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
  
}

.text-boton{
  white-space: nowrap;
  color: #2596BE;

}
.icon {
  width: 20px; /* Ancho del icono en píxeles */
  height: 20px; /* Altura del icono en píxeles */
  margin-right: 1px; /* Espacio entre el icono y el texto */
}
</style>
