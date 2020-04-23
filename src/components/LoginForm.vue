<template>
<div class="container">
    <!-- Material form login -->
<div class="card col-4 offset-4">

  <h5 class="card-header info-color white-text text-center py-4">
    <strong>Login</strong>
  </h5>

  <!--Card content-->
  <div class="card-body px-lg-5 pt-0">

    <!-- Form -->
    <form class="text-center" style="color: #757575;" @submit.prevent="login">

      <!-- Email -->
      <div class="md-form">
        <input type="email" v-model="email" id="materialLoginFormEmail" class="form-control">
        <label for="materialLoginFormEmail">E-mail</label>
      </div>

      <!-- Password -->
      <div class="md-form">
        <input type="password" v-model="password" id="materialLoginFormPassword" class="form-control">
        <label for="materialLoginFormPassword">Password</label>
      </div>

      <!-- Sign in button -->
      <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Login</button>

      <!-- Register -->
      <p>New Customer?
        <router-link to="/regis">Register</router-link>
      </p>
      <!-- Social login -->
      <p>or sign in with:</p>
      <a type="button" class="btn-floating btn-fb btn-sm">
        <i class="fa fa-facebook-official"></i>
      </a>
      <a type="button" class="btn-floating btn-tw btn-sm">
        <i class="fab fa-twitter"></i>
      </a>
      <a type="button" class="btn-floating btn-li btn-sm">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a type="button" class="btn-floating btn-git btn-sm">
        <i class="fab fa-github"></i>
      </a>

    </form>
    <!-- Form -->
  </div>
</div>
<!-- Material form login -->
</div>
</template>

<script>
export default {
  name: 'LoginForm',
  methods: {
    login () {
      this.$store.dispatch('login')
        .then(({ data }) => {
          const { email } = data
          this.$store.commit('setLogin', true)
          this.$store.commit('resetUser')
          this.$alert(`success login, welcome ${email}`)
          localStorage.setItem('access_token', data.access_token)
          this.$router.push('/')
          return this.$store.dispatch('newOrder')
        })
        .then(({ data }) => {
          localStorage.setItem('OrderId', data.id)
          this.$store.commit('setOrderId', data.id)
          this.$store.commit('updateStockProduct', data.quantity)
        })
        .catch(err => this.$alert(err))
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.state.user.email
      },
      set (val) {
        return this.$store.commit('setEmail', val)
      }
    },
    password: {
      get () {
        return this.$store.state.user.password
      },
      set (val) {
        return this.$store.commit('setPassword', val)
      }
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('setLogin', true)
    }
  }
}
</script>

<style>

</style>
