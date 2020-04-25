import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://ecommercehacktiv8.herokuapp.com'

export default new Vuex.Store({
  state: {
    isLoading: false,
    isLogin: false,
    products: [],
    carts: [],
    total: 0
  },
  mutations: {
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_TOTAL (state, payload) {
      state.carts = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    ADD_TOTAL (state, payload) {
      state.total += payload
    },
    SUBSTRACT_TOTAL (state, payload) {
      state.total -= payload
    },
  },
  actions: {
    Login (context, payload) {
      return axios({
        method: 'post',
        url: baseUrl + '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    Register (context, payload) {
      return axios({
        method: 'post',
        url: baseUrl + '/register',
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchProducts (context, payload) {
      context.commit('SET_ISLOADING', true)
      axios({
        method: 'get',
        url: baseUrl + '/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          this.$vToastify.error(err.response.data, 'Error Fetching Data')
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    fetchProductById (context, id) {
      context.commit('SET_ISLOGIN', true)
      console.log('masuk store', id)
      return axios({
        method: 'get',
        url: baseUrl + '/products/' + id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    fetchCarts (context, payload) {
      context.commit('SET_ISLOADING', true)
      axios({
        method: 'get',
        url: `${baseUrl}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_CARTS', data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    addToCart (context, id) {
      return axios({
        method: 'post',
        url: `${baseUrl}/carts`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: id
        }
      })
    },
    addToCartWithBody (context, payload) {
      return axios({
        method: 'post',
        url: `${baseUrl}/carts/alt`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload.id,
          product_qty: payload.product_qty
        }
      })
    },
    increase (context, id) {
      console.log('masuk increase')
      return axios({
        method: 'patch',
        url: `${baseUrl}/carts/increase/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    decrease (context, id) {
      console.log('masuk decrease')
      return axios({
        method: 'patch',
        url: `${baseUrl}/carts/decrease/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteCart (context, id) {
      console.log('masuik sini', id)
      return axios({
        method: 'delete',
        url: `${baseUrl}/carts/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
