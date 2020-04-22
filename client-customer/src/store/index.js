import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api'
import socket from '../config/socket'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts: [],
    cart: {},
    orders: [],
    order: {},
    products: [],
    product: {},
    users: [],
    user: '',
    token: '',
    isLogin: false,
    isLoading: false
  },
  mutations: {
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_ORDERS (state, payload) {
      state.orders = payload
    },
    SET_ORDER (state, payload) {
      state.order = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_USERS (state, payload) {
      state.users = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_TOKEN (state, payload) {
      state.token = payload
    }
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  actions: {

    register (context, payload) {
      console.log('REGISTER @ STORE')
      console.log(payload)
      axios({
        method: 'POST',
        url: '/users/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          console.log('REGISTER SUCCESS')
          socket.emit('registered', response.data)
          socket.on('registered2', (payload) => {
            Vue.toasted.success(`Welcome, ${payload.email}. You may login now.`)
          })
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            Vue.toasted.error(`${ct}: ${el}`)
          })
        })
    },

    login (context, payload) {
      console.log('LOGIN @ STORE')
      console.log(payload)
      return axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },

    fetchProducts (context, payload) {
      console.log('FETCH ITEMS @ STORE')
      context.commit('SET_LOADING', true)
      axios({
        method: 'get',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log('SUCCESS FETCHING PRODUCTS')
          console.log(response)
          context.commit('SET_PRODUCTS', response.data.data)
          socket.emit('getProducts', response.data.data)
          socket.on('getProducts2', (payload) => {
            context.commit('SET_PRODUCTS', payload)
            // Vue.toasted.success('FETCHED ALL PRODUCTS')
          })
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            Vue.toasted.error(`${ct}: ${el}`)
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    fetchCarts (context, payload) {
      console.log('FETCHING CARTS @ STORE')
      context.commit('SET_LOADING', true)
      axios({
        method: 'get',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log('SUCCESS FETCHING CARTS')
          console.log(response.data.response)
          context.commit('SET_CARTS', response.data.response)
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            Vue.toasted.error(`${ct}: ${el}`)
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    fetchOrders (context, payload) {
      console.log('FETCHING ORDERS @ STORE')
      context.commit('SET_LOADING', true)
      axios({
        method: 'get',
        url: '/carts/orders',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log('SUCCESS FETCHING ORDERS')
          console.log(response.data.response)
          context.commit('SET_ORDERS', response.data.response)
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            Vue.toasted.error(`${ct}: ${el}`)
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    getOneItem (context, payload) {
      console.log('FETCH ONE ITEM @ STORE')
      context.commit('SET_LOADING', true)
      axios({
        method: 'get',
        url: '/products/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log('SUCCESS FETCHING ONE PRODUCT')
          console.log(response.data)
          context.commit('SET_PRODUCT', response.data)
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            Vue.toasted.error(`${ct}: ${el}`)
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    addItem2Cart (context, payload) {
      console.log('ADD ITEM 2 CART @ STORE')
      console.log(payload)
      return axios({
        method: 'POST',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId: payload
        }
      })
    },

    addQty (context, payload) {
      console.log('ADD CART ITEM QTY @ STORE')
      console.log(payload)
      axios({
        method: 'patch',
        url: '/carts/add/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log('ADDED QTY')
          console.log(response.data[1])
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            Vue.toasted.error(`${ct}: ${el}`)
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    reduceQty (context, payload) {
      console.log('REDUCE CART ITEM QTY @ STORE')
      console.log(payload)
      axios({
        method: 'patch',
        url: '/carts/remove/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log('REDUCED QTY')
          console.log(response)
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            Vue.toasted.error(`${ct}: ${el}`)
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    dropCart (context, payload) {
      console.log('DELETE CART @ STORE')
      console.log(payload)
      axios({
        method: 'delete',
        url: '/carts/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log('REDUCED QTY')
          console.log(response)
          Vue.toasted.show('CART DELETED')
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            Vue.toasted.error(`${ct}: ${el}`)
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    checkoutCart (context, payload) {
      console.log('CHECKOUT CART @ STORE')
      console.log(payload)
      return axios({
        method: 'patch',
        url: '/carts/checkout',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },

    viewOrders (context, payload) {
      console.log('VIEW MY ORDERS @ STORE')
    }

  },
  modules: {}
})
