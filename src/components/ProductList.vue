<template>
<div class="content">
  <div class="ProductList">
        <ProductCard v-for="product in products" :key="product.name" :product="product" />
  </div>
</div>
</template>

<script>
import ProductCard from './ProductCard'
export default {
  name: 'ProductList',
  components: {
      ProductCard
  },
  computed: {
      products () {
          return this.$store.state.products
      }
  },
  created () {
      this.$store.dispatch('fetchProducts')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0; 
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}
.ProductList{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: 30px;
    margin-right: 30px;
}

</style>
