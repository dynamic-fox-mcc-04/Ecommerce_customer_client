<template>
  <div>
    <h1>Welcome to GrainStore!</h1>
    <h3>Please sign in below</h3>
    <loginForm/>
    <h3>New to GrainStore? Click <a href="#" @click="goToRegister">here to register</a></h3>
  </div>
</template>

<script>
import loginForm from '../components/LoginForm.vue'

export default {
  name: 'LandingPage',
  components: {
    loginForm
  },
  methods: {
    goToRegister () {
      this.$router.push('/register')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$router.push('/dashboard')// Jika ada access_token, paksa masuk ke dashboard
    }
  }
}
</script>

<style>

</style>
