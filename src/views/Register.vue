<template>
<div class="register">
  <h1>Register</h1>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <div class="d-flex bd-highlight mb-3">
        <b-button type="submit" variant="primary" class="mr-auto p-2 bd-highlight">Register</b-button>
        <b-button type="reset" variant="danger" class="p-2 bd-highlight">Login</b-button>
      </div>
    </b-form>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      axios({
        method: 'post',
        url: 'https://cryptic-garden-80789.herokuapp.com/register',
        data: {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(data => {
          console.log(data.data.message)
          this.onReset()
        })
        .catch(err => {
          console.log(err)
        })
    },
    onReset () {
      this.$router.push('/login')
    }
  },
  created () {
    this.form.email = ''
    this.form.name = ''
    this.form.password = ''
    if (localStorage.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.register {
  margin: 40px 35% 0px 35%;
}
</style>
