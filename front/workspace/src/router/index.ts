import { createRouter, createWebHistory } from 'vue-router'
import AppTop from '../views/AppTop.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'appTop',
      component: AppTop
    }/*,
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Test.vue')
    }*/
  ]
})

export default router
