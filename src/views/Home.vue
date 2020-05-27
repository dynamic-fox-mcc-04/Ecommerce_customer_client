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
    if (localStorage.access_token && !localStorage.OrderId) {
      this.$store.dispatch('newOrder')
        .then(({ data }) => {
          localStorage.setItem('OrderId', data.id)
          this.$store.commit('setOrderId', data.id)
          this.$store.commit('updateStockProduct', data.quantity)
        })
        .catch(err => this.$alert(err))
    }
  }
}
</script>
