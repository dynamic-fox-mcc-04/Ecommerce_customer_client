<template>
<div>
  <div class="login" @click.prevent="showLogin">
  </div>
      <div class="loginForm">
          <div class="login-wrap">
            <router-link to="/register">sign up</router-link>
            <h1>Login</h1>
            <form @submit.prevent="login">
                <label for="email">Email</label>
                <input type="email" placeholder="ex. foo@mail.com" class="form-control" v-model="data.email" required><br>
                <label for="password">password</label>
                <input type="password" class="form-control" v-model="data.password" placeholder="password" required>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
            <div class="errors" v-if="errors">
                <div class="alert alert-danger" role="alert" v-for="error in errors" :key="error.id">
                    <li>{{error.message}}</li>
                </div>
            </div>
      </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginForm',
  data () {
    return {
      data: {
        email: '',
        password: ''
      },
      errors: []
    }
  },
  methods: {
    ...mapActions(['loginCustomer']),
    ...mapActions(['fetchCarts']),
    showLogin () {
      this.$emit('showLogin', false)
    },
    login () {
      this.loginCustomer(this.data)
        .then(result => {
          localStorage.setItem('customer_token', result.customer_token)
          localStorage.setItem('name', result.name)
          this.$store.commit('set_name', result.name)
          this.$store.commit('set_login', true)
          this.$emit('showLogin', false)
          this.fetchCarts()
          this.$router.push('/')
          this.errors = []
        })
        .catch(err => {
          this.errors = err.errors
        })
    }

  }

}
</script>

<style>
    .login {
        margin:0;
        position: fixed;
        z-index: 99;
        background-color: black;
        height: 100%;
        width: 100%;
        opacity: 20%;
    }
    .loginForm {
        z-index: 9999999;
        background: white;
        border: 1px rgb(224, 221, 221) solid;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        width: 30%;
        height: 70%;
        opacity: 100%;
        padding: 20px;
        border-radius: 5px;
    }

    .errors {
        margin-top: 30px;
        width: 100%;
    }

    form button {
        margin-top: 20px;
        text-align: center;
        width: 100%;
    }

    a {
        text-decoration: none;
        font-size: 20px;
    }

</style>
