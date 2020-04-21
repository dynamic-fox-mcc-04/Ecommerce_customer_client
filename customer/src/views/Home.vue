<template>
  <div class="home">
    <div class="container">
    <ProductCard v-for="product in allproduct" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ProductCard from '../components/ProductCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  methods: {
    ...mapActions(['fetchProduct'])
  },
  computed: {
    ...mapState(['allproduct'])
  },
  created () {
    this.fetchProduct()
    // this.$store.dispatch('fetchProduct')
  }
}
</script>
<style >
.container {
  display :flex
}
</style>
