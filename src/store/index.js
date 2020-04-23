import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logged: false,
        products: [],
        item: {},
        hideLogin: true,
        showRegister: false,
        carts: [],
        itemcart: {}
    },
    mutations: {
        SET_LOGGED(state, payload) {
            state.logged = payload
        },
        SET_PRODUCTS(state, payload) {
            state.products = payload
        },
        SET_ITEM(state, payload) {
            state.item = payload
        },
        SET_HIDELOGIN(state, payload) {
            state.hideLogin = payload
        },
        SET_SHOWREGISTER(state, payload) {
            state.showRegister = payload
        },
        SET_CARTS(state, payload) {
            state.carts = payload
        },
        SET_ITEMCART(state, payload) {
            state.itemcart = payload
        }
    },
    actions: {
        openRegister(context) {
            context.commit('SET_HIDELOGIN', true)
            context.commit('SET_SHOWREGISTER', true)
        },
        openLogin(context) {
            context.commit('SET_HIDELOGIN', false)
            context.commit('SET_SHOWREGISTER', false)
        },
        cancelLogin(context) {
            context.commit('SET_HIDELOGIN', true)
            context.commit('SET_SHOWREGISTER', false)
        },
        login(context, payload) {
            return new Promise((resolve, reject) => {
                const email = payload.email
                const password = payload.password
                return axios({
                        method: 'POST',
                        url: 'https://thawing-ocean-38020.herokuapp.com/login',
                        data: {
                            email,
                            password
                        }
                    })
                    .then((data) => {
                        context.commit('SET_LOGGED', true)
                        resolve(data.data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })

        },
        register(context, payload) {
            return new Promise((resolve, reject) => {
                const email = payload.email
                const password = payload.password
                return axios({
                        method: 'POST',
                        url: 'https://thawing-ocean-38020.herokuapp.com/register',
                        data: {
                            email,
                            password
                        }
                    })
                    .then((data) => {
                        context.commit('SET_LOGGED', true)
                        resolve(data.data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },

        logout() {
            localStorage.clear()
        },
        fetchProducts(context, payload) {
            axios({
                    method: 'GET',
                    url: 'https://thawing-ocean-38020.herokuapp.com/products',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    context.commit('SET_PRODUCTS', data.data)
                })
                .catch((err) => {
                    console.log(error)
                })
        },
        fetchProductById(context, payload) {
            return new Promise((resolve, reject) => {
                axios({
                        method: 'GET',
                        url: 'https://thawing-ocean-38020.herokuapp.com/products/' + payload,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    .then(({ data }) => {
                        context.commit('SET_ITEM', data.data)
                        resolve(data.data)
                            // console.log(this.state.item);
                    })
                    .catch((err) => {
                        console.log(error)
                        reject(err)
                    })
            })
        },
        addToCart(context, payload) {
            return new Promise((resolve, reject) => {
                console.log('kesini')
                axios({
                        method: 'POST',
                        url: 'https://thawing-ocean-38020.herokuapp.com/cart',
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        },
                        data: {
                            productId: payload.id,
                            quantity: payload.quantity
                        }
                    })
                    .then((data) => {
                        resolve(data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        fetchCartById(context, payload) {
            return new Promise((resolve, reject) => {
                axios({
                        method: 'GET',
                        url: 'https://thawing-ocean-38020.herokuapp.com/cart/' + payload,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    .then(({ data }) => {
                        context.commit('SET_ITEMCART', data)
                        console.log(this.state.itemcart);
                        resolve(data.data)
                    })
                    .catch((err) => {
                        console.log(error)
                        reject(err)
                    })
            })
        },
        fetchCart(context, payload) {
            axios({
                    method: 'GET',
                    url: 'https://thawing-ocean-38020.herokuapp.com/cart',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    context.commit('SET_CARTS', data)
                })
                .catch((err) => {
                    console.log(error)
                })
        },
        deleteFromCart(_, payload) {
            console.log('proses delete');
            return new Promise((resolve, reject) => {
                axios({
                        method: 'DELETE',
                        url: 'https://thawing-ocean-38020.herokuapp.com/cart/' + payload,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    .then((data) => {
                        resolve(data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        }

    },
    modules: {}
})