<template>
  <nav class="navbar navbar-expand-sm navbar-light d-flex justify-content-md-between align-items-center" id="navbar">
    <div id="left-cointainer" class="d-flex justify-content-center align-items-center">
        <h1 class="text-white"><i class="fas fa-shoe-prints text-white"></i>Brada</h1>
    </div>

    <div id="mid-container" class="d-flex justify-content-center">
    </div>

    <div id="right-container" class="d-flex justify-content-center align-items-center">
      <router-link :to="{name: 'Home'}"><button class="homeBtn btn btn-success"><i class="fas fa-home"></i>Home</button></router-link>
      <div v-if="isLogin">
        <router-link :to="{name: 'Cart'}"><button type="button" class="btn btn-primary"><i class="fas fa-shopping-cart"></i>See Cart <span class="badge badge-light">{{unPaidCarts}}</span>
</button></router-link>
        <button type="button" id="logout" class="btn btn-danger m-1" @click="logout">Logout</button>
      </div>
      <router-link v-if="!isLogin" :to="{name: 'Login'}"><button type="button" id="login" class="btn btn-warning m-1 btnLogin">Login</button></router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    unPaidCarts () {
      return this.$store.getters.unPaidCarts.length
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_ISLOGIN', false)
      this.$router.push('/login')
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_ISLOGIN', true)
    }
  }
}
</script>
<style>
  .form-inline {
    background: none;
  }
  .btnLogin {
    font-family: tahoma;
    font-weight: bold;
  }
  .navbar {
    background: rgb(63, 62, 68);
    box-shadow: 8px 8px 8px 0 grey;
    position: fixed;
    width: 100%;
    z-index: 1000;
  }
  .navbar h1 {
      font-family: 'Permanent Marker', cursive;
      text-transform: uppercase;
      text-align: center;
      margin-right: 20px;
  }
  #left-container {
    text-decoration: none;
  }
  .navbar i {
    margin-right: 10px;
  }
  .badge {
    margin-left: 10px;
  }
</style>
