<template>
    <div class="fondo-oscuro">
      <div class="ventana-centros3">
        <div class="ventana-header">
          <v-list-item no-gutters>
            <div class="text">{{ locationFarmacia.name}}</div>
            <v-list-item-action>
              <v-btn icon @click="mostrarFarmacia(0)"  class="cerrar">
                <img src="@/assets/svg/close.svg" alt="close1" />
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </div>

        <div class="ventana-body">

        <div class="popup-row1 cursor" @click="openGoogleMaps">
            <div><img src="@/assets/svg/locationOn.svg" alt="location1" /></div>
            <div class="text2">{{ locationFarmacia.address}}</div>
        </div>

        <div class="popup-row1">
            <div class="text">Horario de Atención</div>
        </div>

        <div class="popup-row2">
            <div class="elemento-izquierdo">
                <div class="textHorario">Lunes</div>
                <div class="textHorario">Martes</div>
                <div class="textHorario">Miércoles</div>
                <div class="textHorario">Jueves</div>
                <div class="textHorario">Viernes</div>
                <div class="textHorario">Sábado</div>
                <div class="textHorario">Domingo</div>
            </div>
            <div class="elemento-derecho">
                <div class="textHorario2">9:00-22:00</div>
                <div class="textHorario2">9:00-22:00</div>
                <div class="textHorario2">9:00-22:00</div>
                <div class="textHorario2">9:00-22:00</div>
                <div class="textHorario2">9:00-22:00</div>
                <div class="textHorario2">9:00-22:00</div>
                <div class="textHorario2">10:00-22:00</div>
            </div>
        </div>

        

          <div class="button-container">
            <button class="custom-button" @click="toggleFavorito">
            
              <img class="icon" :src="locationFarmacia.favorito ? require('@/assets/svg/favoritoOn.svg') : require('@/assets/svg/favorito.svg')" alt="location1" />
              <div class="text-boton">Favoritos</div>
            </button>

            <button class="custom-button">
                <img src="@/assets/svg/lupa.svg" alt="close1" />
                <div class="text-boton">Buscar medicamento</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
<script>



export default {
  data(){
    return{
      posicionFarmacia: 0,
      locationFarmacia:{
      id: 0,
      name: '',
      coordinates: [0, 0],
      address: '',
      favorito: true,
      disponible: true,
      distancia: 0,
    },
    }
  },
  name: 'VentanaFarmacia',
  created() {
    // Ejecutar la función findIndexById antes de mostrar la información
    this.posicionFarmacia = this.findIndexById(this.locationsFarmacias, this.indiceFarmacia);
  },
  props: ['locationsFarmacias','indiceFarmacia'], // Agregar la prop 'favorito'
  mounted() {
    console.log('creo la ventana farmacia')
    this.posicionFarmacia = this.findIndexById(this.locationsFarmacias, this.indiceFarmacia);
  },
  watch: {
    indiceFarmacia: function() {
      this.posicionFarmacia = this.findIndexById(this.locationsFarmacias, this.indiceFarmacia);
      this.locationFarmacia = Object.assign({}, this.locationsFarmacias[this.posicionFarmacia]);
    },
  },
  methods: {
    closeWindow() {
      this.$emit('close');
    },
    toggleFavorito() {
      const favorito =  !this.locationsFarmacias[this.posicionFarmacia].favorito; // Invertir el estado de favorito
      console.log('el nuevo centro es: '+ favorito)
      this.$emit('update-favorito-farmacia', this.locationsFarmacias[this.posicionFarmacia].id, favorito); // Emitir evento para actualizar 'favorito'
      this.locationFarmacia = Object.assign({}, this.locationsFarmacias[this.posicionFarmacia]);
    },
    mostrarFarmacia(indice){
      this.$emit('mostrar-detalle-farmacia',indice);
    },
    findIndexById(locationsFarmacias, idCentro) {
      const index = locationsFarmacias.findIndex(location => location.id === idCentro);
      return index;
    },
    openGoogleMaps() {
      const coordinates = this.locationsFarmacias[this.posicionFarmacia].coordinates;
      const url = `https://www.google.com/maps?q=${coordinates}`;
      window.open(url, '_blank');
    },
  },
  
};
</script>

<style scoped>
.button-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: auto; /* Empuja el botón al fondo del contenedor */
  gap: 10px; /* Espacio entre los elementos (botones) */
  padding:10px;
}
.cursor{
  cursor:pointer;
}
.ventana-centros3 {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  max-width: 400px;
  max-height: 700px;
  min-height: 200px;
  min-width: 300px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
}

