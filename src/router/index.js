import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/SigninPage.vue'
import Signup from '../views/SignupPage.vue'
import Dashboard from '../views/Dashboard.vue'
import AccPage from '../views/AccPage.vue'
import FoodPage from '../views/FoodPage.vue'
import GroomingPage from '../views/GroomingPage.vue'
import ToiletriesPage from '../views/ToiletriesPage.vue'
import DetailProduct from '../views/DetailProduct.vue'
import CartPage from '../views/CartPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      requiresSignout: true
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: {
      requiresSignout: true
    }
  },
  {
    path: '/product',
    component: Dashboard,
    children: [
      {
        path: 'accessories',
        name: 'AccPage',
        component: AccPage
      },
      {
        path: 'foods',
        name: 'FoodPage',
        component: FoodPage
      },
      {
        path: 'groomingaids',
        name: 'GroomingPage',
        component: GroomingPage
      },
      {
        path: 'toiletries',
        name: 'ToiletriesPage',
        component: ToiletriesPage
      },
      {
        path: ':id',
        name: 'detailProduct',
        component: DetailProduct
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'cartPage',
    component: CartPage,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/signin'
      })
    }
  } else if (to.matched.some(record => record.meta.requiresSignout)) {
    if (!localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
