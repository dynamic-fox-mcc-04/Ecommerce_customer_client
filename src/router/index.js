import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TransactionPage from '../views/TransactionPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUpPage from '../views/SignUpPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signIn',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signUp',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/transactions',
    name: 'TransactionPage',
    component: TransactionPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
