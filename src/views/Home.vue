<template>
  <div class="home">
    <navbar></navbar>
    <div class="Product">
      <product>
      </product>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Product from '@/components/Product.vue'

export default {
  name: 'Home',
  components: {
    Navbar, Product
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/login')
    } else {
      this.$store.dispatch('getProduct')
    }
  }
}
</script>
