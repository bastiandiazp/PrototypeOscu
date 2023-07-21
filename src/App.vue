<template>
  <div id="app">
    <router-view />
    <div v-show="isMobile" style="position: fixed; bottom: 0; left: 0; width: 100%; height: 64px; background-color: #f0f0f0;">
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

  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },

  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600
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
