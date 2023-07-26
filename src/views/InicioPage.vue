<template>
  <div>
    <CuadroDeslizante 
      class="cuadro"
      :locationsUsuario="locationsUsuario"
      :usuarioActual="usuarioActual"
      :locations="locations"
      :locationsFarmacias="locationsFarmacias"
      :locationsTipo="locationsTipo"
      @cambiar-tipo="cambiarTipo"
    />
    <div id="map" :style="mapStyle"></div>
    <VentanaCentros
      v-if="showVentana"
      :location="selectedLocation"
      :favorito="selectedLocation.favorito" 
      @close="closeVentana"
      @update-favorito="updateFavorito" 
      @mostrar-triage="mostrarTriage"
    />
    
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LControl} from 'vue2-leaflet';
import VentanaCentros from '../components/VentanaCentros.vue';
import CuadroDeslizante from '../components/CuadroDeslizante.vue';
import urgenciasIcon from '@/assets/svg/urgenciasOn.svg';
import urgenciasIcon2 from '@/assets/svg/urgenciasOff.svg';


export default {
  name: 'InicioPage',
  props: ['locations','locationsUsuario','usuarioActual','locationsFarmacias','locationsTipo'],
  data() {
    return {
      map: null,
      center: null, // Coordenadas de la Universidad de Santiago de Chile Diinf
      barHeight: 64, // Altura de la barra en píxeles
      barWidth: 64,
      widthMap:0,
      showVentana: false,
      selectedLocation: null,
      iconDisponible: urgenciasIcon,
      iconNoDisponible: urgenciasIcon2,
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
      
      this.center = this.buscarPorTitulo(this.usuarioActual).cordenadas //se obtiene cordendas de usuario actual
      this.map = L.map('map', {
        center: this.center,
        zoom: 14,
        zoomControl: false, // Agregar esta opción para desactivar el control de zoom
      });

      // Agregar capa de mapa base (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      // Agregar control de zoom
      //L.control.zoom({position: 'topright'}).addTo(this.map);
      // Agregar evento para abrir la ventana emergente al hacer clic en el marcador
      this.map.on('click', this.closeVentana);
    },

    addMarkers() {
      this.locations.forEach(location => {
        // Crea un nuevo marcador y establece el ícono según el valor de 'disponible'
        const iconUrl = location.disponible ? this.iconDisponible : this.iconNoDisponible;
        const icon = L.icon({
          iconUrl,
          iconSize: [40, 40], // Tamaño del icono (ajusta según sea necesario)
          iconAnchor: [20, 40], // Anclaje ajustado para colocar el icono justo arriba de las coordenadas
        });
        const marker = L.marker(location.coordinates, { icon }).addTo(this.map);

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

    cambiarTipo(option){
      //this.locationsTipo = option;
      this.$emit('cambiar-tipo',option);
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
        this.widthMap = window.innerWidth - 64;
      }
      if (this.isMobile) {
        this.barHeight = 64;
        this.barWidth = 0;
        this.widthMap = window.innerWidth;
      }
    },

    updateFavorito(locationName, newFavoritoValue) {
      // Actualizar el estado de 'favorito' en el marcador seleccionado
      const locationIndex = this.locations.findIndex(location => location.name === locationName);
      if (locationIndex !== -1) {
        this.locations[locationIndex].favorito = newFavoritoValue;
      }
    },
    mostrarTriage() {
      // Emitir el evento desde InicioPage.vue hacia App.vue
      this.$emit('mostrar-triage');
    },
    buscarPorTitulo(title){
    let elementoEncontrado = this.locationsUsuario.find(item => item.title === title);
      return elementoEncontrado;
    }
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
    CuadroDeslizante,
    LControl,
  },
};
</script>

<style>
#map {
  width: 100%;
  z-index: 1;
}

.cuadro{
  position:absolute;
  z-index:2;
}

</style>
