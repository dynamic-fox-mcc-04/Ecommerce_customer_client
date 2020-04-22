<template>
  <div class="containerProduct d-flex align-items-start flex-wrap justify-content-center">
      <ProductCard v-for="product in products" :key="product.id" :src="product.image_url" :price="product.price" :name="product.name" :stock="product.stock" :id="product.id"></ProductCard>
  </div>
</template>

<script>
import ProductCard from './ProductCard'
export default {
  name: 'ContainerProduct',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>
.containerProduct {
    padding: 10px;
    padding-bottom: 80px;
    width: 70vw;
    position: relative;
}
</style>
