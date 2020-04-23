import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import logged from '../views/logged.vue'
import ProductDetail from '../components/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import CartDetail from '../components/CartDetail.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cart',
        name: 'Cart',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Cart
    },
    {
        path: '/detail',
        name: 'ProductDetail',
        component: ProductDetail
    },
    {
        path: '/cart/detail',
        name: 'CartDetail',
        component: CartDetail
    },
    {
        path: '/redirect',
        name: 'logged',
        component: logged
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router