<template>
  <div class="cart">
      <Navbar/>
      <div class="space">
      </div>
      <br><br>
    <h1>My Cart</h1>
    <div class="cart-list">
    <ProductCart v-for="product in carts" :key="product.Product" :product="product" />
    </div>
  </div>
</template>
<script>
import ProductCart from '../components/ProductCart'
import Navbar from '@/components/Navbar.vue'

export default{
    name: 'Cart',
    components: {
        ProductCart,
        Navbar
    },
    computed: {
      carts () {
          return this.$store.state.carts
      }
  },
    created () {
        this.$store.dispatch('fetchCart')
        if(!localStorage.access_token){
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>

.cart{
    text-align: center;
}
.space{
    height: 75px;
}
.cart-list{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 30px;
    margin-right: 30px;
}
</style>
