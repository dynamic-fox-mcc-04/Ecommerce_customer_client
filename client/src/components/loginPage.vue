<template>
 <div class="loginPage">
    <div class="loginCard">
        <div class="loginCardLeft">

        </div>
        <div class="loginCardRight">
            <div class="loginFormHead">
                <h1>Sign In</h1>
            </div>
            <div class="loginForm">
                <form v-on:submit.prevent="login">
                    <label for="email">Email</label>
                    <input type="email" placeholder="Insert email" name="email" id="email" style="margin: 3% 0;" v-model="payload.email">
                    <label for="password">Password</label>
                    <input type="password" placeholder="Insert password" name="password" id="password" style="margin: 3% 0;" v-model="payload.password">
                    <button type="submit" style="margin: 3% 0;" >Login</button>
                    <button type="submit" style="margin: 3% 0;" v-on:click="signup">Sign Up</button>
                    <button type="submit" style="margin: 3% 0;" id="cancel" v-on:click="cancel">Back to Home</button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'loginPage',
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
      this.$router.push('/')
    },
    signup () {
      this.$router.push('/signup')
    },
    login () {
      this.$store.dispatch('login', this.payload)
        .then((data) => {
          console.log('masuk')
          localStorage.setItem('access_token', data.access_token)
          this.$toastr.s('Login Success!', 'Happy Shopping')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response.data.errors.map(el => el.message))
          const errors = err.response.data.errors.map(el => el.message)
          this.$toastr.e(errors)
        })
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
