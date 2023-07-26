<template>
    <div class="fondo-oscuro">
      <div class="ventana-centros">
        <div class="ventana-header">
          <v-list-item no-gutters>
            <div class="text">{{ locationsFarmacias[posicionFarmacia].name }}</div>
            <v-list-item-action>
              <v-btn icon @click="mostrarFarmacia(0)"  class="cerrar">
                <img src="@/assets/svg/close.svg" alt="close1" />
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </div>

        <div class="ventana-body">

          <div class="button-container">
            <button class="custom-button" @click="toggleFavorito">
              <img class="icon" :src="locationsFarmacias[posicionFarmacia].favorito ? require('@/assets/svg/favoritoOn.svg') : require('@/assets/svg/favorito.svg')" alt="location1" />
              <div class="text-boton">Favoritos</div>
            </button>

            <button class="custom-button">
              <img class="icon" src="@/assets/svg/valorar.svg" alt="location1" />
              <span class="text-boton">Valorar Atención</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
<script>



export default {
  
  name: 'VentanaFarmacia',
  data() {
    return {
    };
  },
  props: ['locationsFarmacias','indiceFarmacia','posicionFarmacia'], // Agregar la prop 'favorito'
  mounted() {
    this.posicionFarmacia = this.findIndexById(this.locationsFarmacias, this.indiceFarmacia);
  },
  updated(){
    this.posicionFarmacia = this.findIndexById(this.locationsFarmacias, this.indiceFarmacia);
  },
  methods: {
    closeWindow() {
      this.$emit('close');
    },
    toggleFavorito() {
      const favorito =  !this.locationsFarmacias[this.posicionFarmacia].favorito; // Invertir el estado de favorito
      this.$emit('update-favorito-farmacia', this.locationsFarmacias[this.posicionFarmacia].name, favorito); // Emitir evento para actualizar 'favorito'
    },
    mostrarFarmacia(indice){
      this.$emit('mostrar-detalle-farmacia',indice);
    },
    findIndexById(locationsFarmacias, idCentro) {
      const index = locationsFarmacias.findIndex(location => location.id === idCentro);
      return index;
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
.ventana-centros {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  max-width: 400px;
  max-height: 700px;
  min-height: 540px;
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

.popup-row5 {
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-top: 10px;
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

</style>
  