<template>
  <div class="cartpg" v-if="!isLoading">
    <h2>MY SHOPPING CART</h2>
    <div class="recap">
      <h3>CURRENT SUBTOTAL</h3>
      <h4>IDR {{subtotals.total_price}}</h4>
      <h4>{{subtotals.total_items}} PCS</h4>
      <b-button variant="info" @click.prevent="checkout">CHECKOUT</b-button>
    </div>
    <CartCard
      v-for="cart in carts"
        :key="cart.id"
        :tray="cart"
        class="cards"
      />
  </div>
</template>

<script>
import CartCard from './CartCard'
import socket from '../config/socket'
export default {
  name: 'ShoppingCart',
  components: {
    CartCard
  },
  props: [],
  data () {
    return {
    }
  },
  methods: {
    checkout () {
      console.log('CHECKOUT @ SHOPPINGCART')
      const currUser = this.$store.state.user
      this.$store.dispatch('checkoutCart')
        .then(response => {
          console.log('CHECKOUT SUCCESS')
          console.log(response)
          socket.emit('checkedout', `USER ${currUser} CHECKEDOUT SOME ITEM(S) FROM STORE`)
          this.$toasted.success('CHECKOUT SUCCESS')
          this.$router.push({ path: '/orders' })
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    subtotals () {
      const trays = this.$store.state.carts
      let sumQty = 0
      let sumPrice = 0
      if (trays.length > 0) {
        for (var i = 0; i < trays.length; i++) {
          const tray = trays[i]
          sumQty += Number(tray.total_qty)
          sumPrice += (Number(tray.Product.price) * Number(tray.total_qty))
        }
      }
      return {
        total_items: sumQty,
        total_price: sumPrice
      }
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style scoped>
/* .cartpg {
    background-color: bisque;
} */
.cards {
  width: 50%;
  align-content: center;
  justify-items: center;
  align-items: center;
  margin-left: 25%;
  padding: 2vh;
}
.recap {
  margin: 2vh;
  padding: 2vh;
  background-color: burlywood;
  width: 50%;
  align-content: center;
  justify-items: center;
  align-items: center;
  margin-left: 25%;
  border: 0.5px solid black;
  border-radius: 25px;
}
</style>
