import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    user: {},
    cart: []
  },
  mutations: {
    BUY (state, id) {
      state.updateData = state.products.find(el => el.id === id)
      state.updateData = {
        id: state.updateData.id,
        name: state.updateData.name,
        image_url: state.updateData.image_url,
        price: state.updateData.price,
        stock: state.updateData.stock,
        description: state.updateData.description
      }
      if (state.updateData.stock > 0) {
        state.updateData.stock--
      }
    }
  },
  actions: {
    search (state, name) {
      state.products = state.products.filter(el => el.name.toLowerCase().includes(name))
    },
    getProduct (context) {
      axios({
        method: 'get',
        url: 'https://cryptic-garden-80789.herokuapp.com/product',
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          context.state.products = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCart (context) {
      axios({
        method: 'get',
        url: 'https://cryptic-garden-80789.herokuapp.com/order',
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          console.log(data)
          context.state.cart = data.data
        })
        .catch(err => {
          console.log('Get cart gagal :(')
          console.log(err)
        })
    },
    addCart (context, product) {
      axios({
        method: 'post',
        url: 'https://cryptic-garden-80789.herokuapp.com/order/add',
        data: {
          ProductId: product.id,
          sum: product.sum,
          stock: product.stock
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeCart (context, order) {
      axios({
        method: 'delete',
        url: `https://cryptic-garden-80789.herokuapp.com/order/${order.id}/delete`,
        data: {
          order: order
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
