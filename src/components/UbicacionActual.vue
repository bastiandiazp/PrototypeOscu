// UbicacionActual.vue

<template>
  <div>
    <button @click="obtenerUbicacion">Obtener Ubicación</button>
    <div v-if="ubicacion">
      <p>Latitud: {{ ubicacion.lat }}</p>
      <p>Longitud: {{ ubicacion.lon }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ubicacion: null
    };
  },
  methods: {
    obtenerUbicacion() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.obtenerCoordenadas,
          this.errorObtencionUbicacion
        );
      } else {
        console.log("Geolocalización no está disponible en este navegador.");
      }
    },
    obtenerCoordenadas(posicion) {
      this.ubicacion = {
        lat: posicion.coords.latitude,
        lon: posicion.coords.longitude
      };
    },
    errorObtencionUbicacion(error) {
      console.error("Error al obtener la ubicación: ", error.message);
    }
  }
};
</script>
