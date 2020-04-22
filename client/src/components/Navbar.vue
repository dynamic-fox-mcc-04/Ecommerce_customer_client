<template>
<div>
   <LoginForm v-if="showForm" @showLogin="toggleShow" />
<div class="navbar-wrap">
<div class="navbar">
  <div class="title">
    <h1 @click.prevent="home">.Balada.</h1>
  </div>
  <div class="search">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search biycle" aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-primary" type="button">Search</button>
      </div>
    </div>
  </div>
  <div class="basket">
    <button class="basket-btn"><i class="fas fa-shopping-basket"></i><span class="badge badge-danger">5</span></button>
  </div>
  <div class="user-form">
    <div class="notLogin" v-if="!isLogin">
      <button type="button" class="btn btn-outline-primary" @click.prevent="toggleForm">Login</button>
      <button type="button" class="btn btn-primary" @click.prevent="register">Register</button>
    </div>
    <div class="notLogin" v-else>
      <b-avatar class="mr-3"></b-avatar>
      <h4 class="avatar-name">{{name}}</h4>
      <button type="button" class="btn btn-outline-primary" @click.prevent="logout">Logout</button>
    </div>
  </div>
</div>
</div>
<div>
</div>
</div>
</template>

<script>
import LoginForm from '../components/loginForm'
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    LoginForm
  },
  data () {
    return {
      showForm: false
    }
  },
  computed: {
    ...mapState(['isLogin']),
    ...mapState(['name'])
  },
  methods: {
    toggleForm () {
      this.showForm = !this.showForm
    },
    toggleShow (value) {
      this.showForm = false
    },
    home () {
      this.$router.push('/')
    },
    register () {
      this.$router.push('/register')
    },
    logout () {
      localStorage.clear()
      this.$store.commit('set_login', false)
      this.$router.push('/')
      this.fetchProducts()
    }
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

  .navbar-wrap {
    position: fixed;
    z-index: 9;
    width: 100%;
  }
  .avatar-name {
    font-size: 16px;
    color: white;
    margin-top: 10px;
    margin-right: 60px;
    margin-left: 0px;
  }
  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 64px;
    background: #120136;
  }

  .basket-btn {
    background: none;
    border: none;
    padding-top: 0;
  }

   .basket-btn:focus {
    outline: none;
  }

  .title h1 {
    font-family: 'Merienda', cursive;
    color: white;
    font-size: 24px;
  }

  .title h1:hover {
    cursor: pointer;
  }

  .basket .fa-shopping-basket {
    color: white;
    width: 32px;
    height: 32px;
    margin-top: -5px;
  }
  .notLogin button {
    margin-right: 10px;
  }

  .notLogin {
    margin-top: -10px;
  }

  .notLogin {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .search {
    width: 60%;
    margin-top: 5px;
  }
</style>
