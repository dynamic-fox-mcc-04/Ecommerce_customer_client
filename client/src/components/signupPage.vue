<template>
 <div class="loginPage">
    <div class="loginCard">
        <div class="loginCardLeft">

        </div>
        <div class="loginCardRight">
            <div class="loginFormHead">
                <h1>Sign Up</h1>
            </div>
            <div class="loginForm">
                <form v-on:submit.prevent="signup">
                    <label for="email">Email</label>
                    <input type="email" placeholder="Insert email" name="email" id="email" style="margin: 3% 0;" v-model="payload.email">
                    <label for="password">Password</label>
                    <input type="password" placeholder="Insert password" name="password" id="password" style="margin: 3% 0;" v-model="payload.password">
                    <button type="submit" style="margin: 3% 0;" >Sign Up</button>
                    <button type="submit" style="margin: 3% 0;" id="cancel" v-on:click="cancel">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'signupPage',
  data () {
    return {
      payload: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    cancel () {
      this.$router.push('/login')
    },
    signup () {
      this.$store.dispatch('signup', this.payload)
        .then((data) => {
          console.log('masuksignup')
          localStorage.setItem('access_token', data.access_token)
          this.$toastr.s('Success!', 'Welcome to E-commerce')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response.data.errors.map(el => el.message))
          // const errors = err.response.data.errors.map(el => el.message)
          // this.$toastr.e(errors)
        })
    }
  }
}
</script>

<style>

</style>
