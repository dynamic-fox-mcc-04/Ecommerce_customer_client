import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allproduct: [],
    pendingorder: [],
    listaddress: []
  },
  mutations: {
    SET_PRODUCT (state, databaru) {
      state.allproduct = databaru
    },
    SET_PENDING (state, databaru) {
      state.pendingorder = databaru
    },
    SET_ADDRESS (state, databaru) {
      state.listaddress = databaru
    }
  },
  actions: {
    fetchProduct (context, payload) {
      console.log('==========FETCH PRODUCT')
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/product/customer/all'
        })
          .then(result => {
            const newproducts = result.data.data
            context.commit('SET_PRODUCT', newproducts)
            resolve(result)
          })
          .catch(err => {
            console.log(err)
            context.commit('SET_PRODUCT', [])
            reject(err)
          })
      })
    },
    fetchPending (context, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/trans/pending',
        headers: {
          token: localStorage.token,
          idalamat: localStorage.idalamat
        }
      })
        .then(result => {
          const count = result.data.data
          context.commit('SET_PENDING', count)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAddress (context, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/customerdetail',
        headers: {
          token: localStorage.token,
          idalamat: localStorage.idalamat
        }
      })
        .then(result => {
          const count = result.data.data
          console.log('adddresssss', count)
          context.commit('SET_ADDRESS', count)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
