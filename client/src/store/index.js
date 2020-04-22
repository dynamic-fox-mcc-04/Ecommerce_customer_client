import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    name: '',
    cart: []
  },
  mutations: {
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
      axios.get('http://localhost:3000/products')
        .then(result => {
          commit('set_products', result.data.products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginCustomer (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/customer/login',
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
          url: 'http://localhost:3000/customer/register',
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
            console.log(err.response.data)
            reject(err.response.data)
          })
      })
    },
    addCart (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/customer/order',
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
        url: 'http://localhost:3000/customer/order',
        headers: {
          customer_token: localStorage.customer_token
        }
      })
        .then(result => {
          console.log('cartsssss', result.data.results[0].products)
          commit('set_cart', result.data.results[0].products)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
