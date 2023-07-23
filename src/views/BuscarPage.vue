<template>
  <div>
    <div class="container4">
      <input type="text" v-model="searchQuery" placeholder="Buscar..."
        class="search-input"
      >
    </div>
    <div class="container5" :style="contenedorListaStyle">
      <ul class="medicamentos-list">
        <li v-for="item in filteredItems" :key="item.title">
          <div class="medicamento-item">
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
  </div>

</template>

<script>

import svgIcon from "@/assets/svg/LogoOscu.svg";
export default {
  data() {
    return {
      barBottom :70,
      searchQuery: '',
      items: [
          {
            medicamento: 'Paracetamol',
            precio: '1000',
            laboratorio: 'Farmalab',
            title: '1',
          },
          {
            medicamento: 'Ibuprofeno',
            precio: '1500',
            laboratorio: 'MediPharma',
            title: '2',
          },
          {
            medicamento: 'Omeprazol',
            precio: '2000',
            laboratorio: 'SaludPlus',
            title: '3',
          },
          {
            medicamento: 'Amoxicilina',
            precio: '2500',
            laboratorio: 'BioGen',
            title: '4',
          },
          {
            medicamento: 'Aspirina',
            precio: '800',
            laboratorio: 'PharmaCorp',
            title: '5',
          },
          {
            medicamento: 'Loratadina',
            precio: '1200',
            laboratorio: 'BioHealth',
            title: '6',
          },
          {
            medicamento: 'Vitamina C',
            precio: '1800',
            laboratorio: 'NutriVida',
            title: '7',
          },
          {
            medicamento: 'Clorfenamina',
            precio: '900',
            laboratorio: 'MediVit',
            title: '8',
          },
          {
            medicamento: 'Acetaminofén',
            precio: '1200',
            laboratorio: 'MediHealth',
            title: '9',
          },
          {
            medicamento: 'Diclofenaco',
            precio: '1400',
            laboratorio: 'Farmagen',
            title: '10',
          },
          {
            medicamento: 'Cetirizina',
            precio: '1700',
            laboratorio: 'BioPharma',
            title: '11',
          },
          {
            medicamento: 'Diazepam',
            precio: '3000',
            laboratorio: 'MediCare',
            title: '12',
          },
          {
            medicamento: 'Ciprofloxacina',
            precio: '3200',
            laboratorio: 'PharmaVida',
            title: '13',
          },
          {
            medicamento: 'Metformina',
            precio: '1800',
            laboratorio: 'SaludGen',
            title: '14',
          },
          {
            medicamento: 'Ondansetrón',
            precio: '2800',
            laboratorio: 'PharmaPlus',
            title: '15',
          },
          {
            medicamento: 'Paroxetina',
            precio: '2500',
            laboratorio: 'MediLab',
            title: '16',
          },
          {
            medicamento: 'Salbutamol',
            precio: '1500',
            laboratorio: 'BioSalud',
            title: '17',
          },
          {
            medicamento: 'Simvastatina',
            precio: '3800',
            laboratorio: 'HealthCare',
            title: '18',
          },
          {
            medicamento: 'Metronidazol',
            precio: '1900',
            laboratorio: 'PharmaMed',
            title: '19',
          },
          {
            medicamento: 'Dipirona',
            precio: '900',
            laboratorio: 'PharmaWell',
            title: '20',
          },
          // Puedes agregar más medicamentos aquí
        ],
    };
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
        return this.items.filter((item) => {
          return (
            item.medicamento.toLowerCase().includes(query) ||
            item.laboratorio.toLowerCase().includes(query) ||
            item.precio.toLowerCase().includes(query)
          );
        });
      }
    },
    methods: {
      onResize() {
        this.isMobile = window.innerWidth < 600
        if (! this.isMobile) {
          this.barBottom = 0
        }
        if (this.isMobile) {
          this.barBottom = 70
        }
      },
    },
  },
};
</script>

<style>
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
  border-bottom: 1px solid #ccc;
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
div {
  /* Estilos que se aplicarán a todos los elementos div */
  font-size: 12px; /* Tamaño del texto, ajusta según tus necesidades */
  font-family: 'Roboto', sans-serif;
  text-transform: none;
}
</style>