.fondo-oscuro {
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.ventana-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cerrar {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 29.18px;
  height: 29.18px;
  border-radius: 50%;
  background-color: #ffff;
}

.text {
  font-size: 22px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: black;
  margin-top: 2px;
  text-transform: none;
  padding: 2px;
  width: 90%;
}

.textHorario {
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #7B7B7B;
  margin-top: 2px;
  text-transform: none;
  padding: 2px;
}

.textHorario2 {
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #7B7B7B;
  margin-top: 2px;
  text-transform: none;
  padding: 2px;
}

.text2 {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #2596BE;
  margin-top: 2px;
  text-transform: none;
  text-decoration: underline;
  
}

.text3 {
  font-size: 96px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #2596BE;
  margin-top: 4px;
  text-transform: none;
}

.categoria {
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #FFFFFF;
  margin-top: 4px;
  text-transform: none;
  margin-right: 5px;
}

.text4 {
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: black;
  margin-top: 2px;
  text-transform: none;
  padding: 2px;
  margin:auto;

}
.text5 {
  font-size: 11px;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  color: black;
  text-transform: none;
  margin: auto;
}
.text6 {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #2596BE;
  margin-top: 2px;
  text-transform: none;
  margin-left: 10px;
  margin-bottom: 8px;
}

.text7 {
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: black;
  margin-top: 2px;
  text-transform: none;
  padding: 2px;
  text-align: center;
  

}



.margen-derecha{
  margin-right: 20px;
}


.icon {
  margin-right: 8px;
}

.botones {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

div {
  /* Estilos que se aplicarán a todos los elementos div */
  font-size: 12px; /* Tamaño del texto, ajusta según tus necesidades */
  font-family: 'Roboto', sans-serif;
  text-transform: none;
}

.botones {
  display: flex;
  align-items: center;
  gap: 2px;
}

.popup-row1 {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.popup-row2 {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dividimos la fila en dos columnas iguales */
  align-items: center; /* Centramos verticalmente el contenido en la fila */
}

.elemento-izquierdo {
  /* Alineamos el elemento de la izquierda hacia su borde derecho */
  justify-self: end;

}

.elemento-derecho {
  /* Alineamos el elemento de la derecha hacia su borde izquierdo */
  justify-self: start;
}

.barra-derecha{
  border-right: 2px solid #FFFFFF;
  height: 40px; /* Establece la altura vertical deseada */
  margin: auto;
  
}

.barra-izquierda{
  border-left: 2px solid #FFFFFF;
  height: 40px; /* Establece la altura vertical deseada */
  margin: auto;
}



.popup-row3 {
  /* Agregamos los estilos para la cuadrícula de 3 columnas */
  display: grid;
  grid-template-columns: 0.4fr 1fr 1fr; /* Columna izquierda con el tamaño de 0.5 fracción y columnas centrales/derechas con 1 fracción cada una */
  align-items: center; /* Centramos verticalmente el contenido en la fila */
  gap: 8px; /* Agregamos espacio entre las celdas (opcional) */
}


.popup-row4 {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dividimos la fila en dos columnas iguales */
  align-items: center; /* Centramos verticalmente el contenido en la fila */
  margin-right: 20px;
}

.popup-row5 {
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-top: 10px;
}

.popup-row6 {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 40px;
  margin-top: 10px;
}

.colorC1{
  background-color: #EF4143;
}

.colorC2{
  background-color: #F17825;
}

.colorC3{
  background-color: #F7AF41;
}

.colorC4{
  background-color: #8CC540;
}

.colorC5{
  background-color: #3AB644;
}
.elemento-central {
  /* Ajustamos la cuadrícula para tener 4 columnas */
  display: grid;
  grid-template-columns: 0.2fr 1.2fr 1.2fr 0.2fr;
  justify-self: center;
  gap: 8px;
}


.elemento-derecha2 {
  /* Ajustamos el contenido del .elemento-central en una cuadrícula de 2 columnas */
  display: grid;
  grid-template-columns: 1fr 2fr; /* Columna izquierda 1/3 y columna derecha 2/3 del tamaño */
  gap: 8px; /* Agregamos espacio entre las celdas */
  align-items: center; /* Centramos verticalmente el contenido en la fila */
}


.custom-button {
  display: flex;
  align-items: center;
  border: none;
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


.columna {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 50px;
}
</style>
  