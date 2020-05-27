<template>
  <!-- Default form register -->
<form class="text-center border border-light p-5 col-4 offset-4" @submit.prevent="register" >
    <p class="h4 mb-4">Sign up</p>
    <div class="form-row mb-4 ">
    </div>
    <!-- E-mail -->
    <input type="email" v-model="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail" required>
    <!-- Password -->
    <input type="password" v-model="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" required>
    <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
        At least 8 characters and 1 digit
    </small>
    <!-- Sign up button -->
    <button class="btn btn-info my-4 btn-block" type="submit">Sign up!</button>
    <!-- Social register -->
    <p>or sign up with:</p>
    <a href="#" class="mx-2" role="button"><i class="fa fa-facebook-official"></i></a>
    <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
    <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
    <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>
    <hr>
</form>
<!-- Default form register -->
</template>

<script>
export default {
  name: 'Register',
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
  methods: {
    register () {
      this.$store.dispatch('register')
        .then(({ data }) => {
          this.$alert(data)
          this.$router.push('/login')
          this.$store.commit('resetUser')
        })
        .catch(err => this.$alert(err, 'please use another email'))
    }
  }
}
</script>

<style>

</style>
