<template>
      <div class="ventana-medicamento">

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
  },
};
</script>

<style scoped>
.ventana-medicamento {
  position: absolute;
  z-index: 1000;
  width: 90%;
  height: 70%;
  max-width: 400px;
  max-height: 700px;
  min-height: 500px;
  min-width: 300px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);

  left: 0;
  right: 0;

  margin: auto;

  padding-top: 100px;
  padding-right: 10px;
}


</style>
  