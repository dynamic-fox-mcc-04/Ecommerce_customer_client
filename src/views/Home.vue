<template>
  <div class="home">
    <CardProduct/>
    <button @click="makeOrder">Make Order</button>
  </div>
</template>

<script>
// @ is an alias to /src
import CardProduct from '../components/CardProduct.vue'

export default {
  name: 'Home',
  methods: {
    makeOrder () {
      this.$router.push('/carts')
    }
  },
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
