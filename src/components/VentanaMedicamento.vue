<template>
  <div class="fondo-oscuro">
    <div class="ventana-centros">
      <div class="ventana-header">
        <v-list-item no-gutters>
          <div class="text">{{ itemsMedicamentos[posicionMedicamento].name }}</div>
          <v-list-item-action>
            <v-btn icon @click="mostrarMedicamento(0)"  class="cerrar">
              <img src="@/assets/svg/close.svg" alt="close1" />
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </div>

      <div class="ventana-body">

        <div class="button-container">
          <button class="custom-button" @click="toggleFavorito">
            <img class="icon" :src="itemsMedicamentos[posicionMedicamento].favorito ? require('@/assets/svg/favoritoOn.svg') : require('@/assets/svg/favorito.svg')" alt="location1" />
            <div class="text-boton">Favoritos</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>



export default {

name: 'VentanaMedicamento',
data() {
  return {
  };
},
props: ['itemsMedicamentos','indiceMedicamento','posicionMedicamento'], // Agregar la prop 'favorito'
mounted() {
  this.posicionMedicamento = this.findIndexById(this.itemsMedicamentos, this.indiceMedicamento);
},
updated(){
  this.posicionMedicamento = this.findIndexById(this.itemsMedicamentos, this.indiceMedicamento);
},
methods: {
  closeWindow() {
    this.$emit('close');
  },
  toggleFavorito() {
    const favorito =  !this.itemsMedicamentos[this.posicionMedicamento].favorito; // Invertir el estado de favorito
    this.$emit('update-favorito-medicamento', this.itemsMedicamentos[this.posicionMedicamento].id, favorito); // Emitir evento para actualizar 'favorito'
  },
  mostrarMedicamento(indice){
    this.$emit('mostrar-detalle-medicamento',indice);
  },
  findIndexById(itemsMedicamentos, idCentro) {
    const index = itemsMedicamentos.findIndex(location => location.id === idCentro);
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
