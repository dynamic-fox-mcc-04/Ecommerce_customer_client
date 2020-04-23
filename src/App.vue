<template>
  <div id="app">
    <vue-element-loading :active="isLoading" :is-full-screen="true"/>
    <div style="position: fixed; width: 100vw; z-index: 9999;">
      <img src="./assets/logo_navbar.png" alt="" style="width: 100px; position: absolute; z-index: 99999; margin: auto; left: 0; right: 0;">
      <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <router-link to="/" tag="button" class="btn btn-outline-success my-2 my-sm-0">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/transactions" tag="button" class="btn btn-outline-success my-2 my-sm-0">Checkout</router-link>
              </li>
            </ul>
              <router-link to="/signIn" tag="button" class="btn btn-outline-success my-2 my-sm-0" v-if="!isLogin">Sign In</router-link>
              <router-link to="/signUp" tag="button" class="btn btn-outline-success my-2 my-sm-0" v-if="!isLogin">Sign Up</router-link>
              <button @click.prevent="logout" class="btn btn-outline-success my-2 my-sm-0" type="submit" v-if="isLogin">Sign Out</button>
          </div>
        </nav>
    </div>
    <router-view/>
    <CartBar v-if="isLogin"></CartBar>
  </div>
</template>

<script>
import CartBar from './components/CartBar'
import { mapMutations } from 'vuex'
import VueElementLoading from 'vue-element-loading'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapMutations(['SET_ISLOGIN', 'SET_CART', 'SET_CHECKOUT_IN']),
    logout () {
      localStorage.clear()
      this.SET_ISLOGIN(false)
      this.$router.push('/signIn')
      this.SET_CART(true)
      this.SET_CHECKOUT_IN(true)
    },
    getProductCategory (category) {
      this.$store.dispatch('getProduct', category)
    }
  },
  components: {
    CartBar,
    VueElementLoading
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    this.$store.dispatch('getProduct')
    this.SET_CART()
    this.SET_CHECKOUT_IN()
    if (!localStorage.access_token) {
      this.SET_ISLOGIN(false)
    } else {
      this.isLoading = true
      this.$store.dispatch('getTransaction')
      .finally(() => {
        this.isLoading = false
      })
      this.SET_ISLOGIN(true)
    }
  }
}
</script>

<style>
.navbar-nav {
  color: #CFC08A;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#navbar {
  top: 22px;
  -webkit-box-shadow: 0px 0px 5px 2px rgba(207,192,138,0.59);
-moz-box-shadow: 0px 0px 5px 2px rgba(207,192,138,0.59);
box-shadow: 0px 0px 5px 2px rgba(207,192,138,0.59);
}

.navbar-collapse.before {
  margin-top: 100px
}

.btn {
  border: none;
  color: #CFC08A;
  font-family: 'Baloo Paaji 2', cursive ! important;
}

.btn:hover {
  background-color: #CFC08A;
}

#logoContainer {
  background-image: url('./assets/logo_navbar.png');
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: fixed;
}
</style>
