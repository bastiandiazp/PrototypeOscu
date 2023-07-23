<template>
  <div id="app" >
    <div >
      <router-view  class="router-container" :style="routerStyle"/>
    </div>
    <Inicio />
    <div v-show="isMobile" style="position: fixed; bottom: 0; left: 0; width: 100%; height: 64px; background-color: #ffffff;">
      <BottomMenu />
    </div>
    <div v-show="!isMobile" style="position: fixed; bottom: 0; left: 0; width: 100%; height: 64px; background-color: #ffffff;">
      <BottomMenu2 />
    </div>
  </div>
</template>

<script>
import BottomMenu from "./components/BottomMenuMobile.vue";
import BottomMenu2 from "./components/BottomMenuDesktop.vue";
import Inicio from './views/InicioPage.vue';

export default {
  components: {
    BottomMenu,
    BottomMenu2,
    Inicio,
  },
  name: 'App',

  data: () => ({
    isMobile: false,
    marginLeft: 64,
    marginRight: 800,
    marginBottom: 64,
  }),

  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  computed: {
    routerStyle() {
      return {
        left: `${this.marginLeft}px`, // Centra el mapa a la izquierda agregando el margen
        right: `${this.marginRight}px`, // Centra el mapa a la izquierda agregando el margen
        bottom: `${this.marginBottom}px`, // Centra el mapa a la izquierda agregando el margen
        //width: `calc(100vh - ${this.marginLeft}px)`,
      };
    },
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600
      if (! this.isMobile) {
        this.marginLeft = 64
        this.marginRight = window.innerWidth-600
        this.marginBottom = 0
      }
      if (this.isMobile) {
        this.marginLeft = 0
        this.marginRight = 0
        this.marginBottom = 64
      }
    },
  },

  provide() {
    return {
      isMobile: this.isMobile,
    };
  },
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
.router-container {
    position: absolute;
    top: 0;
    bottom: 64px;
    z-index: 1200;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    /* Agrega aquí otras propiedades de estilo según tus necesidades */


    /*margin-left: 64px; /* Establece el margen a la izquierda */
  }
</style>
