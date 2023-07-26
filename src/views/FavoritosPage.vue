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
      <div class="container5" :style="contenedorListaStyle">
        <ul class="medicamentos-list">
          <li v-for="(item, index) in itemsMedicamentos" :key="item.name" v-if="item.favorito === true ">
            <div class="medicamento-item" @click="itemClicked">
              <div class="medicamento-nombre">{{ item.medicamento }}</div>
              <div class="medicamento-info">
                <div class="medicamento-desde">desde &nbsp;</div>
                <div class="medicamento-precio">
                  <span> ${{ item.precio }}</span>
                </div>
                <div class="medicamento-laboratorio">{{ item.laboratorio }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    <div>
    <input v-model="nuevoElemento"  />
    <button @click="enviarElemento">Agregar Elemento</button>
  </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['datosProbando','itemsMedicamentos','locations'], // Declaración de los props 'datos' y 'agregarElemento'
    data() {
      return {
        nuevoElemento: '',
        selectedOption: 'itemsMedicamentos',
        barBottom :98,
      };
    },
    computed: {
    contenedorListaStyle() {
      return {
        maxHeight : `calc(100% - ${this.barBottom}px)`, // Centra el mapa a la izquierda agregando el margen
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
      setSelectedOption(option) {
        this.selectedOption = option;
      },
      enviarElemento() {
        // Utilizando la función 'agregarElemento' que recibimos como prop del componente padre
        this.$emit('agregar-elemento', {title: this.nuevoElemento});
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


/*lista de medicamentos*/
.container5 {
  display: flex;
  justify-content: center;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  bottom: 64px;
}

.medicamentos-list {
  list-style: none;
  padding: 0;
  width: 85%;
}

.medicamento-item {
  padding: 10px;
  border-bottom: 1px solid #2596BE;
}

.medicamento-nombre {
  font-weight: bold;
  font-size: 16px;
}

.medicamento-info {
  display: flex;
  align-items: center;
}

.medicamento-precio {
  width: 80px;
  height: 25px;
  background-color: #2596BE;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-right: 10px;
}

.medicamento-desde {
  font-size: 14px;
  color: #888;
}
.medicamento-laboratorio {
  font-size: 14px;
  color: #888;
  margin-left: auto
}




</style>