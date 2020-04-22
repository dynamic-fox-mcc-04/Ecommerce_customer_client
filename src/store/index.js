import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'https://intense-refuge-03921.herokuapp.com',
    isLogin: false,
    products: [],
    currentCart: []
  },
  mutations: {
    SET_CART (state) {
      if (localStorage.myCart && state.currentCart.length == 0) {
        state.currentCart = localStorage.myCart
      }
    },
    GET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    ADD_CART (state, payload) {
      state.currentCart.push(payload)
      localStorage.myCart = null
      localStorage.myCart = JSON.stringify(state.currentCart)
      console.log(localStorage.myCart)
    },
    REMOVE_CART (state, payload) {
      let temp = state.currentCart.filter(el => {
        if (el.id != payload) {
          return el
        }
      })
      console.log(temp)
      state.currentCart = []
      state.currentCart = temp
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
    }
  },
  modules: {
  }
})
