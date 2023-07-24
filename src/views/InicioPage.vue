<template>
  <div>
    <div id="map" :style="mapStyle"></div>
    <VentanaCentros
      v-if="showVentana"
      :location="selectedLocation"
      :favorito="selectedLocation.favorito" 
      @close="closeVentana"
      @update-favorito="updateFavorito" 
    />
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import VentanaCentros from '../components/VentanaCentros.vue';

export default {
  name: 'InicioPage',
  props: {
    locations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      center: [-33.4500664, -70.686449], // Coordenadas de la Universidad de Santiago de Chile Diinf
      barHeight: 64, // Altura de la barra en píxeles
      barWidth: 64,
      showVentana: false,
      selectedLocation: null,
    };
  },

  computed: {
    mapStyle() {
      return {
        height: `calc(100vh - ${this.barHeight}px)`,
        marginLeft: `${this.barWidth}px`, // Centra el mapa a la izquierda agregando el margen

        //width: `calc(100vh - ${this.barWidth}px)`,
      };
    },
  },

  mounted() {
    this.initializeMap();
    this.addMarkers();
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  

  beforeDestroy() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },

  methods: {
    initializeMap() {
      this.map = L.map('map').setView(this.center, 14);

      // Agregar capa de mapa base (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      // Agregar evento para abrir la ventana emergente al hacer clic en el marcador
      this.map.on('click', this.closeVentana);
    },

    addMarkers() {
      this.locations.forEach(location => {
        // Crea un nuevo marcador y establece el ícono personalizado
        const marker = L.marker(location.coordinates, { icon: L.icon({ iconUrl: location.icon }) }).addTo(this.map);
        
        // Agregar evento al hacer clic en el marcador para mostrar la ventana emergente
        marker.on('click', () => {
          this.showVentana = true;
          this.selectedLocation = location;
        });
      });
    },


    closeVentana() {
      this.showVentana = false;
    },

    navigateToLocation(location) {
      // Agrega aquí la lógica para llevar al usuario a otra vista o ejecutar alguna acción
      console.log(`Hiciste clic en ${location.name}`);
    },
    onResize() {
      this.isMobile = window.innerWidth < 600;
      if (!this.isMobile) {
        this.barHeight = 0;
        this.barWidth = 64;
      }
      if (this.isMobile) {
        this.barHeight = 64;
        this.barWidth = 0;
      }
    },

    updateFavorito(locationName, newFavoritoValue) {
      // Actualizar el estado de 'favorito' en el marcador seleccionado
      const locationIndex = this.locations.findIndex(location => location.name === locationName);
      if (locationIndex !== -1) {
        this.locations[locationIndex].favorito = newFavoritoValue;
      }
    },
  },

  provide() {
    return {
      isMobile: this.isMobile,
    };
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    VentanaCentros,
  },
};
</script>

<style>
#map {
  width: 100%;
}
</style>
