<template>
  <div class="align">
  <Loader v-if="isLoading" />
  <div class="grid">
    <div class="mb-5">
        <h2>Register Form</h2>
    </div>
    <form @submit.prevent="Register" class="form login">
      <div class="form__field">
        <label for="login__email"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use></svg><span class="hidden">Email</span></label>
        <input id="login__email" v-model="username" type="text" class="form__input" placeholder="Username" required>
      </div>
      <div class="form__field">
        <label for="login__email"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use></svg><span class="hidden">Email</span></label>
        <input id="login__email" v-model="email" type="email" class="form__input" placeholder="Email" required>
      </div>
      <div class="form__field">
        <label for="login__password"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use></svg><span class="hidden">Password</span></label>
        <input id="login__password" v-model="password" type="password" class="form__input" placeholder="Password" required>
      </div>
      <div class="form__field form-submit">
          <div class="m-1">
            <input type="submit" value="Register">
          </div>
          <div class="m-1">
            <a @click="redireBackLogin" class="btn-back"><span class="sr-only">(current)</span>Back</a>
          </div>
      </div>
    </form>
   </div>
  </div>
</template>

<script>
import Loader from '../components/Loader'
export default {
  name: 'RegisterPage',
  components: {
    Loader
  },
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    Register: function () {
      this.$store.commit('SET_ISLOADING', true)
      this.$store.dispatch('Register', { username: this.username, email: this.email, password: this.password })
        .then(({ data }) => {
          console.log('masuk sini ga', data)
            this.$toasted.show(`Welcome ${data.username}, happy shoping! please login first`, {
              duration: 3000
            })
            this.$router.push('/login')
        })
        .catch(err => {
          err.response.data.message.map(el => {
            this.$toasted.show(el, {
              duration: 3000
            })
          })
        })
        .finally(_ => {
            this.$store.commit('SET_ISLOADING', false)
        })
    },
    redireBackLogin: function () {
        this.$router.push('/login')
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="postcss">
@use postcss-cssnext;
@import url(../assets/css/style-login.css);
</style>