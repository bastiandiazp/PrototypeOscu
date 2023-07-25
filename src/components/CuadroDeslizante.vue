<template>
    <div>

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
    data() {
      return {
        isMobile: false,
        isMoved: false,
        top:0,
        left:0,
        cuadroHeight: 0,
        cuadroWidth: 0,
        initialTop: 93,
        initialLeft: 20,
        defaultLeft: 350,
        defaultTopDesktop: 200,
        defaultTopMobile:150
      };
    },
    mounted() {

    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
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
    },
    methods: {
        onResize() {
      this.isMobile = window.innerWidth < 600
      let widthWindow = window.innerWidth //obtenga ancho de ventana
      let heightWindow = window.innerHeight //obtenga alto de ventana
      if (! this.isMobile) {
        this.initialTop = heightWindow+this.defaultTopDesktop ; //guardo posicion inicial
        this.initialLeft = this.defaultLeft;
        this.cuadroHeight = 500 +'px';
        this.cuadroWidth = '360px'
        if (!this.isMoved) {
            this.top = heightWindow+this.defaultTopDesktop + 'px' ;
            this.left = this.defaultLeft +'px';
        } else{
            this.top = heightWindow/2 + 'px' ;
            this.left = this.defaultLeft +'px';
        }
      }
      if (this.isMobile) {
        this.initialTop = heightWindow+this.defaultTopMobile ;  //guardo posicion inicial
        this.initialLeft = widthWindow/2;
        this.cuadroHeight = 600 +'px';
        this.cuadroWidth = widthWindow + 'px';
        if (!this.isMoved) {
            this.top =  heightWindow+this.defaultTopMobile + 'px' ;
            this.left =  widthWindow/2 +'px';
        } else{
            this.top = heightWindow/2 + 'px' ;
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
          this.top = heightWindow/2 +'px';
          this.left = this.defaultLeft;
          } else {
            this.top = heightWindow/2 +'px';
            this.left = widthWindow/2 +'px';
          }
        } else {
          // Volver a la posición original con animación
            this.top = this.initialTop + 'px';
            this.left = this.initialLeft + 'px';

        }
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
</style>
