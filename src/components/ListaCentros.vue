<template>
    <div class="container5">
      <ul class="medicamentos-list">
        <li v-for="(centro, index) in locations" :key="centro.name" v-if="centro.favorito === true">
            <div class="centro-item" @click="itemClicked">
                <div class="centro-info">
                <div class="centro-nombre">{{ centro.name }}</div>
                <div class="centro-distancia">{{ centro.aforoC3 }} Km de distancia</div>
            </div>
                <div class="aforo-container">
                <div class="aforo-oval">{{ centro.aforo }}</div>
                <div class="aforo-texto">Aforo</div>
            </div>
        </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['locations'],
    methods: {
      itemClicked() {
        // Aquí colocas la lógica para manejar el clic en el item
        console.log('Item clicado:');
        // Puedes redirigir al usuario a otra página, mostrar detalles del medicamento, etc.
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
  </style>
  