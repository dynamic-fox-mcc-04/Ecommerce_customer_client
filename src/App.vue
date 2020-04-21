<template>
  <div id="app">
    <div style="position: fixed; width: 100vw; z-index: 9999;">
      <img src="./assets/logo_navbar.png" alt="" style="width: 100px; position: absolute; z-index: 99999; margin: auto; left: 0; right: 0;">
      <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Home</button>
              </li>
              <li class="nav-item">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Fruits</button>
              </li>
              <li class="nav-item">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Vegetables</button>
              </li>
              <li class="nav-item">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Herbs</button>
              </li>
            </ul>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class='fas fa-shopping-cart'></i></button>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-if="!isLogin">Sign In</button>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-if="!isLogin">Sign Up</button>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-if="isLogin">Sign Out</button>
          </div>
        </nav>
    </div>
    <router-view/>
    <CartBar></CartBar>
  </div>
</template>

<script>
import CartBar from './components/CartBar'
export default {
  components: {
    CartBar
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
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
