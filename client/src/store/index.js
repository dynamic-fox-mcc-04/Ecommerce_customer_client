import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    set_products (context, payload) {
      context.products = payload
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
    }
  },
  modules: {
  }
})
