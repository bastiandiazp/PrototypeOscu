<template>
    <div>
      <div class="perfil-title">
        Perfil
      </div>
      <p>Perfil</p>
    </div>
  </template>
  
  <script>
  export default {
    // Código del componente
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
</style>