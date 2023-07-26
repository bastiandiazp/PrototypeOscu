<template>
  <div id="app" >
    <div >
      <router-view  
        class="router-container" 
        :style="routerStyle" 
        :itemsMedicamentos="itemsMedicamentos" 
        :datosProbando="datosProbando" 
        @agregar-elemento="agregarElemento"
        :locations="locationsCentros"
        @mostrar-triage="mostrarTriage"
        :locationsUsuario="locationsUsuario"
        :usuarioActual="usuarioActual"
        :locationsFarmacias="locationsFarmacias"
        :locationsTipo="locationsTipo"
        @mostrar-detalle-farmacia="mostrarDetalleFarmacia"
        @mostrar-detalle-medicamento="mostrarDetalleMedicamento"
        @mostrar-aforo-centro="mostrarAforoCentro"
        :indice-centros="indiceCentro"
        :indice-farmacia="indiceFarmacia"
        :indice-medicamento="indiceMedicamento"
      />
    </div>
    <Inicio 
        :locations="locationsCentros"
        @mostrar-triage="mostrarTriage"
        :locationsUsuario="locationsUsuario"
        :usuarioActual="usuarioActual"
        @cambiar-usuario="cambiarUsuario"
        :locationsFarmacias="locationsFarmacias"
        :locationsTipo="locationsTipo"
        @cambiar-tipo="cambiarTipo"
        @mostrar-detalle-farmacia="mostrarDetalleFarmacia"
        @mostrar-detalle-medicamento="mostrarDetalleMedicamento"
        @mostrar-aforo-centro="mostrarAforoCentro"
        :indiceCentros="indiceCentro"
        :indiceFarmacia="indiceFarmacia"
        :indiceMedicamento="indiceMedicamento"
      />
    <div v-show="isMobile" style="position: absolute; z-index: 1400; bottom: 0; left: 0; width: 100%; height: 64px; background-color: #ffffff;">
      <BottomMenu/>
    </div>
    <div v-show="!isMobile" style="position: fixed; bottom: 0; left: 0; width: 100%; height: 64px; background-color: #ffffff;">
      <BottomMenu2 />
    </div>
    <div v-show="visibleTriage">
      <Triage 
      @mostrar-triage="mostrarTriage"
      
      />
    </div>
    <div v-show="visibleAforoCentro">
      <VentanaCentros
      @update-favorito="updateFavorito"
      @mostrar-aforo-centro="mostrarAforoCentro"
      :locations="locationsCentros"
      :indiceCentro="indiceCentro"
      @mostrar-triage="mostrarTriage"
      :posicion="posicion"
      />

    </div>
    <div v-show="visibleDetallesFarmacia"> 
      <VentanaFarmacia
      @mostrar-detalle-farmacia="mostrarDetalleFarmacia"
      :locationsFarmacias="locationsFarmacias"
      @update-favorito-farmacia="updateFavoritoFarmacia"
      :indiceFarmacia="indiceFarmacia"
      :posicionFarmacia="posicionFarmacia"
      />
    </div>
    

  </div>
</template>

<script>
import BottomMenu from "./components/BottomMenuMobile.vue";
import BottomMenu2 from "./components/BottomMenuDesktop.vue";
//import urgenciasIcon from '@/assets/svg/urgenciasOn.svg';
//import urgenciasIcon2 from '@/assets/svg/urgenciasOff.svg';
//import farmaciaOn from '@/assets/svg/farmaciaOn.svg';
//import farmaciaOff from '@/assets/svg/farmaciaOff.svg';
import Inicio from './views/InicioPage.vue';
import Triage from './components/Triage.vue';
import VentanaCentros from './components/VentanaCentros.vue';
import VentanaFarmacia from './components/VentanaFarmacia.vue';

