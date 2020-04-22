<template>
  <div>
  <div class="home">
    <Navbar />
    <div class="content-wrap">
      <router-view />
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  created () {
    if (localStorage.customer_token) {
      this.$store.commit('set_name', localStorage.name)
      this.$store.commit('set_login', true)
    }
  }
}
</script>

<style>
  .home {
    background: rgb(238, 237, 237);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
