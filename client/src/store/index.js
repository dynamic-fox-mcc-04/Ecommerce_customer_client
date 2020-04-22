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
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios.get('http://localhost:3000/products')
        .then(result => {
          commit('set_products', result.data.products)
          console.log(result.data.products)
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
    }
  },
  modules: {
  }
})
