import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Content from '../components/Content.vue'
import Register from '../components/RegisterForm.vue'
import ProductDetail from '../components/ProductDetail.vue'
import CartDetail from '../components/CartDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Content',
        component: Content
      }
    ]
  },
  {
    path: '/register',
    name: 'RegisterForm',
    component: Register
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'CartDetail',
    component: CartDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
