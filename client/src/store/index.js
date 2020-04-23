import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    allProducts: [],
    shoppingCartProducts: []
  },
  mutations: {
    set_isLoggedIn (state, status) { // panggil dengan COMMIT
      state.isLoggedIn = status
    },
    set_allProducts (state, payload) {
      state.allProducts = payload
    },
    set_shoppingCartProducts (state, payload) {
      state.shoppingCartProducts = payload
    }
  },
  actions: {
    fetchProducts (context) { // panggil dengan DISPATCH
      // panggil axios di sini, kemudian set state.allproducts menggunakan context.commit('set_products', allProducts)
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(result.data.products)
          const allProducts = result.data.products
          context.commit('set_allProducts', allProducts)
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchShoppingCartProducts (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/shoppingCart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(result.data.products)
          const allShoppingCartProducts = result.data.products
          context.commit('set_shoppingCartProducts', allShoppingCartProducts)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
