<template>
<div class="home">
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
            <div class="navbar -nav mx-3" v-if="!loginStatus">
              <button class="btn btn-success" type="submit" v-on:click="login">Log In</button>
            </div>
            <div class="body">
            </div>
          </nav>
        </div>
      </div>
    </div>
    <div class="row" id="body">
      <div class="col-md-12 mx-auto" id="productList">
        <productCard v-for="product in products" :key="product.id" :product="product"/>
      </div>
    </div>
</div>

</template>

<script>
import productCard from '../components/productCard'
export default {
  name: 'Home',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_ISLOGIN', false)
    },
    login () {
      this.$router.push('/login')
    }
  },
  components: {
    productCard
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    loginStatus () {
      return this.$store.state.isLogin
    }
  },
  created () {
    this.$store.dispatch('findAll')
    if (!localStorage.access_token) {
      this.$store.commit('SET_ISLOGIN', false)
    } else {
      this.$store.commit('SET_ISLOGIN', true)
    }
  }

}
</script>
