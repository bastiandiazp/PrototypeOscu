<template>
    <div class="container5">
      <ul v-show="!soloFavoritos" class="medicamentos-list">
        <li v-for="(centro, index) in locationsFarmacias" :key="centro.id" >
            <div class="centro-item" @click="itemClicked(centro)">
                <img class="icon" src="@/assets/svg/pharmacy.svg" alt="location1" />
                <div class="centro-info">
                    <div class="centro-nombre">{{ centro.name }}</div>
                    <div class="centro-distancia">{{ centro.distancia }} Km de distancia</div>
                </div>
            <div class="aforo-container">
                <img class="icon" src="@/assets/svg/outToPage.svg" alt="location1" />
            </div>
        </div>
        </li>
      </ul>
      <ul v-show="soloFavoritos" class="medicamentos-list">
        <li v-for="(centro, index) in locationsFarmacias" :key="centro.id" v-if="centro.favorito === true">
            <div class="centro-item" @click="itemClicked(centro)">
                <img class="icon" src="@/assets/svg/pharmacy.svg" alt="location1" />
                <div class="centro-info">
                    <div class="centro-nombre">{{ centro.name }}</div>
                    <div class="centro-distancia">{{ centro.distancia }} Km de distancia</div>
                </div>
            <div class="aforo-container">
                <img class="icon" src="@/assets/svg/outToPage.svg" alt="location1" />
            </div>
        </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['locationsFarmacias','soloFavoritos'],
    methods: {
      itemClicked(location) {
        this.$emit('mostrar-detalle-farmacia', location.id);
      }
    }
  };
  </script>
  
  <style>
  /* Estilos del componente Container5 */
  .container5 {
    display: flex;
    justify-content: center;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    bottom: 64px;
  }
  
  .medicamentos-list {
    list-style: none;
    padding: 0;
    width: 85%;
  }
  
  .centro-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #2596BE;
  cursor: pointer;
}

.centro-info {
  display: flex; /* Agrega el display: flex */
  flex-direction: column; /* Apila los elementos verticalmente */
  flex: 1; /* Ocupa el espacio disponible dentro de centro-item */
  padding-left: 5px;
}
.centro-nombre {
    font-weight: bold;
    font-size: 16px;
}

.centro-distancia {
  font-size: 14px;
  color: #888;
  margin-right: 10px;
}

.aforo-container {
  display: flex;
  align-items: center;
}

.aforo-oval {
  width: 70px;
  height: 35px;
  background-color: #2596BE;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 30px;
  font-weight:700;
  margin-right: 5px;
}

.aforo-texto {
  font-size: 14px;
  color: #888;
}

.icon {
  width: 20px; /* Ancho del icono en píxeles */
  height: 20px; /* Altura del icono en píxeles */
  margin-right: 1px; /* Espacio entre el icono y el texto */
}
  </style>
  