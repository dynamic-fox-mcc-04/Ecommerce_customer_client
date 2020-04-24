import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardPage from '../views/DashboardPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import Catalog from '../components/Products.vue'
import CatalogPage from '../views/CatalogPage.vue'
import DetailProduct from '../components/DetailProduct.vue'
import CartPage from '../views/CartPage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'DashboardPage',
    component: DashboardPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/catalog',
    name: 'CatalogPage',
    component: CatalogPage,
    children: [
      {
        path: '',
        name: 'Catalog',
        component: Catalog
      },
      {
        path: ':id',
        name: 'DetailProduct',
        component: DetailProduct
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const letIn = localStorage.getItem('isLogin')
    if (letIn) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
