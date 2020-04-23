import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import OrderHistory from '../views/OrderHistory.vue'
import Products from '../views/Products.vue'
import UpdateProduct from '../views/UpdateProducts.vue'
import ProductParent from '../views/ProductParent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Product',
    component: ProductParent,
    beforeEnter (to, from, next) {
      const accessToken = localStorage.getItem('access_token')
      if (accessToken !== null) {
        next()
      } else {
        next({ path: '/login' })
      }
    },
    children: [
      {
        path: '',
        name: 'Products',
        component: Products
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: 'history',
        name: 'OrderHistory',
        component: OrderHistory
      },
      {
        path: ':id',
        name: 'UpdateProduct',
        component: UpdateProduct
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
