<template>
  <div class="ventana-centros">
    <div class="ventana-header">
      <div>{{ location.name }}</div>
      <div class="cerrar" @click="closeWindow">
        <iconify-icon icon="mdi:close" />
      </div>
    </div>
    <div class="ventana-body">
      <div class="info">
        <iconify-icon icon="mdi:map-marker" class="icon" />
        <div>{{ location.address }}</div>
      </div>
      <div class="info">
        <iconify-icon icon="mdi:account-multiple" class="icon" />
        <div>{{ location.aforo }} Personas en total esperando</div>
      </div>
      <div class="info">
        <div class="categoria">C1</div>
        <div>{{ location.aforoC1 }} Personas en total esperando</div>
        <div>Atención inmediata</div>
      </div>
      <div class="info">
        <div class="categoria">C2</div>
        <div>{{ location.aforoC2 }} Personas en total esperando</div>
        <div>Atención inmediata</div>
      </div>
      <div class="info">
        <div class="categoria">C3</div>
        <div>{{ location.aforoC3 }} Personas en total esperando</div>
        <div>{{ location.tiempoC3 }} Min de tiempo de espera estimado</div>
      </div>
      <div class="info">
        <div class="categoria">C4</div>
        <div>{{ location.aforoC4 }} Personas en total esperando</div>
        <div>{{ location.tiempoC4 }} Min de tiempo de espera estimado</div>
      </div>
      <div class="info">
        <div class="categoria">C5</div>
        <div>{{ location.aforoC5 }} Personas en total esperando</div>
        <div>{{ location.tiempoC5 }} Min de tiempo de espera estimado</div>
      </div>
      <div class="info" @click="redirectToCategorizacion">
        <iconify-icon icon="mdi:information-outline" class="icon" />
        <div>¿Qué es la categorización Triage?</div>
      </div>
      <div class="botones">
        <v-btn color="primary" icon @click="redirectToFavorite">
          <iconify-icon icon="mdi:heart" class="icon" />
          Favorito
        </v-btn>
        <v-btn color="primary" icon @click="redirectToRating">
          <iconify-icon icon="mdi:star" class="icon" />
          Valorar Atención
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VentanaCentros',
  props: ['location'],
  methods: {
    closeWindow() {
      this.$emit('close');
    },
    redirectToCategorizacion() {
      // Agrega aquí la lógica para redireccionar a la vista de categorización Triage
      console.log('Redirigir a la vista de categorización Triage');
    },
    redirectToFavorite() {
      // Agrega aquí la lógica para redireccionar a la vista de favoritos
      console.log('Redirigir a la vista de favoritos');
    },
    redirectToRating() {
      // Agrega aquí la lógica para redireccionar a la vista de valoración de atención
      console.log('Redirigir a la vista de valoración de atención');
    },
  },
};
</script>

<style scoped>
.ventana-centros {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 690px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.ventana-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 18px;
  font-weight: bold;
}

.ventana-body {
  padding: 16px;
}

.info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.icon {
  margin-right: 8px;
}

.categoria {
  font-weight: bold;
  margin-right: 8px;
}

.botones {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
</style>
