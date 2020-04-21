import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allproduct: []
  },
  mutations: {
    SET_PRODUCT (state, databaru) {
      state.allproduct = databaru
    }
  },
  actions: {
    fetchProduct (context, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product'
      })
        .then(result => {
          const newproducts = result.data.data
          context.commit('SET_PRODUCT', newproducts)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
