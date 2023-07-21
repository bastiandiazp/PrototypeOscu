import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Inicio from '../views/InicioPage.vue';
import Buscar from '../views/BuscarPage.vue';
import Favoritos from '../views/FavoritosPage.vue';
import Perfil from '../views/PerfilPage.vue';
import Opcion1 from '../views/Opcion1Page.vue';
import Opcion2 from '../views/Opcion2Page.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { path: '/', name: 'inicio', component: Inicio },
  { path: '/Buscar', name: 'Buscar', component: Buscar },
  { path: '/Favoritos', name: 'Favoritos', component: Favoritos },
  { path: '/Perfil', name: 'Perfil', component: Perfil },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
