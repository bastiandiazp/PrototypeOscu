<template>
    <div>
      <div class="direccion-title" :style="direccionStyles">
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
            <div class="titulo-cuadro-deslizante">Centros de urgencia mas cercanos</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['locationsUsuario','usuarioActual','locationsTipo'],
    data() {
      return {
        isMobile: false,
        isMoved: false,
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
        defaultTopMobile:150
      };
    },
    mounted() {

    this.onResize2()
    window.addEventListener('resize', this.onResize2, { passive: true })
  },

    computed: {
      recuadroStyles() {
        return {
          width: this.cuadroWidth,
          height: this.cuadroHeight,
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
        this.cuadroHeight = 500 +'px';
        this.cuadroWidth = '360px'
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
        this.cuadroHeight = 600 +'px';
        this.cuadroWidth = widthWindow + 'px';
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
      buscarPorTitulo(title){
        let elementoEncontrado = this.locationsUsuario.find(item => item.title === title);
        return elementoEncontrado;
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

</style>
