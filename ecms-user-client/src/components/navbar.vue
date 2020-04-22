<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand router-link to="/">Caddy's Shack</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item router-link to="/products" v-if="isLogin">Products</b-nav-item>
        <b-nav-item router-link to="/products/cart" v-if="isLogin">Cart</b-nav-item>
        <b-nav-item router-link to="/products/history" v-if="isLogin">Order History</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User Panel</em>
          </template>
          <b-dropdown-item router-link to="/register" v-if="!isLogin">Register</b-dropdown-item>
          <b-dropdown-item router-link to="/login" v-if="!isLogin">Login</b-dropdown-item>
          <b-dropdown-item @click.prevent="Logout" v-if="isLogin">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
    }
  },
  methods: {
    Logout () {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      } else {
      }
      localStorage.removeItem('access_token')
      this.$toasted.show('Please Come Again~')
      this.$store.commit('SET_ISLOGIN', false)
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }

}
</script>

<style>

</style>
