<template>
  <div class="fondo-oscuro">
    <div class="ventana-medicamentos">
      <div class="cabeza">
        <v-list-item no-gutters>
          <div class="roboto colorNegro tamano22px ancho90">{{ itemsMedicamentos[posicionMedicamento].medicamento }}</div>
          <v-list-item-action>
            <v-btn icon @click="mostrarMedicamento(0)"  class="cerrar">
              <img src="@/assets/svg/close.svg" alt="close1" />
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </div>

      <div class="cuerpo bloque">
        <div class="roboto tamano20px colorGris">{{ itemsMedicamentos[posicionMedicamento].laboratorio }}</div>

        <div class="popup-row1">
            <div><img src="@/assets/svg/receta.svg" alt="location1" /></div>
            <div class="roboto tamano20px colorCeleste ">{{ itemsMedicamentos[posicionMedicamento].receta }}</div>
        </div>

        <div class="roboto colorCeleste tamano22px">Farmacias disponibles</div>
        
        
        <div class="roboto tamano20px colorGris">Distancia máxima</div>
        <div class="distance-filter">
          <input type="number" v-model="distanciaMaxima" min="0" placeholder="Ingrese distancia máxima" />
          <button @click="filterByDistance">Filtrar</button>
        </div>

        <!-- Lista para mostrar los elementos que cumplen con la distancia -->
        <div v-if="filteredItems.length > 0">
          <div class="roboto colorCeleste tamano22px">Farmacias disponibles a distancia máxima</div>
          <ul>
            <li v-for="item in filteredItems" :key="item.id" class="roboto tamano20px colorGris">{{ item.name }}</li>
          </ul>
        </div>

        
        <div class="button-container">
          <button class="custom-button " @click="toggleFavorito">
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
props: ['itemsMedicamentos','indiceMedicamento','posicionMedicamento','distanciaMaxima','locationsFarmacias'], // Agregar la prop 'favorito'
mounted() {
  this.posicionMedicamento = this.findIndexById(this.itemsMedicamentos, this.indiceMedicamento);
},
updated(){
  this.posicionMedicamento = this.findIndexById(this.itemsMedicamentos, this.indiceMedicamento);
},
watch: {
  posicionMedicamento: function(newTipo) {
        this.posicionMedicamento = this.findIndexById(this.itemsMedicamentos, this.indiceMedicamento);
    },
  },
computed: {
  filteredItems() {
    // Filtrar los elementos que cumplen con la distancia máxima
    return this.locationsFarmacias.filter(item => item.distancia <= this.distanciaMaxima);
  },
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
  filterByDistance() {
      // Método para aplicar el filtro por distancia
      // Llama a este método cuando el usuario haga clic en el botón "Filtrar"
      // El resultado se mostrará en la lista debajo de "Farmacias disponibles a distancia máxima"
    },
},

};
</script>

<style scoped>

.bloque {
    display: block;
  }
.button-container {
display: block;
flex-wrap: wrap;
margin-top: auto; /* Empuja el botón al fondo del contenedor */
gap: 10px; /* Espacio entre los elementos (botones) */
padding:10px;
}
.cursor{
cursor:pointer;
}

.roboto{
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin-top: 2px;
  text-transform: none;
  padding: 2px;
}

.ancho90{
  width: 90%;
}

.tamano22px{
  font-size: 22px;
}

.tamano20px{
  font-size: 18px;
}

.colorGris{
  color: #7B7B7B;
}
.colorNegro{
  color: black;
}

.colorCeleste{
  color: #2596BE;
}

.ventana-medicamentos {
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

.cabeza {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 2%;
}
.cuerpo {
justify-content: space-between;
align-items: center;
margin-left: 4.3%;
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

.popup-row1 {
  display: flex;
  align-items: center;
  margin-left: 20px;
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

.distance-filter {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .distance-filter input {
    margin-right: 10px;
    padding: 5px;
  }

  .distance-filter button {
    padding: 5px 10px;
    border: none;
    background-color: #D0F0FC;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
  }


</style>
