<template>
  <div>
    <h3>Best-selling Grains</h3>
    <div class="ProductCard-Container">
      <ProductCard/>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductBox',
  components: {
    ProductCard
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    allProducts () {
      return this.$store.state.allProducts
    }
  }
}
</script>

<style>
.ProductCard-Container{
    display: flex;
    justify-content: center;
}
</style>
