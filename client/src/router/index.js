import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import loginPage from '../components/loginPage.vue'
import signupPage from '../components/signupPage.vue'
import cart from '../components/cart.vue'
import checkoutPage from '../components/checkout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage
  },
  {
    path: '/signup',
    name: 'signupPage',
    component: signupPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/checkout',
    name: 'checkoutPage',
    component: checkoutPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
