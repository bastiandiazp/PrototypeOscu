<template>
    <div>
      <!-- Contenido del template del componente -->
      <div class="favoritos-title">
          Lista de Favoritos
      </div>
      &nbsp;
      <div class="switch-container">
        <div
          class="switch-option"
          :class="{ active: selectedOption === 'locations' }"
          @click="setSelectedOption('locations')"
        >
          Centros
        </div>
        <div
          class="switch-option"
          :class="{ active: selectedOption === 'itemsFarmacias' }"
          @click="setSelectedOption('itemsFarmacias')"
        >
          Farmacias
        </div>
        <div
          class="switch-option"
          :class="{ active: selectedOption === 'itemsMedicamentos' }"
          @click="setSelectedOption('itemsMedicamentos')"
        >
          Medicamentos
        </div>
      </div>
      <div v-show="selectedOption == 'itemsMedicamentos'" :style="contenedorListaStyle">
        <ListaMedicamentos :itemsMedicamentos="itemsMedicamentos"  @mostrar-detalle-medicamento="mostrarDetalleMedicamento" :soloFavoritos="true"/>
      </div>
      <div v-show="selectedOption == 'locations'" :style="contenedorListaStyle">
        <ListaCentros :locations="locations" @mostrar-aforo-centro="mostrarAforoCentro" :soloFavoritos="true"/>
      </div>
      <div v-show="selectedOption == 'itemsFarmacias'" :style="contenedorListaStyle">
        <ListaFarmacias :locationsFarmacias="locationsFarmacias" @mostrar-detalle-farmacia="mostrarDetalleFarmacia" :soloFavoritos="true"/>
      </div>
    <div>
  
  </div>
    </div>
  </template>
  
  <script>
import ListaMedicamentos from '../components/ListaMedicamentos.vue';
import ListaCentros from '../components/ListaCentros.vue';
import ListaFarmacias from '../components/ListaFarmacias.vue';
  export default {
    components:{ListaMedicamentos,ListaCentros,ListaFarmacias},
    props: ['itemsMedicamentos','locations','locationsUsuario','usuarioActual','locationsFarmacias','selectedOption'], // Declaración de los props 'datos' y 'agregarElemento'
    data() {
      return {
        nuevoElemento: '',
        barBottom :98,
      };
    },
    computed: {
    contenedorListaStyle() {
      return {
        maxHeight : `calc(100% - ${this.barBottom}px)`, // Centra el mapa a la izquierda agregando el margen
        overflowY: 'auto', // Agregar overflow-y: auto;
        //width: `calc(100vh - ${this.marginLeft}px)`,
      };
    },
    onResize() {
        this.isMobile = window.innerWidth < 600
        if (! this.isMobile) {
          this.barBottom = 0
        }
        if (this.isMobile) {
          this.barBottom = 70
        }
      },
    getSelectedList() {
      // Computed para obtener la lista correspondiente a la opción seleccionada
      switch (this.selectedOption) {
        case 'locations':
          return this.locations;
        case 'itemsFarmacias':
          return this.itemsFarmacias;
        case 'itemsMedicamentos':
          return this.itemsMedicamentos;
        default:
          return [];
      }
    },
  },
    methods: {
      mostrarAforoCentro(id){
        this.$emit('mostrar-aforo-centro', id);
    },
    mostrarDetalleFarmacia(id){
      this.$emit('mostrar-detalle-farmacia', id);
    },
    mostrarDetalleMedicamento(id){
      this.$emit('mostrar-detalle-medicamento', id);
    },
    setSelectedOption(option) {
      this.$emit('set-selected-option', option);
    },
      itemClicked() {
      // Aquí colocas la lógica para manejar el clic en el item
      console.log('Item clicado:');
      // Puedes redirigir al usuario a otra página, mostrar detalles del medicamento, etc.
    }

    },
  };
  </script>


<style>
  .favoritos-title {
    height: 50px;
    width: 90%;
   
    border-radius: 40px;
    padding: 20px; /* Añade un espacio interno para separar el texto del borde */
    margin: auto; /* Centra el input horizontalmente en el contenedor */
    font-weight: bold;
    font-size: 26px;
    padding-left: 70px; /* Ajusta esto para separar el contenido del SVG */
    background-image: url(~@/assets/svg/LogoOscu.svg); /* Ruta a la imagen SVG */
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 48px 48px;

    display: flex;
    align-items: center;
    /* Agrega aquí otros estilos según tus necesidades */
  }

  .switch-container {
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