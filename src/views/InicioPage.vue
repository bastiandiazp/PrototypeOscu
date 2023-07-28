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
      @cambiar-usuario="cambiarUsuario"
      @mostrar-aforo-centro="mostrarAforoCentro"
      @mostrar-detalle-farmacia="mostrarDetalleFarmacia"
      @centrar-mapa="moverMapa"    />
    <div id="map" :style="mapStyle"></div>
    
    
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LControl} from 'vue2-leaflet';
import VentanaCentros from '../components/VentanaCentros.vue';
import CuadroDeslizante from '../components/CuadroDeslizante.vue';
import urgenciasIcon from '@/assets/svg/urgenciasOn.svg';
import urgenciasIcon2 from '@/assets/svg/urgenciasOff.svg';

import farmaciaOn from '@/assets/svg/farmaciaOn.svg';
import farmaciaOff from '@/assets/svg/farmaciaOff.svg';

import inicioIcon from '@/assets/svg/inicioIcon.svg';


export default {
  name: 'InicioPage',
  props: ['locations','locationsUsuario','usuarioActual','locationsFarmacias','locationsTipo','indiceCentro','indiceFarmacia'],
  data() {
    return {
      markers: [],
      map: null,
      center: null, // Coordenadas de la Universidad de Santiago de Chile Diinf
      barHeight: 64, // Altura de la barra en píxeles
      barWidth: 64,
      widthMap:0,
      showVentana: false,
      selectedLocation: null,
      iconDisponible: urgenciasIcon,
      iconNoDisponible: urgenciasIcon2,
      farmaciaOn: farmaciaOn,
      farmaciaOff: farmaciaOff,
      inicioMarker: null,
      inicioMarkerInitialized: false,
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
  watch: {
    locationsTipo: function(newTipo) {
      this.addMarkers();
      this.onResize();
      window.addEventListener('resize', this.onResize, { passive: true });
    },
    usuarioActual: function(){
      this.center = this.buscarPorTitulo(this.usuarioActual).cordenadas //se obtiene cordendas de usuario actual
      const newCenter = L.latLng(this.center[0], this.center[1]);
      this.map.setView(newCenter, 14);

      this.updateInicioMarkerPosition(newCenter);
      
    },
  },

  mounted() {
    this.initializeMap();
    this.addMarkers();
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });

    this.center = this.buscarPorTitulo(this.usuarioActual).cordenadas //se obtiene cordendas de usuario actual
      const newCenter = L.latLng(this.center[0], this.center[1]);
      this.map.setView(newCenter, 14);

      this.updateInicioMarkerPosition(newCenter);
    
  },
  

  beforeDestroy() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },

  methods: {
    moverMapa(){
      this.center = this.buscarPorTitulo(this.usuarioActual).cordenadas //se obtiene cordendas de usuario actual
      const newCenter = L.latLng(this.center[0], this.center[1]);
      this.map.setView(newCenter, 14);
    },
    updateInicioMarkerPosition(newCenter) {
      // Remover el marcador actual para el icono inicioIcon (si existe)
      if (this.inicioMarker) {
        console.log('aaaaaaaaaaaaaaaa');
        this.inicioMarker.remove();
      }

      // Crear el marcador con el nuevo icono inicioIcon y establecer su posición
      const inicioIcono = L.icon({
        iconUrl: inicioIcon,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
      });

      // Agregar el nuevo marcador al mapa
      this.inicioMarker = L.marker(newCenter, { icon: inicioIcono }).addTo(this.map);
    },
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
    cambiarUsuario(id){
        this.$emit('cambiar-usuario', id);
    },
    mostrarAforoCentro(id){
        this.$emit('mostrar-aforo-centro', id);
    },
    mostrarDetalleFarmacia(id){
      this.$emit('mostrar-detalle-farmacia', id);
    },
    addMarkers() {
      this.clearMarkers();

      const locationsToShow = this.locationsTipo === 'Centros' ? this.locations : this.locationsFarmacias;

      if (this.locationsTipo === 'Centros') {
        locationsToShow.forEach(location => {
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
          console.log(location)
          this.$emit('mostrar-aforo-centro', location.id);
        });
        
        this.markers.push(marker);
      });
      }
      else{
        locationsToShow.forEach(location => {
        // Crea un nuevo marcador y establece el ícono según el valor de 'disponible'
        const iconUrl = location.disponible ? this.farmaciaOn : this.farmaciaOff;
        const icon = L.icon({
          iconUrl,
          iconSize: [40, 40], // Tamaño del icono (ajusta según sea necesario)
          iconAnchor: [20, 40], // Anclaje ajustado para colocar el icono justo arriba de las coordenadas
        
        });
        const marker = L.marker(location.coordinates, { icon }).addTo(this.map);

        // Agregar evento al hacer clic en el marcador para mostrar la ventana emergente
        marker.on('click', () => {
          console.log('hoododfodododododood0'+ location.id);
          this.$emit('mostrar-detalle-farmacia', location.id);
        });
        
        this.markers.push(marker);
      });
      }
      
    },
    clearMarkers() {
      // Itera sobre los marcadores actuales y elimínalos del mapa
      this.markers.forEach(marker => marker.remove());

      // Limpia la lista de marcadores
      this.markers = [];
    },


    closeVentana() {
      this.showVentana = false;
    },

    cambiarTipo(option){
      //this.locationsTipo = option;
      this.$emit('cambiar-tipo',option);
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
    /*
    updateFavorito(locationName, newFavoritoValue) {
      // Actualizar el estado de 'favorito' en el marcador seleccionado
      const locationIndex = this.locations.findIndex(location => location.name === locationName);
      if (locationIndex !== -1) {
        this.locations[locationIndex].favorito = newFavoritoValue;
      }
    },*/
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
