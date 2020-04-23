<template>
  <div>
      <div>
      <h1>Dashboard</h1>
      </div>
      <div>
      <ProductBox/>
      </div>
  </div>
</template>

<script>
import ProductBox from '../components/ProductBox.vue'

export default {
  name: 'Dashboard',
  components: {
    ProductBox
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    allProducts () {
      return this.$store.state.allProducts
    }
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('fetchProducts')
      this.$store.commit('set_isLoggedIn', true)
    }
  }
}
</script>

<style>

</style>
