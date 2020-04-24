import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    name: '',
    cart: [],
    errors: ''
  },
  mutations: {
    set_error (context, error) {
      context.errors = error
    },
    set_products (context, payload) {
      context.products = payload
    },
    set_login (context, status) {
      context.isLogin = status
    },
    set_name (context, name) {
      context.name = name
    },
    set_cart (context, payload) {
      context.cart = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios.get('https://balada-ids.herokuapp.com/products')
        .then(result => {
          commit('set_products', result.data.products)
        })
        .catch(err => {
          commit('set_error', err)
        })
    },
    loginCustomer (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'https://balada-ids.herokuapp.com/customer/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(result => {
            resolve(result.data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    registerCustomer (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'https://balada-ids.herokuapp.com/customer/register',
          data: {
            fname: payload.fname,
            lname: payload.lname,
            address: payload.address,
            phone: payload.phone,
            email: payload.email,
            password: payload.password
          }
        })
          .then(result => {
            resolve(result.data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    addCart (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'https://balada-ids.herokuapp.com/customer/order',
          data: {
            productId: payload.productId,
            quantity: payload.qty
          },
          headers: {
            customer_token: localStorage.customer_token
          }
        })
          .then(result => {
            resolve(result.data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    fetchCarts ({ commit }) {
      axios({
        method: 'GET',
        url: 'https://balada-ids.herokuapp.com/customer/order',
        headers: {
          customer_token: localStorage.customer_token
        }
      })
        .then(result => {
          commit('set_cart', result.data.results[0].products)
        })
        .catch(err => {
          commit('set_error', err)
        })
    },
    deleteCart (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: 'https://balada-ids.herokuapp.com/customer/order/cart/' + payload.orderId + '/' + payload.cartId,
          headers: {
            customer_token: localStorage.customer_token
          }
        })
          .then(result => {
            resolve(result.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkout ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const baseUrl = 'https://balada-ids.herokuapp.com/customer/order/checkout/' + payload[0].orderId
        axios.patch(baseUrl, {
          orderId: payload[0].orderId,
          products: payload,
          total: payload[0].total
        }, {
          headers: {
            customer_token: localStorage.customer_token
          }
        })
          .then(result => {
            resolve(result.data)
            commit('set_cart', [])
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
