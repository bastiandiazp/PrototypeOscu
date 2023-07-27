<template>
  <div id="app" >
    <div >
      <router-view  
        class="router-container" 
        :style="routerStyle" 
        :itemsMedicamentos="itemsMedicamentos" 
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
      />

    </div>
    <div v-show="visibleDetallesFarmacia"> 
      <VentanaFarmacia
      @mostrar-detalle-farmacia="mostrarDetalleFarmacia"
      :locationsFarmacias="locationsFarmacias"
      @update-favorito-farmacia="updateFavoritoFarmacia"
      :indiceFarmacia="indiceFarmacia"
      />
    </div>
    <div v-show="visibleDetalleMedicamento"> 
      <VentanaMedicamento
      
      @mostrar-detalle-medicamento="mostrarDetalleMedicamento"
      :itemsMedicamentos="itemsMedicamentos"
      @update-favorito-medicamento="updateFavoritoMedicamento"
      :indiceMedicamento="indiceMedicamento"
      :locationsFarmacias="locationsFarmacias"
      @mostrar-detalle-farmacia="mostrarDetalleFarmacia"
      />
    </div>
    

  </div>
</template>

<script>
import BottomMenu from "./components/BottomMenuMobile.vue";
import BottomMenu2 from "./components/BottomMenuDesktop.vue";
import Inicio from './views/InicioPage.vue';
import Triage from './components/Triage.vue';
import VentanaCentros from './components/VentanaCentros.vue';
import VentanaFarmacia from './components/VentanaFarmacia.vue';
import VentanaMedicamento from './components/VentanaMedicamento.vue';
import datos from './datos.js';
export default {
  components: {
    BottomMenu,
    BottomMenu2,
    Inicio,
    Triage,
    VentanaCentros,
    VentanaFarmacia,
    VentanaMedicamento,
    
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
    indiceMedicamento: 0,
    datosProbando: [{title: 'Elemento 1'}, {title: 'Elemento 2'}, {title: 'Elemento 3'}],
    usuarioActual: 0, //cambiar usuario usuario actual
    locationsTipo: 'Centros', //centros o farmacias
    posicion :null,
    posicionFarmacia:null,
    posicionMedicamento:null,
    locationsUsuario: datos.locationsUsuario,
    locationsFarmacias: datos.locationsFarmacias,
    locationsCentros: datos.locationsCentros,
    itemsMedicamentos: datos.itemsMedicamentos,
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
  watch: {
    usuarioActual: function() {
      this.calcularDistancias(); //se ejecuta cada vez que cambia usuarioActual
    },
  },
  mounted() {
    // Llamar a updateLocationsData al inicio
    this.updateLocationsData();
    // Establecer el temporizador para llamar a updateLocationsData cada 10 segundos (10000 milisegundos)
    setInterval(() => {
      this.updateLocationsData();
    }, 60000);
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  created(){
    this.calcularDistancias();
    console.log(this.locationsCentros[60])
  },

  methods: {
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radio de la Tierra en kilómetros
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    calcularDistancias(){
      let center = this.buscarPorTitulo(this.usuarioActual).cordenadas
      this.locationsCentros.forEach((punto) => {
      let distancia = this.getDistanceFromLatLonInKm(
          center[0],
          center[1],
          punto.coordinates[0],
          punto.coordinates[1]
        );
        punto.distancia = distancia.toFixed(2);
        
      });
      this.locationsFarmacias.forEach((punto,index) => {
      let distancia = this.getDistanceFromLatLonInKm(
          center[0],
          center[1],
          punto.coordinates[0],
          punto.coordinates[1]
        );
        punto.distancia = distancia.toFixed(2);
        
      });
    },
    buscarPorTitulo(title){
    let elementoEncontrado = this.locationsUsuario.find(item => item.title === title);
      return elementoEncontrado;
    },
    cambiarUsuario(id){
      this.usuarioActual= id;
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
      const locationIndex = this.locationsCentros.findIndex(location => location.id === locationName);
      if (locationIndex !== -1) {
        this.locationsCentros[locationIndex].favorito = newFavoritoValue;
      }
    },
    updateFavoritoFarmacia(locationName, newFavoritoValue) {
      // Encuentra el marcador con el nombre proporcionado y actualiza su atributo 'favorito'
      const locationIndex = this.locationsFarmacias.findIndex(location => location.id === locationName);
      if (locationIndex !== -1) {
        this.locationsFarmacias[locationIndex].favorito = newFavoritoValue;
      }
    },
    updateFavoritoMedicamento(locationName, newFavoritoValue) {
      // Encuentra el marcador con el nombre proporcionado y actualiza su atributo 'favorito'
      const locationIndex = this.itemsMedicamentos.findIndex(location => location.id === locationName);
      if (locationIndex !== -1) {
        this.itemsMedicamentos[locationIndex].favorito = newFavoritoValue;
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
      console.log("llegue a mostrar detalle farmacia" + this.indiceFarmacia + '  '+ this.visibleDetallesFarmacia)
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
        location.tiempoC4 = Math.round((location.aforoC4 * 7.3)+location.tiempoC3);
        location.tiempoC5 = Math.round((location.aforoC5 * 12.3)+location.tiempoC3+location.tiempoC4);


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
