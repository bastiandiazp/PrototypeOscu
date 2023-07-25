<template>
    <div class="footer">
        <v-container>
        <v-row
        :align="align"
        no-gutters
        style="height: 10px;"
        >
            <v-col>
                <div class="container">
                    <v-btn @click="$router.push('/')" color="#2596BE" dark fab block plain>
                        <div>
                        <v-icon x-large class="icon">home</v-icon>
                        <p class="text">Inicio</p>
                        </div>
                    </v-btn>
                </div>
            </v-col>
            <v-col>
                <div class="container">
                  <v-btn @click="$router.push('/Buscar')" color="#2596BE" dark fab block plain>
                        <div>
                        <v-icon x-large class="icon">search</v-icon>
                        <p class="text">Buscar</p>
                        </div>
                    </v-btn>
                </div>
            </v-col>
            <v-col>
              <div class="container">
                <v-btn @click="$router.push('/Favoritos')" color="#2596BE" dark fab block plain>
                      <div>
                      <v-icon x-large class="icon">mdi-heart</v-icon>
                      <p class="text">Favoritos</p>
                      </div>
                  </v-btn>
              </div>
            </v-col>
            <v-col class="container">
              <div class="container">
                <v-btn @click="$router.push('/Perfil')" color="#2596BE" dark fab block plain>
                      <div>
                      <v-icon x-large class="icon">person</v-icon>
                      <p class="text">Perfil</p>
                      </div>
                  </v-btn>
              </div>
            </v-col>
        </v-row>
        </v-container>
    </div>
</template>


<script>
  export default {
    data: () => ({
      isClicked: false,
      alignments: [
        'start',
        'center',
        'end',
      ],
    }),
    computed: {
      activeClass() {
        return this.isClicked ? 'custom-active-class' : '';
      },
      inactiveClass() {
        return this.isClicked ? '' : 'custom-inactive-class';
      },
    },
    methods: {
      handleButtonClick() {
      // Agrega aquí el código para manejar el evento de clic del botón
      this.$router.push('/Perfil');
    },
  },
  }
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff; /* Color de fondo, ajusta según tus necesidades */
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  height: 64px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 39px; /* Ajusta la altura según tus necesidades */
}
.container2 {
  justify-content: center;
}

.icon {
  font-size: 190px; /* Tamaño del icono, ajusta según tus necesidades */
}

.text {
  margin-top: 1px; /* Espacio entre el icono y el texto */
  font-size: 16px; /* Tamaño del texto, ajusta según tus necesidades */
  font-family: 'Roboto', sans-serif;
  color: black;
  margin-top: 8px;
  text-transform: none;
}

.custom-active-class {
  /* Estilos personalizados para cuando el botón está seleccionado */
  background-color: #ff0000; /* Por ejemplo, color rojo cuando está seleccionado */
}

.custom-inactive-class {
  /* Estilos personalizados para cuando el botón no está seleccionado */
  background-color: #00ff00; /* Por ejemplo, color verde cuando no está seleccionado */
}
</style>