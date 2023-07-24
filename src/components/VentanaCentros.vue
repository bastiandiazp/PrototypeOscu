<template>
    <div class="fondo-oscuro">
      <div class="ventana-centros">
        <div class="ventana-header">
          <v-list-item no-gutters>
            <div class="text">{{ location.name }}</div>
            <v-list-item-action>
              <v-btn icon @click="closeWindow" class="cerrar">
                <img src="@/assets/svg/close.svg" alt="close1" />
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </div>

        <div class="ventana-body">
          
          <div class="popup-row1">
            <div><img src="@/assets/svg/locationOn.svg" alt="location1" /></div>
            <div class="text2">{{ location.address }}</div>
          </div>


          <div class="popup-row2">
            <div class="text3 elemento-izquierdo">{{ location.aforo }}</div>
            <div class="text elemento-derecho">Personas en total esperando</div>
          </div>

          <div class="popup-row3 colorC1">
            <div class="categoria elemento-izquierdo">C1</div>
            <div class="elemento-central"> 
              <div class="barra-izquierda"></div>
              <div class="text4">{{ location.aforoC1 }}</div>
              <div class="text5 margen-derecha">Personas en total esperando</div>
              <div class="barra-derecha"></div>
            </div>
            <div class="text5">Atención inmediata</div>
          </div>

          <div class="popup-row3 colorC2">
            <div class="categoria elemento-izquierdo">C2</div>
            <div class="elemento-central"> 
              <div class="barra-izquierda"></div>
              <div class="text4">{{ location.aforoC2 }}</div>
              <div class="text5 margen-derecha">Personas en total esperando</div>
              <div class="barra-derecha"></div>
            </div>
            <div class="text5">Atención inmediata</div>
          </div>

          <div class="popup-row3 colorC3">
            <div class="categoria elemento-izquierdo">C3</div>
            <div class="elemento-central"> 
              <div class="barra-izquierda"></div>
              <div class="text4">{{ location.aforoC2 }}</div>
              <div class="text5 margen-derecha">Personas en total esperando</div>
              <div class="barra-derecha"></div>
            </div>
            <div class="elemento-derecho2">
              <div class="text4">{{ location.tiempoC3 }}</div>
              <div class="text5">Min de tiempo de espera estimado</div>
            </div>
            
          </div>







        </div>



        <div class="ventana-body">
            <v-list>
  
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
  width: 90%;
  height: 70%;
  max-width: 400px;
  max-height: 700px;
  min-height: 200px;
  min-width: 300px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
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
  margin-top: 2px;
  text-transform: none;
  padding: 2px;
}

.text2 {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #2596BE;
  margin-top: 2px;
  text-transform: none;
  text-decoration: underline;
}

.text3 {
  font-size: 96px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #2596BE;
  margin-top: 4px;
  text-transform: none;
}

.categoria {
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #FFFFFF;
  margin-top: 4px;
  text-transform: none;
  margin-right: 5px;
}

.text4 {
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: black;
  margin-top: 2px;
  text-transform: none;
  padding: 2px;
  margin:auto;

}
.text5 {
  font-size: 11px;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  color: black;
  text-transform: none;
  margin: auto;
}

.margen-derecha{
  margin-right: 20px;
}


.icon {
  margin-right: 8px;
}

.botones {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

div {
  /* Estilos que se aplicarán a todos los elementos div */
  font-size: 12px; /* Tamaño del texto, ajusta según tus necesidades */
  font-family: 'Roboto', sans-serif;
  text-transform: none;
}

.popup-row1 {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.popup-row2 {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dividimos la fila en dos columnas iguales */
  align-items: center; /* Centramos verticalmente el contenido en la fila */
}

.elemento-izquierdo {
  /* Alineamos el elemento de la izquierda hacia su borde derecho */
  justify-self: end;

}

.elemento-derecho {
  /* Alineamos el elemento de la derecha hacia su borde izquierdo */
  justify-self: start;
}

.barra-derecha{
  border-right: 2px solid #FFFFFF;
  height: 40px; /* Establece la altura vertical deseada */
  margin: auto;
  
}

.barra-izquierda{
  border-left: 2px solid #FFFFFF;
  height: 40px; /* Establece la altura vertical deseada */
  margin: auto;
}



.popup-row3 {
  /* Agregamos los estilos para la cuadrícula de 3 columnas */
  display: grid;
  grid-template-columns: 0.4fr 1fr 1fr; /* Columna izquierda con el tamaño de 0.5 fracción y columnas centrales/derechas con 1 fracción cada una */
  align-items: center; /* Centramos verticalmente el contenido en la fila */
  gap: 8px; /* Agregamos espacio entre las celdas (opcional) */
}


.colorC1{
  background-color: #EF4143;
}

.colorC2{
  background-color: #F17825;
}

.colorC3{
  background-color: #F7AF41;
}

.colorC4{
  background-color: #8CC540;
}

.colorC5{
  background-color: #3AB644;
}
.elemento-central {
  /* Ajustamos la cuadrícula para tener 4 columnas */
  display: grid;
  grid-template-columns: 0.2fr 1.2fr 1.2fr 0.2fr;
  justify-self: center;
  gap: 8px;
}


.elemento-derecha2 {
  /* Ajustamos el contenido del .elemento-central en una cuadrícula de 2 columnas */
  display: grid;
  grid-template-columns: 1fr 2fr; /* Columna izquierda 1/3 y columna derecha 2/3 del tamaño */
  gap: 8px; /* Agregamos espacio entre las celdas */
  align-items: center; /* Centramos verticalmente el contenido en la fila */
}


</style>
  