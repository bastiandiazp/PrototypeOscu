<template>
  <div id="app" >
    <div >
      <router-view  class="router-container" :style="routerStyle" :itemsMedicamentos="itemsMedicamentos" :datosProbando="datosProbando" @agregar-elemento="agregarElemento"/>
    </div>
    <Inicio />
    <div v-show="isMobile" style="position: fixed; bottom: 0; left: 0; width: 100%; height: 64px; background-color: #ffffff;">
      <BottomMenu />
    </div>
    <div v-show="!isMobile" style="position: fixed; bottom: 0; left: 0; width: 100%; height: 64px; background-color: #ffffff;">
      <BottomMenu2 />
    </div>
  </div>
</template>

<script>
import BottomMenu from "./components/BottomMenuMobile.vue";
import BottomMenu2 from "./components/BottomMenuDesktop.vue";
import Inicio from './views/InicioPage.vue';

export default {
  components: {
    BottomMenu,
    BottomMenu2,
    Inicio,
  },
  name: 'App',

  data: () => ({
    isMobile: false,
    marginLeft: 64,
    marginRight: 800,
    marginBottom: 64,
    datosProbando: [{title: 'Elemento 1'}, {title: 'Elemento 2'}, {title: 'Elemento 3'}],
    itemsMedicamentos: [
          {
            favorito: true, medicamento: 'Paracetamol',
            precio: '1000',
            laboratorio: 'Farmalab',
            title: '1',
          },
          {
            favorito: true, medicamento: 'Ibuprofeno',
            precio: '1500',
            laboratorio: 'MediPharma',
            title: '2',
          },
          {
            favorito: false, medicamento: 'Omeprazol',
            precio: '2000',
            laboratorio: 'SaludPlus',
            title: '3',
          },
          {
            favorito: false, medicamento: 'Amoxicilina',
            precio: '2500',
            laboratorio: 'BioGen',
            title: '4',
          },
          {
            favorito: false, medicamento: 'Aspirina',
            precio: '800',
            laboratorio: 'PharmaCorp',
            title: '5',
          },
          {
            favorito: false, medicamento: 'Loratadina',
            precio: '1200',
            laboratorio: 'BioHealth',
            title: '6',
          },
          {
            favorito: false, medicamento: 'Vitamina C',
            precio: '1800',
            laboratorio: 'NutriVida',
            title: '7',
          },
          {
            favorito: false, medicamento: 'Clorfenamina',
            precio: '900',
            laboratorio: 'MediVit',
            title: '8',
          },
          {
            favorito: false, medicamento: 'Acetaminofén',
            precio: '1200',
            laboratorio: 'MediHealth',
            title: '9',
          },
          {
            favorito: false, medicamento: 'Diclofenaco',
            precio: '1400',
            laboratorio: 'Farmagen',
            title: '10',
          },
          {
            favorito: false, medicamento: 'Cetirizina',
            precio: '1700',
            laboratorio: 'BioPharma',
            title: '11',
          },
          {
            favorito: false, medicamento: 'Diazepam',
            precio: '3000',
            laboratorio: 'MediCare',
            title: '12',
          },
          {
            favorito: false, medicamento: 'Ciprofloxacina',
            precio: '3200',
            laboratorio: 'PharmaVida',
            title: '13',
          },
          {
            favorito: false, medicamento: 'Metformina',
            precio: '1800',
            laboratorio: 'SaludGen',
            title: '14',
          },
          {
            favorito: false, medicamento: 'Ondansetrón',
            precio: '2800',
            laboratorio: 'PharmaPlus',
            title: '15',
          },
          {
            favorito: false, medicamento: 'Paroxetina',
            precio: '2500',
            laboratorio: 'MediLab',
            title: '16',
          },
          {
            favorito: false, medicamento: 'Salbutamol',
            precio: '1500',
            laboratorio: 'BioSalud',
            title: '17',
          },
          {
            favorito: false, medicamento: 'Simvastatina',
            precio: '3800',
            laboratorio: 'HealthCare',
            title: '18',
          },
          {
            favorito: false, medicamento: 'Metronidazol',
            precio: '1900',
            laboratorio: 'PharmaMed',
            title: '19',
          },
          {
            favorito: false, medicamento: 'Dipirona',
            precio: '900',
            laboratorio: 'PharmaWell',
            title: '20',
          },
          // Puedes agregar más medicamentos aquí
        ],
  }),

  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  computed: {
    routerStyle() {
      return {
        left: `${this.marginLeft}px`, // Centra el mapa a la izquierda agregando el margen
        right: `${this.marginRight}px`, // Centra el mapa a la izquierda agregando el margen
        bottom: `${this.marginBottom}px`, // Centra el mapa a la izquierda agregando el margen
        //width: `calc(100vh - ${this.marginLeft}px)`,
      };
    },
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    agregarElemento(nuevoElemento) {
      this.datosProbando.push(nuevoElemento);
    },
    onResize() {
      this.isMobile = window.innerWidth < 600
      console.log(this.datosProbando)
      if (! this.isMobile) {
        this.marginLeft = 64
        this.marginRight = window.innerWidth-600
        this.marginBottom = 0
      }
      if (this.isMobile) {
        this.marginLeft = 0
        this.marginRight = 0
        this.marginBottom = 64
        
      }
    },
  },

  provide() {
    return {
      isMobile: this.isMobile,
    };
  },
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
.router-container {
    position: absolute;
    top: 0;
    bottom: 64px;
    z-index: 1200;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    /* Agrega aquí otras propiedades de estilo según tus necesidades */


    /*margin-left: 64px; /* Establece el margen a la izquierda */
  }
</style>
