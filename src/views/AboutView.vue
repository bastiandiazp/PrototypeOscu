<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn v-show = "isMobile" prepend-icon="$vuetify" stacked>
    Button
    </v-btn>
  </div>
</template>



<script>
  export default {
    data: () => ({ isMobile: false }),
  inject: ['isMobile'], 

  }
</script>