<template>
  <div class="home">
      <Navbar/>
      <div class="space">
      </div>
      <br><br>
      <h1>Ragnarok Online Marketplace</h1>
      <br><br>
    <login v-if="!log && !reg" />
    <register v-if="log && reg" />
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'
import login from '@/components/login.vue'
import register from '@/components/register.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Home',
  components: {
    ProductList,
    login,
    register,
    Navbar
  },
  computed: {
      log () {
          return this.$store.state.hideLogin
      },
      reg () {
          return this.$store.state.showRegister
      }
  }
}
</script>
<style scoped>
.home {
    text-align: center;
    width: 100%;
}

.space{
    height: 75px;
}
</style>
