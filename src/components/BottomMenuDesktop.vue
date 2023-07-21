<template>
  <div class="footer2">
    <v-container2>
      <v-col :align="align" no-gutters style="height: 1px;">
        <v-raw>
          <div class="container2">
            <v-btn @click="$router.push('/')" color="#2596BE" dark fab block plain>
              <div>
                <v-icon x-large class="icon2">home</v-icon>
                <p class="text2">Inicio</p>
              </div>
            </v-btn>
          </div>
        </v-raw>
        <v-raw>
          <div class="container2">
            <v-btn @click="$router.push('/Buscar')" color="#2596BE" dark fab block plain>
              <div>
                <v-icon x-large class="icon2">search</v-icon>
                <p class="text2">Buscar</p>
              </div>
            </v-btn>
          </div>
        </v-raw>
        <v-raw>
          <div class="container2">
            <v-btn @click="$router.push('/Favoritos')" color="#2596BE" dark fab block plain>
              <div>
                <v-icon x-large class="icon2">mdi-heart</v-icon>
                <p class="text2">Favoritos</p>
              </div>
            </v-btn>
          </div>
        </v-raw>
        <v-raw class="container2">
          <div class="container2">
            <v-btn @click="$router.push('/Perfil')" color="#2596BE" dark fab block plain>
              <div>
                <v-icon x-large class="icon2">person</v-icon>
                <p class="text2">Perfil</p>
              </div>
            </v-btn>
          </div>
        </v-raw>
      </v-col>
    </v-container2>
  </div>
</template>

<script>
export default {
  data: () => ({
    isClicked: false,
    alignments: ['start', 'center', 'end'],
  }),

  methods: {
    handleButtonClick() {
      // Agrega aquí el código para manejar el evento de clic del botón
      this.$router.push('/Perfil');
    },
  },
};
</script>

<style>
.footer2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 64px; /* Ancho de la barra vertical */
  height: 100%; /* Altura de la barra vertical para que ocupe toda la altura de la pantalla */
  background-color: #ffffff; /* Color de fondo, ajusta según tus necesidades */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container2 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px; /* Ajusta la altura según tus necesidades */
}

.icon2 {
  font-size: 32px; /* Tamaño del icono, ajusta según tus necesidades */
}

.text2 {
  margin-top: 8px; /* Espacio entre el icono y el texto */
  font-size: 12px; /* Tamaño del texto, ajusta según tus necesidades */
  font-family: 'Roboto', sans-serif;
  color: black;
  text-transform: none;
}


</style>
