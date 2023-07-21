<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="pink" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Inbox</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group v-model="click" active-class="pink--text">
        <v-list-item v-for="(item, index) in items" :key="index">
          <template v-slot:default="{ active }">
            <v-list-item-content>
              <v-list-item-title v-text="item.medicamento"></v-list-item-title>
              <v-list-item-subtitle class="text--primary" v-text="item.precio"></v-list-item-subtitle>
              <v-list-item-subtitle v-text="item.laboratorio"></v-list-item-subtitle>
            </v-list-item-content>


          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selected: [], // Array para guardar elementos seleccionados (no necesitas modificar esto)
      items: [
        {
          medicamento: 'Medicamento A',
          precio: '10.50',
          laboratorio: 'Laboratorio X',
          action: 'Acción A',
          title: 'Item 1', // Puedes cambiar este título si lo deseas
        },
        {
          medicamento: 'Medicamento B',
          precio: '20.75',
          laboratorio: 'Laboratorio Y',
          action: 'Acción B',
          title: 'Item 2', // Puedes cambiar este título si lo deseas
        },
        // Agrega más objetos con información de medicamentos aquí
      ],
    };
  },
};
</script>
