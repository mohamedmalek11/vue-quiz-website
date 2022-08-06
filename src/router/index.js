import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import testPage from '../views/Test.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:pageNum',
    name: 'test',
    component: testPage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
