<template>
    <div>
      <div class="perfil-title">
        Perfil
      </div>
      &nbsp;
      <div class="ventana-datos-perfil">
        <div class="dato-fila">Nombre: Rafael Alcaraz</div>
        <div class="dato-fila">Correo: rafaelalcaraz@mail.com</div>
        <div class="dato-fila">Fecha nacimiento: 01/01/1999</div>
        <div class="dato-fila">Contraseña: ***********</div>
        <button class="custom-button">
          <img class="icon" src="@/assets/svg/locationOn.svg" alt="location1" />
          <span class="text-boton">Editar perfil</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import VentanaMedicamento from '../components/VentanaMedicamento.vue';
  export default {
    components: {
      VentanaMedicamento,
    },
  };
  </script>


<style>
  .perfil-title {
    height: 50px;
    width: 90%;
    
    border-radius: 40px;
    padding: 20px; /* Añade un espacio interno para separar el texto del borde */
    margin: auto; /* Centra el input horizontalmente en el contenedor */
    font-weight: bold;
    font-size: 26px;
    padding-left: 70px; /* Ajusta esto para separar el contenido del SVG */
    background-image: url(~@/assets/svg/LogoOscu.svg); /* Ruta a la imagen SVG */
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 48px 48px;

    display: flex;
    align-items: center;
    /* Agrega aquí otros estilos según tus necesidades */
  }


  .ventana-datos-perfil {
  position: absolute;
  z-index: 1000;
  width: 90%;
  height: 70%;
  max-width: 400px;
  max-height: 700px;
  min-height: 200px;
  min-width: 300px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);

  left: 0;
  right: 0;

  margin: auto;

  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
}

.dato-fila {
  font-weight: bold;
  font-size: 16px;
  padding-top: 5px;
}

div {
  /* Estilos que se aplicarán a todos los elementos div */
  font-size: 12px; /* Tamaño del texto, ajusta según tus necesidades */
  font-family: 'Roboto', sans-serif;
  text-transform: none;
}

.custom-button {
  display: flex;
  align-items: center;
  border: none;
  background-color: #D0F0FC;
  padding: 4px 10px;
  border-radius: 30px; /* Bordes ovalados */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
}

.text-boton{
  white-space: nowrap;
  color: #2596BE;

}
.icon {
  width: 20px; /* Ancho del icono en píxeles */
  height: 20px; /* Altura del icono en píxeles */
  margin-right: 1px; /* Espacio entre el icono y el texto */
}
</style>