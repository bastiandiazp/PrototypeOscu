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
                    <v-btn @click="$router.push('/')" color="secondary" fab block plain>
                        <div>
                        <v-icon class="icon">mdi-heart</v-icon>
                        <p class="text">Inicio</p>
                        </div>
                    </v-btn>
                </div>
            </v-col>
            <v-col>
                <div class="container">
                    <v-btn @click="$router.push('/Buscar')" color="secondary" fab block plain>
                        <div>
                        <v-icon class="icon">mdi-heart</v-icon>
                        <p class="text">Inicio</p>
                        </div>
                    </v-btn>
                </div>
            </v-col>
            <v-col>
                <div class="container">
                    <v-btn @click="$router.push('/Favoritos')" color="secondary" fab block plain>
                        <div>
                        <v-icon class="icon">mdi-heart</v-icon>
                        <p class="text">Inicio</p>
                        </div>
                    </v-btn>
                </div>
            </v-col>
            <v-col class="container">
                <div class="container">
                    <v-btn @click="$router.push('/Perfil')" color="secondary" fab block plain>
                        <div>
                        <v-icon class="icon">mdi-heart</v-icon>
                        <p class="text">Inicio</p>
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
      alignments: [
        'start',
        'center',
        'end',
      ],
    }),
  }
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f0f0f0; /* Color de fondo, ajusta según tus necesidades */

  text-align: center;
  height: 60px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px; /* Ajusta la altura según tus necesidades */
}
.container2 {
  justify-content: center;
}

.icon {
  font-size: 48px; /* Tamaño del icono, ajusta según tus necesidades */
}

.text {
  margin-top: 1px; /* Espacio entre el icono y el texto */
  font-size: 16px; /* Tamaño del texto, ajusta según tus necesidades */
  font-family: 'Roboto', sans-serif;
}
</style>