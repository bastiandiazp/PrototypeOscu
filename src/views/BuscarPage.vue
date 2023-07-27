<template>
  <div>
    <div class="container4">
      <input type="text" v-model="searchQuery" placeholder="Buscar..."
        class="search-input"
      >
    </div>
    <div class="containerMedicamentos" :style="contenedorListaStyle">
      <ul class="medicamentos-list">
        <li v-for="item in filteredItems" :key="item.id">
          <div class="medicamento-item" @click="itemClicked(item.id)">
 
            <div class="medicamento-nombre ancho90">{{ item.medicamento }}</div>
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
  </div>

</template>

<script>

import svgIcon from "@/assets/svg/LogoOscu.svg";
export default {
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  props: ['itemsMedicamentos'],
  data() {
    return {
      barBottom :70,
      searchQuery: '',
    };
  },
  methods: {
      itemClicked(indice) {
      // Aquí colocas la lógica para manejar el clic en el item
      console.log('Item clicado: holaaaaaaASDFSDAGHFHDGSFHDGSFKHJDSK');
      this.$emit('mostrar-detalle-medicamento',indice)
      // Puedes redirigir al usuario a otra página, mostrar detalles del medicamento, etc.
    }
    },
  computed: {
    contenedorListaStyle() {
      return {
        maxHeight : `calc(100% - ${this.barBottom}px)`, // Centra el mapa a la izquierda agregando el margen
        //width: `calc(100vh - ${this.marginLeft}px)`,
      };
    },
    filteredItems() {
      if (this.searchQuery.trim() === '') {
        return [];
      } else {
        const query = this.searchQuery.trim().toLowerCase();
        return this.itemsMedicamentos.filter((item) => {
          return (
            item.medicamento.toLowerCase().includes(query) ||
            item.laboratorio.toLowerCase().includes(query) ||
            item.precio.toLowerCase().includes(query)
          );
        });
      }
    },
  },
};
</script>

<style>
.ancho90{
  width: 90%;
}
  .container4 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px; /* Añade un espacio interno para separar el texto del borde */
    
  }
  .search-input {
    height: 50px;
    width: 90%;
   
    border-radius: 40px;
    padding: 20px; /* Añade un espacio interno para separar el texto del borde */
    margin: auto; /* Centra el input horizontalmente en el contenedor */
    font-size: 16px; /* Cambia el tamaño de la fuente si lo deseas */
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
    padding-left: 70px; /* Ajusta esto para separar el contenido del SVG */
    background-image: url(~@/assets/svg/LogoOscu.svg); /* Ruta a la imagen SVG */
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 48px 48px;
    /* Agrega aquí otros estilos según tus necesidades */
  }


  .containerMedicamentos {
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
  cursor: pointer;
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
  font-weight: 500;
  color: #7B7B7B;
}
.medicamento-laboratorio {
  font-size: 14px;
  font-weight: 500;
  color: #7B7B7B;
  margin-left: auto
}
div {
  /* Estilos que se aplicarán a todos los elementos div */
  font-size: 12px; /* Tamaño del texto, ajusta según tus necesidades */
  font-family: 'Roboto', sans-serif;
  text-transform: none;
}
</style>