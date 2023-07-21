<template>
  <div>
    <div id="map" :style="mapStyle"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

export default {
  name: 'InicioPage',

  data() {
    return {
      map: null,
      center: [-33.4500664, -70.686449], // Coordenadas de la Universidad de Santiago de Chile Diinf
      locations: [
        { name: 'Arquitectura', coordinates: [-33.4515456, -70.6863792] },
        { name: 'Perreras', coordinates: [-33.4506137, -70.6803435] },
        // Puedes agregar más ubicaciones aquí
      ],
      barHeight: 64, // Altura de la barra en píxeles
      //barWidth: 64,
    };
  },

  
  computed: {
    mapStyle() {
      return {
        height: `calc(100vh - ${this.barHeight}px)`,
        //width: `calc(100vh - ${this.barWidth}px)`,
      };
    },
  },


  mounted() {
    this.initializeMap();
    this.addMarkers();
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    initializeMap() {
      this.map = L.map('map').setView(this.center, 14);

      // Agregar capa de mapa base (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    },

    addMarkers() {
      this.locations.forEach(location => {
        const marker = L.marker(location.coordinates).addTo(this.map);

        // Agregar un popup a cada marcador con el nombre de la ubicación
        marker.bindPopup(location.name).openPopup();

        // Agregar evento al hacer clic en el marcador para ejecutar una función o acción
        marker.on('click', () => {
          this.navigateToLocation(location); // Define esta función según lo que desees hacer al hacer clic en el marcador
        });
      });
    },

    navigateToLocation(location) {
      // Agrega aquí la lógica para llevar al usuario a otra vista o ejecutar alguna acción
      console.log(`Hiciste clic en ${location.name}`);
    },
    onResize() {
      this.isMobile = window.innerWidth < 600
      if (! this.isMobile) {
        this.barHeight = 0
      }
      if (this.isMobile) {
        this.barHeight = 64
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
  },
};
</script>

<style>
#map {
  width: 100%;
}
</style>
