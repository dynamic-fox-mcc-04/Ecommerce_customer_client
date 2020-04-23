<template>
  <div id="app">
    <div id="nav" v-if="isLoggedIn">
      <router-link to="/dashboard">Products</router-link> |
      <router-link to="/shoppingcart">My Shopping Cart</router-link> |
      <a href="#" @click="logout">Log out</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('set_isLoggedIn', false)
      this.$router.push('/')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
