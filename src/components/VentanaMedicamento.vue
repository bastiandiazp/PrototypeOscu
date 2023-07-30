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
        <div class="roboto tamano20px colorGris margenn">{{ itemsMedicamentos[posicionMedicamento].laboratorio }}</div>

        <div class="popup-row1">
            <div><img src="@/assets/svg/receta.svg" alt="location1" /></div>
            <div class="roboto tamano20px colorCeleste ">{{ itemsMedicamentos[posicionMedicamento].receta }}</div>
        </div>

        <div class="roboto colorCeleste tamano22px">Farmacias disponibles</div>
        
        

        <div class="container-slider">
          <div class="slider-title">
            Distancia máxima 
            <div class="slider-value">{{ sliderValue2 }} km</div>
          </div>
          <vue-slider v-model="sliderValue2" :min="0" :max="10" :height="3" :interval="1" :tooltip="'none'" v-bind="options"/>
        </div>
      </div>
        <div class="filtered-list-container">
          <ListaFarmacias 
          :locationsFarmacias="locationsFarmaciasCercanas"  
          :precio="itemsMedicamentos[posicionMedicamento].precio"
          :style="listaStyles"/>
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
import ListaFarmacias from './ListaFarmacias2.vue';


export default {
  

name: 'VentanaMedicamento',
data() {
  return {
    cuadroHeight: 0,
    maxDistance: 0,
    maxDistanceLimit: 50, // Límite máximo de distancia
    locationsFarmaciasCercanas: [],
    sliderValue2: 3,
    posicionMedicamento: 0,
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
components:{ListaFarmacias},
props: ['itemsMedicamentos','indiceMedicamento','locationsFarmacias','usuarioActual'], // Agregar la prop 'favorito'
mounted() {
  this.posicionMedicamento = this.findIndexById(this.itemsMedicamentos, this.indiceMedicamento);
  this.locationsFarmaciasCercanas = [];
        this.locationsFarmaciasCercanas= this.locationsFarmacias.filter((punto) => punto.distancia < this.sliderValue2);
        this.locationsFarmaciasCercanas.sort((a, b) => a.distancia - b.distancia);
},

watch: {
  indiceMedicamento: function(newTipo) {
        this.posicionMedicamento = this.findIndexById(this.itemsMedicamentos, this.indiceMedicamento);
    },
    sliderValue2: function() {
        this.locationsFarmaciasCercanas = [];
        this.locationsFarmaciasCercanas= this.locationsFarmacias.filter((punto) => punto.distancia < this.sliderValue2);
        this.locationsFarmaciasCercanas.sort((a, b) => a.distancia - b.distancia);
      },
      usuarioActual: function() {
        this.locationsFarmaciasCercanas = [];
        this.locationsFarmaciasCercanas= this.locationsFarmacias.filter((punto) => punto.distancia < this.sliderValue2);
        this.locationsFarmaciasCercanas.sort((a, b) => a.distancia - b.distancia);
      },
  },
computed: {
  filteredItems() {
    // Filtrar los elementos que cumplen con la distancia máxima
    console.log('distancia: dsdad' + this.maxDistance);
    return this.locationsFarmacias.filter(item => item.distancia <= this.maxDistance);
  },
  listaStyles(){
        return {
          height: this.cuadroHeight-94 +'px',
          /* Agrega aquí otros estilos según tus necesidades */
        };
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
      this.filteredItems;
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
  width: 100%;
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
min-width: 350px;
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

.cuerpo2 {
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






  .filtered-list-container {
    max-height: 400px;
    overflow-y: auto; /* Aplica desbordamiento vertical y muestra el deslizador cuando necesario */
    width:100%;
    height: 50%;
  }

  .container-slider{
  margin-top: 10px;
}
.slider-title{
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: #7B7B7B;
}

.margenn{
  margin-left:10px,
}
.slider-value{
  margin-left: auto;
  font-size: 14px;
  font-weight: 500;
  color: #7B7B7B;
  
}
</style>
