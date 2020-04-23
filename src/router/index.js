import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, form, next) => {
      const token = localStorage.getItem('token')
      if (!token) {
        next()
      } else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    beforeEnter: (to, form, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    beforeEnter: (to, form, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
