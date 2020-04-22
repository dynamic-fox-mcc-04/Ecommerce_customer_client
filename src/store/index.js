import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'https://intense-refuge-03921.herokuapp.com',
    isLogin: false,
    products: [],
    currentCart: [],
    checkOut: [],
    transactions: []
  },
  mutations: {
    GET_TRANSACTIONS (state, payload) {
      state.transactions = []
      state.transactions = payload
    },
    SET_CART (state, tag) {
      if (localStorage.myCart && state.currentCart.length === 0) {
        state.currentCart = JSON.parse(localStorage.myCart)
      } else if (tag) {
        state.currentCart = []
      }
    },
    SET_CHECKOUT_IN (state, tag) {
      if (localStorage.myCheckOut && state.checkOut.length === 0 && !tag) {
        state.checkOut = JSON.parse(localStorage.myCheckOut)
      } else if (tag) {
        state.checkOut = []
      }
    },
    GET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CHECKOUT (state) {
      state.checkOut = []
      state.checkOut = state.currentCart
      state.currentCart = []
      localStorage.myCheckOut = JSON.stringify(state.checkOut)
      delete localStorage.myCart
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    EDIT_CART (state, payload) {
      state.currentCart.forEach(el => {
        if (el.id === payload.id) {
          el.total = payload.total
          el.quantity = payload.qty
        }
      })
    },
    ADD_CART (state, payload) {
      console.log(payload)
      state.currentCart.push(payload)
      localStorage.myCart = null
      localStorage.myCart = JSON.stringify(state.currentCart)
    },
    REMOVE_CART (state, payload) {
      const temp = state.currentCart.filter(el => {
        if (el.id !== payload) {
          return el
        }
      })
      state.currentCart = []
      state.currentCart = temp
      localStorage.myCart = null
      localStorage.myCart = JSON.stringify(state.currentCart)
    }
  },
  actions: {
    getProduct (context, tag) {
      const categorySrc = tag || ''
      console.log(tag)
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: this.state.baseUrl + '/products?category=' + categorySrc
        })
          .then((result) => {
            resolve(result)
            console.log(result.data.products)
            context.commit('GET_PRODUCTS', result.data.products)
          }).catch((err) => {
            reject(err)
            console.log(err)
          })
      })
    },
    pay (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: this.state.baseUrl + '/carts',
          headers: {
            access_token: localStorage.access_token
          },
          data: payload.payload
        })
          .then((result) => {
            console.log(result)
            resolve(result)
            context.commit('SET_CHECKOUT', true)
            context.dispatch('updateStock', payload.payloadUpdate)
          }).catch((err) => {
            console.log(err.response.data)
          })
      })
    },
    updateStock (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: this.state.baseUrl + `/products/${payload.id}`,
          headers: {
            access_token: localStorage.access_token
          },
          data: payload
        })
        .then((result) => {
          resolve(result)
          context.dispatch('getProduct')
          context.dispatch('getTransaction')
          console.log(result)
        }).catch((err) => {
          reject(err)
          console.log(err)
        })
      })
    },
    getTransaction (context) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: this.state.baseUrl + '/carts',
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then((result) => {
          resolve(result)
          console.log(result.data.result)
          context.commit('GET_TRANSACTIONS', result.data.result)
          
        }).catch((err) => {
          console.log(err.response.data, '<<<<<')
          reject(err)
          console.log(err)
        })
      })
    }
  },
  modules: {
  }
})
