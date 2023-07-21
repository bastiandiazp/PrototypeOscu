<template>
  <div id="app" >
    <router-view :style="routerStyle"/>
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

export default {
  components: {
    BottomMenu,
    BottomMenu2
  },
  name: 'App',

  data: () => ({
    isMobile: false,
    barWidth: 64,
  }),

  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  computed: {
    routerStyle() {
      return {
        marginLeft: `${this.barWidth}px`, // Centra el mapa a la izquierda agregando el margen

        //width: `calc(100vh - ${this.barWidth}px)`,
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
        this.barWidth = 64
      }
      if (this.isMobile) {
        this.barWidth = 0
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
</style>
