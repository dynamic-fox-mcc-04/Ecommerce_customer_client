import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import Carts from '../views/Carts.vue'
import CheckOut from '../views/CheckOut.vue'
import DetailProduct from '../views/DetailProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/regis',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/detail/:id',
    name: 'DetailProduct',
    component: DetailProduct
  },
  {
    path: '/carts',
    name: 'Carts',
    component: Carts
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
