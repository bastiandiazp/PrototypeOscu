<template>
  <div>
    <router-view />
    <div v-show= "isMobile" id="app">
      <BottomMenu />
    </div>
  </div>
</template>

<script>
import BottomMenu from "./components/BottomMenu.vue";

export default {
  components: {
    BottomMenu,
  },
  name: 'App',

  data: () => ({
    isMobile: false
  }),
  beforeDestroy () {
      if (typeof window === 'undefined') return

      window.removeEventListener('resize', this.onResize, { passive: true })
    },

    mounted () {
      this.onResize()
      console.log(this.isMobile)
      window.addEventListener('resize', this.onResize, { passive: true })
    },

    methods: {
      onResize () {
        this.isMobile = window.innerWidth < 600
      },
    },
    provide() {
    return {
      // Proporcionamos el valor booleano 'isMobile' a los componentes hijos
      isMobile: this.isMobile,
    }},
};
</script>
