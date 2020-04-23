<template>
  <div>
      <h1>Your Shopping Cart</h1>
      <div class="shoppingcart-product-box">
        <div v-if="shoppingCartProducts.length==0" class="shoppingCart-card">
            <h3>No product added yet</h3>
        </div>
        <ShoppingCartCard/>
      </div>
  </div>
</template>

<script>
import ShoppingCartCard from '../components/ShoppingCartCard.vue'

export default {
  name: 'ShoppingCart',
  components: {
    ShoppingCartCard
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    shoppingCartProducts () {
      return this.$store.state.shoppingCartProducts
    }
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('fetchShoppingCartProducts')
      this.$store.commit('set_isLoggedIn', true)
    }
  }
}
</script>

<style>
.shoppingcart-product-box{
    display: flex;
    flex-direction: row;
}
</style>
