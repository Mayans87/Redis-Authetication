import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginVue from '@/views/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginVue
    },
    {
      path: '/signup',
      name: 'signup',
      component: ()=>import('../views/SignUp.vue')
    },
    {
      path: '/protected',
      name: 'protected',
      component: ()=>import('../views/protected.vue')
    }
  ]
})

export default router
