import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://powerful-lake-70062.herokuapp.com'

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    isLoading: false
  },
  mutations: {
    SET_PRODUCT (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.carts = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    signup (context, payload) {
      const name = payload.name
      const email = payload.email
      const password = payload.password
      return axios({
        method: 'POST',
        url: `${baseUrl}/user/signup`,
        data: {
          name,
          email,
          password
        }
      })
    },
    signin (context, payload) {
      const email = payload.email
      const password = payload.password
      return axios({
        method: 'POST',
        url: `${baseUrl}/user/signin`,
        data: {
          email,
          password
        }
      })
    },
    signout (context) {
      localStorage.clear()
      router.push({ path: '/' })
    },
    fetchProduct (context, payload) {
      context.commit('SET_LOADING', true)
      axios({
        method: 'GET',
        url: `${baseUrl}/product`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCT', data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },
    getProduct (context, id) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'GET',
        url: `${baseUrl}/product/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    addCart (context, payload) {
      return axios({
        method: 'POST',
        url: `${baseUrl}/cart`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload
        }
      })
    },
    fetchCart (context, payload) {
      axios({
        method: 'GET',
        url: `${baseUrl}/cart`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_CART', data.cart)
        })
        .catch(err => {
          console.log(err)
        })
    },
    increase (context, id) {
      return axios({
        method: 'PATCH',
        url: `${baseUrl}/cart/increase/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    decrease (context, id) {
      return axios({
        method: 'PATCH',
        url: `${baseUrl}/cart/decrease/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteCart (context, id) {
      return axios({
        method: 'DELETE',
        url: `${baseUrl}/cart/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
