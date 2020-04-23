<template>
  <div>
      <h1>Please register your email and password below!</h1>
      <form @submit.prevent="register">
          <input type="text" placeholder="Your email" v-model="user.email"><br>
          <input type="password" placeholder="Your password" v-model="user.password"><br><br>
          <input type="submit">
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      const newUser = {
        email: this.user.email,
        password: this.user.password
      }
      // console.log(newUser)
      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: newUser
      })
        .then(result => {
          this.$router.push('/')
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
