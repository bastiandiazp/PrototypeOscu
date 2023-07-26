<template>
    <div class="container5">
      <ul class="medicamentos-list">
        <li v-for="(item, index) in itemsMedicamentos" :key="item.name" v-if="item.favorito === true">
          <div class="medicamento-item" @click="itemClicked">
            <div class="medicamento-nombre">{{ item.medicamento }}</div>
            <div class="medicamento-info">
              <div class="medicamento-desde">desde &nbsp;</div>
              <div class="medicamento-precio">
                <span> ${{ item.precio }}</span>
              </div>
              <div class="medicamento-laboratorio">{{ item.laboratorio }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['itemsMedicamentos'],
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
  
  .medicamento-item {
    padding: 10px;
    border-bottom: 1px solid #2596BE;
  }
  
  .medicamento-nombre {
    font-weight: bold;
    font-size: 16px;
  }
  
  .medicamento-info {
    display: flex;
    align-items: center;
  }
  
  .medicamento-precio {
    width: 80px;
    height: 25px;
    background-color: #2596BE;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    margin-right: 10px;
  }
  
  .medicamento-desde {
    font-size: 14px;
    color: #888;
  }
  
  .medicamento-laboratorio {
    font-size: 14px;
    color: #888;
    margin-left: auto;
  }
  </style>
  