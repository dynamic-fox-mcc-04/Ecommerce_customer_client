<template>
  <div class="home">
    <CardProduct/>
  </div>
</template>

<script>
// @ is an alias to /src
import CardProduct from '../components/CardProduct.vue'

export default {
  name: 'Home',
  computed: {
    coba: {
      get () {
        return this.$store.state.coba
      }
    }
  },
  components: {
    CardProduct
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push('/login')
    }
  }
}
</script>
