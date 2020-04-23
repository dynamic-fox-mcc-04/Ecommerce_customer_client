import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const baseUrl = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    product: [],
    user: '',
    isLogin: false,
    cart: []
  },
  mutations: {
    SET_PRODUCT: function (state, payload) {
      console.log(payload)
      state.product = payload
    },
    SET_USER: function (state, payload) {
      console.log(payload)
      state.user = payload
    },
    SET_IsLogin: function (state, payload) {
      state.isLogin = payload
    },
    SET_CART: function (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    login: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: baseUrl + '/user/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then((result) => {
            context.commit('SET_IsLogin', true)
            context.commit('SET_USER', payload.email)
            return resolve(result)
          })
          .catch((err) => {
            return reject(err)
          })
      })
    },
    fetchProduct: function (context, _) {
      axios({
        method: 'GET',
        url: baseUrl + '/customer/product'
      })
        .then((result) => {
          const product = result.data
          context.commit('SET_PRODUCT', product)
        })
    },
    fetchCart: function (context, _) {
      axios({
        method: 'GET',
        url: baseUrl + '/customer/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((result) => {
          const cart = result.data
          context.commit('SET_CART', cart)
        })
    }
  },
  modules: {
  }
})
