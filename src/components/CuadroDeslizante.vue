<template>
    <div>
      <div :style="recuadroStyles" :class="{ 'moved': isMoved }">
        <!-- Contenido del recuadro -->
        <div :style="botonStyles" @click="togglePosition">
            <svg width="38" height="13">
                <rect rx="5" ry="5" width="38" height="13" fill="#B2DDEC" />
            </svg>
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
        initialTop: 93,
        initialLeft: 20,
        defaultLeft: 300
      };
    },
    mounted() {

    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

    computed: {
      recuadroStyles() {
        return {
          width: '430px',
          height: '300px',
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
                height: '20px',
                opacity: '100%',
                cursor: 'grab',
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: this.isMouseDown ? 'grabbing' : 'grab',
            }
        },
    },
    methods: {
        onResize() {
      this.isMobile = window.innerWidth < 600
      let widthWindow = window.innerWidth //obtenga ancho de ventana
      let heightWindow = window.innerHeight //obtenga alto de ventana
      if (! this.isMobile) {
        this.initialTop = heightWindow ; //guardo posicion inicial
        this.initialLeft = this.defaultLeft;
        if (!this.isMoved) {
            this.top = heightWindow + 'px' ;
            this.left = this.defaultLeft +'px';
        } else{
            this.top = heightWindow/2 + 'px' ;
            this.left = this.defaultLeft +'px';
        }
      }
      if (this.isMobile) {
        this.initialTop = heightWindow ;  //guardo posicion inicial
        this.initialLeft = widthWindow/2;
        if (!this.isMoved) {
            this.top =  heightWindow + 'px' ;
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
          this.left = '300px';
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
</style>
