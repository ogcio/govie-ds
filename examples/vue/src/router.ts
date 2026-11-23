import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: Home }],
});
