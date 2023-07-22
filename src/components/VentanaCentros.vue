<template>
    <div class="fondo-oscuro">
      <div class="ventana-centros">
        <div class="ventana-header">
          <v-list-item no-gutters>
            <v-list-item-content class="text">{{ location.name }}</v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="closeWindow" class="cerrar">
                <img src="@/assets/svg/close.svg" alt="close1" />
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </div>
        <div class="ventana-body">
            <v-list>
          <v-list-item>
            <v-list-item-action>
                <img src="@/assets/svg/locationOn.svg" alt="location1" />
            </v-list-item-action>
            <v-list-item-content class="text2">{{ location.address }}</v-list-item-content>
          </v-list-item>
  
            <v-list-item>
              <v-list-item-action>
                <iconify-icon icon="mdi:account-multiple" class="icon" />
              </v-list-item-action>
              <v-list-item-content>{{ location.aforo }} Personas en total esperando</v-list-item-content>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-content>
                <div class="categoria">C1</div>
              </v-list-item-content>
              <v-list-item-content>{{ location.aforoC1 }} Personas en total esperando</v-list-item-content>
              <v-list-item-content>Atención inmediata</v-list-item-content>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-content>
                <div class="categoria">C2</div>
              </v-list-item-content>
              <v-list-item-content>{{ location.aforoC2 }} Personas en total esperando</v-list-item-content>
              <v-list-item-content>Atención inmediata</v-list-item-content>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-content>
                <div class="categoria">C3</div>
              </v-list-item-content>
              <v-list-item-content>{{ location.aforoC3 }} Personas en total esperando</v-list-item-content>
              <v-list-item-content>{{ location.tiempoC3 }} Min de tiempo de espera estimado</v-list-item-content>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-content>
                <div class="categoria">C4</div>
              </v-list-item-content>
              <v-list-item-content>{{ location.aforoC4 }} Personas en total esperando</v-list-item-content>
              <v-list-item-content>{{ location.tiempoC4 }} Min de tiempo de espera estimado</v-list-item-content>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-content>
                <div class="categoria">C5</div>
              </v-list-item-content>
              <v-list-item-content>{{ location.aforoC5 }} Personas en total esperando</v-list-item-content>
              <v-list-item-content>{{ location.tiempoC5 }} Min de tiempo de espera estimado</v-list-item-content>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-action>
                <iconify-icon icon="mdi:information-outline" class="icon" />
              </v-list-item-action>
              <v-list-item-content @click="redirectToCategorizacion">¿Qué es la categorización Triage?</v-list-item-content>
            </v-list-item>
          </v-list>
  
          <div class="botones">
            <v-btn color="primary" class="rounded" @click="redirectToFavorite">
              <iconify-icon icon="mdi:heart" class="icon" />
              Favorito
            </v-btn>
            <v-btn color="primary" class="rounded" @click="redirectToRating">
              <iconify-icon icon="mdi:star" class="icon" />
              Valorar Atención
            </v-btn>
          </div>
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
      console.log('Redirigir a la vista de categorización Triage');
    },
    redirectToFavorite() {
      console.log('Redirigir a la vista de favoritos');
    },
    redirectToRating() {
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

.fondo-oscuro {
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.ventana-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.cerrar {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 29.18px;
  height: 29.18px;
  border-radius: 50%;
  background-color: #ffff;
}

.text {
  font-size: 22px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: black;
  margin-top: 4px;
  text-transform: none;
}

.text2 {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #2596BE;
  margin-top: 4px;
  text-transform: none;
  text-decoration: underline;
}


.icon {
  margin-right: 8px;
}

.botones {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
</style>
  