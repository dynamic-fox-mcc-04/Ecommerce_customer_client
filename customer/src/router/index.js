import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CheckOut from '../components/CheckOut.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: CheckOut
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
