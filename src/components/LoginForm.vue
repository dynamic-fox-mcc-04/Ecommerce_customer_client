<template>
  <div>
      <form @submit.prevent="login">
          <input type="text" placeholder="Your email" v-model="user.email"><br>
          <input type="password" placeholder="Your password" v-model="user.password"><br><br>
          <input type="submit">
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // axios
      const payload = {
        email: this.user.email,
        password: this.user.password
      }
      // console.log(payload)
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: payload
      })
        .then(result => {
          localStorage.setItem('access_token', result.data.access_token)
          this.$router.push('/dashboard')// push ke NAMA component, bukan route-nya
          // di sini kamu juga ubah state isLoggedIn menjadi true menggunakan commit
          this.$store.commit('set_isLoggedIn', true)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
