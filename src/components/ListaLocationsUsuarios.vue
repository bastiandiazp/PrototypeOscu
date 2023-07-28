<template>
  <div class="containerCentros">
    <ul class="medicamentos-list">
      <li v-for="(centro, index) in locationsUsuario" :key="centro.index">
          <div class="centro-item">
            <div @click="itemClicked(centro.title)">
              <img v-if="usuarioActual != centro.title" class="icon2" src="@/assets/svg/unchecked.svg" alt="location1" />
              <img v-if="usuarioActual === centro.title" class="icon2" src="@/assets/svg/checked.svg" alt="location1" />
            </div>
            <div class="centro-info" @click="itemClicked(centro.title)">
              <div class="centro-nombre">{{ centro.direccion}}</div>
            </div>
            <div class="aforo-container">
              <img class="icon2" src="@/assets/svg/delete_FILL.svg" alt="location1" />
            </div>
          </div>
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  props: ['locationsUsuario','usuarioActual'],
  methods: {
    itemClicked(id) {
      console.log(id)
      this.$emit('cambiar-usuario', id);
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
  text-align: left;
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
.icon2 {
  width: 40px; /* Ancho del icono en píxeles */
  height: 40px; /* Altura del icono en píxeles */
  margin-right: 1px; /* Espacio entre el icono y el texto */
}

</style>
