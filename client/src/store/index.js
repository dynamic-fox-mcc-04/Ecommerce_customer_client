import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    products: {},
    isLogin: false,
    cartProducts: {}
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_CARTPRODUCTS (state, payload) {
      state.cartProducts = payload
    }
  },
  actions: {
    findAll (context, payload) {
      // console.log('masuk')
      axios({
        method: 'GET',
        url: 'https://polar-dusk-05144.herokuapp.com/product'
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data.Product)
          console.log(data.Product)
          // this.products = data.Product
          // this.task= data.Task
        })
        .catch(err => {
          console.log('masukerror')
          console.log(err)
        })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'https://polar-dusk-05144.herokuapp.com/signin',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            context.commit('SET_ISLOGIN', true)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    signup (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'https://polar-dusk-05144.herokuapp.com/signup',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            context.commit('SET_ISLOGIN', true)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    createProduct (context, payload) {
      // console.log('masuk')
      axios({
        method: 'POST',
        url: 'https://polar-dusk-05144.herokuapp.com/cart/',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: payload.name,
          price: payload.price,
          image_url: payload.image_url,
          ProductId: payload.ProductId,
          quantity: payload.quantity
        }
      })
        .then(({ data }) => {
          console.log('success')
          // context.commit('SET_CARTPRODUCTS', data.Cart)
        })
        .catch(err => {
          console.log('masuk error')
          console.log(err)
        })
    },
    findAllCart (context, payload) {
      // console.log('masuk')
      axios({
        method: 'GET',
        url: 'https://polar-dusk-05144.herokuapp.com/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('SET_CARTPRODUCTS', data.Cart)
        })
        .catch(err => {
          console.log(err)
        })
    },
    hapusCart (_, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: 'https://polar-dusk-05144.herokuapp.com/cart/' + payload,
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updatePaid (_, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: 'https://polar-dusk-05144.herokuapp.com/cart/' + payload,
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateStock (_, payload) {
      // console.log(payload.ProductId, '<<<<')
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: 'https://polar-dusk-05144.herokuapp.com/cart/product',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            ProductId: payload.ProductId,
            quantity: payload.quantity
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
