<template>
  <div>
    <div class="row" id="navbarRow">
      <div class="col-md-12 fixed" >
        <div class="container-fluid-sm">
          <nav class="navbar navbar-expand-sm bg-info navbar-dark" id="navBar">
            <div class="navbar -nav mx-auto">
                <router-link to="/" class="nav-link" style="color:white;">Home</router-link>
                <router-link to="/cart" class="nav-link" style="color:white;">My Cart</router-link>
            </div>
            <div class="navbar -nav mx-3" v-if="loginStatus">
              <button class="btn btn-success" type="submit" v-on:click="logout">Logout</button>
            </div>
            <div class="body">
            </div>
          </nav>
        </div>
      </div>
    </div>
    <div class="row" id="cartBody">
      <div class="col-md-6 mx-auto" id="cartList">
        <h1>Your Shopping Cart</h1>
        <cartCard v-for="cartProduct in cartProducts" :key="cartProduct.id" :cartProduct="cartProduct" :quantity="cartProduct.quantity"/>
      </div>
    </div>
  </div>
</template>

<script>
import cartCard from './cartCard'
export default {
  name: 'cart',
  components: {
    cartCard
  },
  created () {
    console.log(this.$store.state.isLogin)
    if (localStorage.access_token) {
      this.$store.commit('SET_ISLOGIN', true)
    }
    if (!this.$store.state.isLogin) {
      this.$router.push('/login')
    }
    this.$store.dispatch('findAllCart')
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_ISLOGIN', false)
      this.$router.push('/')
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.isLogin
    },
    cartProducts () {
      return this.$store.state.cartProducts
    }
  }
}
</script>

<style>

</style>
