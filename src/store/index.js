import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      password: ''
    },
    isLogin: false,
    products: [],
    carts: [],
    cart: {
      total_price: 0,
      quantity: 0,
      OrderId: 0,
      ProductId: 0
    },
    product: {
      id: 0,
      stock: 0
    },
    amount: 0
  },
  mutations: {
    setInitialStock (state, stock) {
      state.product.stock = stock
    },
    updateStockProduct (state) {
      state.product.stock -= state.cart.quantity
    },
    setTotalPrice (state, price) {
      state.cart.total_price = price
    },
    setQuantity (state) {
      state.cart.quantity++
    },
    setOrderId (state, id) {
      state.cart.OrderId = id
    },
    setProductId (state, id) {
      state.cart.ProductId = id
    },
    setEmail (state, email) {
      state.user.email = email
    },
    setPassword (state, password) {
      state.user.password = password
    },
    setLogin (state, status) {
      state.isLogin = status
    },
    resetUser (state, payload) {
      state.user = { email: '', password: '' }
    },
    fillProducts (state, products) {
      state.products = products
    },
    fillCarts (state, carts) {
      state.carts = carts
    },
    resetCart (state) {
      state.cart = {
        total_price: 0,
        quantity: 0,
        OrderId: state.cart.OrderId,
        ProductId: 0
      }
    },
    setAmount (state, amount) {
      state.amount = amount
    }
  },
  actions: {
    register () {
      return axios({
        method: 'post',
        url: 'https://protected-thicket-20896.herokuapp.com/register',
        data: {
          email: this.state.user.email,
          password: this.state.user.password
        }
      })
    },
    login () {
      return axios({
        method: 'post',
        url: 'https://protected-thicket-20896.herokuapp.com/login',
        data: {
          email: this.state.user.email,
          password: this.state.user.password
        }
      })
    },
    getProducts () {
      return axios({
        method: 'get',
        url: 'https://protected-thicket-20896.herokuapp.com/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    newOrder () {
      return axios({
        method: 'post',
        url: 'https://protected-thicket-20896.herokuapp.com/orders',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    toCart () {
      return axios({
        method: 'post',
        url: 'https://protected-thicket-20896.herokuapp.com/orders/cart',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          total_price: this.state.cart.total_price,
          quantity: this.state.cart.quantity,
          OrderId: localStorage.OrderId,
          ProductId: this.state.cart.ProductId
        }
      })
    },
    updateStockProduct () {
      return axios({
        method: 'put',
        url: `http://localhost:3000/products/${this.state.cart.ProductId}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          stock: this.state.product.stock
        }
      })
    },
    getCarts () {
    //   const OrderId = Number(localStorage.OrderId)
      return axios({
        method: 'get',
        url: 'https://protected-thicket-20896.herokuapp.com/orders/cart/' + localStorage.OrderId,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          OrderId: this.state.OrderId
        }
      })
    },
    checkOut () {
      return axios({
        method: 'put',
        url: 'https://protected-thicket-20896.herokuapp.com/orders',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          OrderId: localStorage.OrderId,
          amount: this.state.amount
        }
      })
    }
  }
})
