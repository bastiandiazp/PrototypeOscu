<template>
    <div>
      <div class="direccion-title" :style="direccionStyles" @click="cambiarUsuarioActual(usuarioActual)">
        {{this.buscarPorTitulo(this.usuarioActual).direccion}}
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
        <div :style="botonStyles" @click="togglePosition">
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
      </div>
      <div  v-show="locationsTipo == 'Centros'"  >
        <ListaCentros 
        :locations="locationsCercanas" 
        @mostrar-aforo-centro="mostrarAforoCentro" 
        :style="listaStyles" 
        :soloFavoritos="false"/>
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
  import ListaFarmacias from './ListaFarmacias.vue';
  export default {
    components:{ListaCentros,ListaFarmacias},
    props: ['locationsUsuario','usuarioActual','locationsTipo','locations','locationsFarmacias'],
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
        initialTop: 93,
        initialLeft: 20,
        defaultLeft: 350,
        defaultTopDesktop: 200,
        defaultTopMobile:160,
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
    console.log('todos los cercanos')
    console.log(this.locationsCercanas)
    this.locationsCercanas.sort((a, b) => a.distancia - b.distancia);
    console.log('todos los cercanos ordenados')
    console.log(this.locationsCercanas)
    this.locationsFarmaciasCercanas= this.locationsFarmacias.filter((punto) => punto.distancia < this.sliderValue);
    this.locationsFarmaciasCercanas.sort((a, b) => a.distancia - b.distancia);
    window.addEventListener('resize', this.onResize2, { passive: true })
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
        return {
          height: this.cuadroHeight-94 +'px',
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
    cambiarUsuarioActual(id){
      this.$emit('cambiar-usuario', id+1);
    },
    setLocationOption(option) {
      //this.locationsTipo = option;
      this.$emit('cambiar-tipo',option)
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

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .switch-locations {
    top:70px;
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

.switch-option {
  flex: 1;
  text-align: center;
  padding: 10px;
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
</style>