export default {
  components: {
    BottomMenu,
    BottomMenu2,
    Inicio,
    Triage,
    VentanaCentros,
    VentanaFarmacia,
  },
  name: 'App',

  data: () => ({
    isMobile: false,
    marginLeft: 64,
    marginRight: 800,
    marginBottom: 64,
    visibleTriage: false,
    visibleAforoCentro: false,
    visibleDetallesFarmacia: false,
    visibleDetalleMedicamento: false,
    indiceCentro: 0,
    indiceFarmacia: 0,
    indiceMedicamento:0,
    datosProbando: [{title: 'Elemento 1'}, {title: 'Elemento 2'}, {title: 'Elemento 3'}],
    usuarioActual: 1, //cambiar usuario usuario actual
    locationsTipo: 'Centros', //centros o farmacias
    posicion : 0,
    posicionFarmacia:0,
    locationsUsuario: [
      {title:0, direccion: '9170125 Santiago, Santiago / Estación Central, Región Metropolitana', cordenadas : [-33.4500664, -70.686449]},
      {title:1, direccion: 'Avda Libertador Bernardo O`Higgins 1315, Santiago, 8340658, Región Metropolitana', cordenadas : [-33.4444012,-70.6555231]},
      {title:2, direccion: 'Nueva Los Leones 71, Providencia, Región Metropolitana', cordenadas : [-33.4192201,-70.6091028]}],
    locationsFarmacias:[
    {
        id: 1,
        name: 'dr simi condon',
        coordinates: [-33.4515456, -70.6863792],
        address: 'Dirección 1',
        favorito: true, // Nuevo atributo favorito
        disponible: true, // Nuevo atributo disponible
      },
      {
        id: 2,
        name: 'saca coirchos',
        coordinates: [-33.4492897, -70.6763032],
        address: 'Dirección 1',
        favorito: true, // Nuevo atributo favorito
        disponible: false, // Nuevo atributo disponible
      },
    ], // array con locaciones de farmacias
    locationsCentros:[
      {
        id: 1,
        name: 'Arquitectura',
        coordinates: [-33.4515456, -70.6863792],
        address: 'Dirección 1',
        aforo: 20,
        aforoC1: 5,
        aforoC2: 10,
        aforoC3: 2,
        aforoC4: 3,
        aforoC5: 0,
        tiempoC3: 15,
        tiempoC4: 25,
        tiempoC5: 0,
        favorito: true, // Nuevo atributo favorito
        disponible: true, // Nuevo atributo disponible
        tiempoTotal: 0,
      },
      {
        id: 2,
        name: 'Perreras',
        coordinates: [-33.4506137, -70.6803435],
        address: 'Dirección 2',
        aforo: 15,
        aforoC1: 3,
        aforoC2: 6,
        aforoC3: 1,
        aforoC4: 2,
        aforoC5: 3,
        tiempoC3: 20,
        tiempoC4: 30,
        tiempoC5: 5,
        favorito: true, // Nuevo atributo favorito
        disponible: false, // Nuevo atributo disponible
        tiempoTotal: 0,
      },
      {
        id: 3,
        name: 'los heroes',
        coordinates: [-33.4472214, -70.665429],
        address: 'Dirección 2',
        aforo: 15,
        aforoC1: 3,
        aforoC2: 6,
        aforoC3: 1,
        aforoC4: 2,
        aforoC5: 3,
        tiempoC3: 20,
        tiempoC4: 30,
        tiempoC5: 5,
        favorito: true, // Nuevo atributo favorito
        disponible: true, // Nuevo atributo disponible
        tiempoTotal: 0,
      },
    ],
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
    // Llamar a updateLocationsData al inicio
    this.updateLocationsData();

    // Establecer el temporizador para llamar a updateLocationsData cada 10 segundos (10000 milisegundos)
    setInterval(() => {
      this.updateLocationsData();
    }, 1000);
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    cambiarUsuario(title){
      //hacer funcion que cambie el usuarioActual segun el parametro
      console.log(this.usuarioActual)
    },
    
    agregarElemento(nuevoElemento) {
      this.datosProbando.push(nuevoElemento);
    },
    onResize() {
      this.isMobile = window.innerWidth < 600
      
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
    updateFavorito(locationName, newFavoritoValue) {
      // Encuentra el marcador con el nombre proporcionado y actualiza su atributo 'favorito'
      const locationIndex = this.locationsCentros.findIndex(location => location.name === locationName);
      if (locationIndex !== -1) {
        this.locationsCentros[locationIndex].favorito = newFavoritoValue;
      }
    },
    updateFavoritoFarmacia(locationName, newFavoritoValue) {
      // Encuentra el marcador con el nombre proporcionado y actualiza su atributo 'favorito'
      const locationIndex = this.locationsFarmacias.findIndex(location => location.name === locationName);
      if (locationIndex !== -1) {
        this.locationsFarmacias[locationIndex].favorito = newFavoritoValue;
      }
    },
    mostrarTriage(){
      //console.log('antes de cambiar: ' + this.visibleTriage);
      this.visibleTriage = !this.visibleTriage;
    },
    mostrarAforoCentro(newIdCentro){
      //console.log('viejo: ' +this.indiceCentro);
      this.indiceCentro = newIdCentro;
      //console.log('nuevo: ' +this.indiceCentro);
      this.visibleAforoCentro = !this.visibleAforoCentro;
      //console.log('bool aforo: ' +this.visibleAforoCentro);
    },
    mostrarDetalleFarmacia(newIdFarmacia){
      this.indiceFarmacia = newIdFarmacia;
      this.visibleDetallesFarmacia = !this.visibleDetallesFarmacia;
    },
    mostrarDetalleMedicamento(newIdMedicamento){
      this.indiceMedicamento = newIdMedicamento;
      this.visibleDetalleMedicamento = !this.visibleDetalleMedicamento
    },
    cambiarTipo(option){
      this.locationsTipo = option;
    },
    // Función para actualizar los valores de las locaciones
    updateLocationsData() {
      this.locationsCentros.forEach(location => {
        
        // Actualizar aforoC1 (incrementa o decrementa en 1)
        location.aforoC1 += Math.random() < 0.5 ? -1 : 1;
        location.aforoC1 = Math.max(0, Math.min(location.aforoC1, 2)); // Limitar entre 0 y 5

        // Actualizar aforoC2 (incrementa o decrementa en 1)
        location.aforoC2 += Math.random() < 0.5 ? -1 : 1;
        location.aforoC2 = Math.max(0, Math.min(location.aforoC2, 3)); // Limitar entre 0 y 5

        // Actualizar aforoC3 (incrementa o decrementa entre 1 y 2)
        location.aforoC3 += Math.random() < 0.5 ? -1 : 1;
        location.aforoC3 = Math.max(0, Math.min(location.aforoC3, 10)); // Limitar entre 0 y 10

        // Actualizar aforoC4 (incrementa o decrementa entre 1 y 3)
        location.aforoC4 += Math.random() < 0.5 ? -1 : 1;
        location.aforoC4 = Math.max(0, Math.min(location.aforoC4, 15)); // Limitar entre 0 y 15

        // Actualizar aforoC5 (incrementa o decrementa entre 1 y 3)
        location.aforoC5 += Math.random() < 0.5 ? -1 : 1;
        location.aforoC5 = Math.max(0, Math.min(location.aforoC5, 22)); // Limitar entre 0 y 22

        // Actualizar tiempoC3, tiempoC4 y tiempoC5
        location.tiempoC3 = Math.round(location.aforoC3 * 5.3);
        location.tiempoC4 = Math.round(location.aforoC4 * 7.3);
        location.tiempoC5 = Math.round(location.aforoC5 * 8.3);


        // Actualizar el aforo como la suma de los aforos C1, C2, C3, C4 y C5
        location.aforo = location.aforoC1 + location.aforoC2 + location.aforoC3 + location.aforoC4 + location.aforoC5;

        // Actualizar tiempoTotal como el máximo entre tiempoC3, tiempoC4 y tiempoC5
        location.tiempoTotal = Math.max(location.tiempoC3, location.tiempoC4, location.tiempoC5);
  
      });
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
    z-index: 1400;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    /* Agrega aquí otras propiedades de estilo según tus necesidades */


    /*margin-left: 64px; /* Establece el margen a la izquierda */
  }
</style>
