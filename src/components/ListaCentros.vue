<template>
    <div class="containerCentros">
      <ul v-show="!soloFavoritos" class="medicamentos-list">
        <li v-for="(centro, index) in locations" :key="centro.id">
            <div class="centro-item" @click="itemClicked(centro)">
              <div class="centro-info">
                <div class="centro-nombre">{{ centro.name }}</div>
                <div class="centro-distancia">{{ centro.distancia }} Km de distancia</div>
              </div>
              <div v-show="centro.disponible" class="aforo-container">
                  <div v-show="aforoTiempoTipo ==='aforo'" class="aforo-oval">{{ centro.aforo }}</div>
                  <div v-show="aforoTiempoTipo ==='aforo'" class="aforo-texto">Aforo</div>
                  <div v-show="aforoTiempoTipo ==='tiempo'" class="aforo-oval">{{ centro.tiempoTotal }}</div>
                  <div v-show="aforoTiempoTipo ==='tiempo'" class="aforo-texto">Min</div>
              </div>
              <div v-show="!centro.disponible" class="aforo-container">
                  <div class="aforo-oval2">Cerrado</div>
                  <div v-show="aforoTiempoTipo ==='aforo'" class="aforo-texto2">Aforo</div>
                  <div v-show="aforoTiempoTipo ==='tiempo'" class="aforo-texto">Min</div>
              </div>
            </div>
        </li>
      </ul>
      <ul v-show="soloFavoritos" class="medicamentos-list">
        <li v-for="(centro, index) in locations" :key="centro.id" v-if="centro.favorito === true">
            <div class="centro-item" @click="itemClicked(centro)">
                <div class="centro-info">
                <div class="centro-nombre">{{ centro.name }}</div>
                <div class="centro-distancia">{{ centro.distancia }} Km de distancia</div>
            </div>
            <div v-show="centro.disponible" class="aforo-container">
                <div class="aforo-oval">{{ centro.aforo }}</div>
                <div class="aforo-texto">Aforo</div>
            </div>
            <div v-show="!centro.disponible" class="aforo-container">
                <div class="aforo-oval2">Cerrado</div>
                <div class="aforo-texto2">Aforo</div>
            </div>
        </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['locations','soloFavoritos','aforoTiempoTipo'],
    methods: {
      itemClicked(location) {
        console.log(location)
        this.$emit('mostrar-aforo-centro', location.id);
      }
    }
  };
  </script>
  
  <style>
  /* Estilos del componente Container5 */
  .containerCentros {
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

.aforo-oval2{
  width: 70px;
  height: 35px;
  background-color: #EF4143;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 15px;
  font-weight:700;
  margin-right: 5px;
}

.aforo-texto {
  font-size: 14px;
  color: #888;
}

.aforo-texto2 {
  font-size: 14px;
  color: #ffffff;
}

  </style>
  