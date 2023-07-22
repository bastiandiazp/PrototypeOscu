<template>
  <div>
    <div id="map" :style="mapStyle"></div>
    <VentanaCentros v-if="showVentana" :location="selectedLocation" @close="closeVentana" />
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import VentanaCentros from '../components/VentanaCentros.vue';
import urgenciasIcon from '@/assets/svg/urgenciasOn.svg';
import urgenciasIcon2 from '@/assets/svg/urgenciasOff.svg';
//import otroIcono from '@/assets/svg/otroIcono.svg'; // Importa el archivo SVG del otro ícono que deseas usar

export default {
  name: 'InicioPage',

  data() {
    return {
      map: null,
      center: [-33.4500664, -70.686449], // Coordenadas de la Universidad de Santiago de Chile Diinf
      locations: [
        { name: 'Arquitectura', coordinates: [-33.4515456, -70.6863792], icon: urgenciasIcon, address: 'Dirección 1', aforo: 20, aforoC1: 5, aforoC2: 10, aforoC3: 2, aforoC4: 3, aforoC5: 0, tiempoC3: 15, tiempoC4: 25, tiempoC5: 0 },
        { name: 'Perreras', coordinates: [-33.4506137, -70.6803435], icon: urgenciasIcon2, address: 'Dirección 2', aforo: 15, aforoC1: 3, aforoC2: 6, aforoC3: 1, aforoC4: 2, aforoC5: 3, tiempoC3: 20, tiempoC4: 30, tiempoC5: 5 },
        // Puedes agregar más ubicaciones aquí
      ],
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

        // Agregar un popup a cada marcador con el nombre de la ubicación
        marker.bindPopup(location.name).openPopup();
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
