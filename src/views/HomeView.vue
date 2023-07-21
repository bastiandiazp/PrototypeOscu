<template>
  <hello-world />

</template>

<script>
  import HelloWorld from '../components/HelloWorld'
  export default {
    name: 'Home',
    data: () => {
      return{
        perro: "hoila"
      }
    },
    created() {
      console.log(this.perro)
  },
    components: {
      HelloWorld,
    },
  }
</script>
