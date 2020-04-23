import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    carts: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    fetchProducts ({ commit }, category) {
      console.log('masook fetching products')
      const loader = Vue.prototype.$loading.show({
        container: null,
        canCancel: true,
        onCancel: this.onCancel
      })
      console.log(category)
      if (category) {
        return axios({
          method: 'get',
          url: `https://arcane-depths-40011.herokuapp.com/products?category=${category}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            loader.hide()
            console.log('berhasil fetching: ', data.Products)
            commit('SET_PRODUCTS', data.Products)
          })
          .catch(err => {
            console.log('err fetching: ', err.response.data.errors)
          })
      } else {
        return axios({
          method: 'get',
          url: 'https://arcane-depths-40011.herokuapp.com/products',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            loader.hide()
            console.log('berhasil fetching: ', data.Products)
            commit('SET_PRODUCTS', data.Products)
            console.log('isLogin', this.state.isLogin)
          })
          .catch(err => {
            console.log('err fetching: ', err.response.data.errors)
          })
      }
    },
    login ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: 'https://arcane-depths-40011.herokuapp.com/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    register ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: 'https://arcane-depths-40011.herokuapp.com/users/register',
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password
        }
      })
    },
    addCart ({ commit }, payload) {
      return axios({
        method: 'post',
        url: 'https://arcane-depths-40011.herokuapp.com/carts',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload
        }
      })
    },
    fetchCarts ({ commit }, payload) {
      return axios({
        method: 'get',
        url: 'https://arcane-depths-40011.herokuapp.com/carts',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('success fetching cart', data.Carts)
          commit('SET_CARTS', data.Carts)
        })
        .catch(err => {
          console.log('error fetch cart', err.response.data.errors[0].message)
        })
    },
    patchCart ({ commit }, payload) {
      console.log('masuk patch cart', payload)
      return axios({
        method: 'patch',
        url: `https://arcane-depths-40011.herokuapp.com/carts/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          action: payload.action
        }
      })
    },
    deleteCart ({ commit }, payload) {
      return axios({
        method: 'delete',
        url: `https://arcane-depths-40011.herokuapp.com/carts/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    checkoutCart ({ commit }, payload) {
      console.log('masuk checkout')
      return axios({
        method: 'patch',
        url: 'https://arcane-depths-40011.herokuapp.com/carts/checkout',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  getters: {
    unPaidCarts: state => {
      return state.carts.filter(el => el.isPaid === false)
    },
    paidCarts: state => {
      return state.carts.filter(el => el.isPaid === true)
    }
  }
})
