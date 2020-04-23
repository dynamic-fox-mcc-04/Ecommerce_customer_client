<template>
  <div class="cart-page">
    <Loader v-if="isLoading"/>
    <div class="cart-space">
      <h2 v-if="carts.length == 0">your cart is empty, back to <b @click="redirToCatalog" style="cursor: pointer;">catalog</b> to continue shopping</h2>
      <CartCard v-for="cart in carts" :key="cart.id" :cart="cart"/>
    </div>
    <div class="checkout-space">
      <div></div>
      <div class="d-flex flex-column align-items-end">
        <h3>Total: {{ carts.length }} items</h3>
        <h2 style="font-weight: 600;">IDR {{ total }}</h2>
      </div>
      <div class="d-flex flex-rowalign-items-center justify-content-center w-100">
        <button @click="toast" class="btn btn-success w-50 p-3 m-2">Checkout</button>
        <button @click="redirToCatalog" class="btn btn-danger w-50 p-3 m-2">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard.vue'
import Loader from '../components/Loader'
export default {
  name: 'CartPage',
  methods: {
    toast () {
      this.$toasted.show('Sorry, this feature is not available at the moment', {
        duration: 4000
      })
    },
    redirToCatalog () {
      this.$router.push('/catalog')
    }
  },
  components: {
    CartCard,
    Loader
  },
  created () {
    this.$store.dispatch('fetchCarts')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    total () {
      let totalPrice = 0
      for (let i = 0; i < this.carts.length; i++) {
        totalPrice += +this.carts[i].product_qty * +this.carts[i].Product.price
      }
      return totalPrice
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss">
.cart-page {
  height: 100vh;
  display: flex;
}
.cart-space {
  color: #2E4756;
  width: 70%;
  padding: 5rem 5vh;
  overflow-y: scroll;
}
.checkout-space {
  background-color: #2E4756;
  width: 30%;
  padding: 5rem 5vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  color: white;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #3C7A89;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2E4756;
}
</style>