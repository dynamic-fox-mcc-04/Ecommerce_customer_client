import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Products: [],
    Cart: [],
    Order: [],
    isLogin: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.Products = payload
    },
    SET_CART (state, payload) {
      state.Cart = payload
    },
    SET_ORDER (state, payload) {
      state.Order = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    FetchProducts (context, payload) {
      return axios({
        url: 'http://localhost:3000/product',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    Login (context, payload) {
      return axios({
        url: 'http://localhost:3000/user/login',
        method: 'POST',
        data: {
          Email: payload.Email,
          Password: payload.Password
        }
      })
    },
    Register (context, payload) {
      return axios({
        url: 'http://localhost:3000/user/register',
        method: 'POST',
        data: {
          Email: payload.Email,
          Password: payload.Password
        }
      })
    },
    FetchDetail (context, payload) {
      return axios({
        url: `http://localhost:3000/product/${payload}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    FetchCart (context, payload) {
      return axios({
        url: 'http://localhost:3000/cart',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    AddCart (context, payload) {
      return axios({
        url: 'http://localhost:3000/cart',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ProductId: payload.ProductId,
          Quantity: payload.Quantity
        }
      })
    },
    UpdateCart (context, payload) {
      return axios({
        url: `http://localhost:3000/cart/${payload.id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ProductId: payload.ProductId,
          Quantity: payload.Quantity
        }
      })
    },
    DeleteCart (context, payload) {
      return axios({
        url: `http://localhost:3000/cart/${payload}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    FetchOrder (context, payload) {
      return axios({
        url: 'http://localhost:3000/cart/order',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    Checkout (context, payload) {
      return axios({
        url: 'http://localhost:3000/cart/checkout',
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    GetCartDetail (context, payload) {
      return axios({
        url: `http://localhost:3000/cart/${payload}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }

  },
  modules: {
  }
})
