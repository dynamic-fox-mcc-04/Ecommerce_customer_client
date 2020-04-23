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

<style>
.align {
  background-image: url(../assets/img/logo-bg.jpg);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(5px);
}
.grid {
  max-width: 100vw;
  max-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  max-width: 20rem;
  width: 90%;
}
.hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.icons {
  display: none;
}
.icon {
  display: inline-block;
  fill: #606468;
  font-size: 1rem;
  height: 1em;
  vertical-align: middle;
  width: 1em;
}
.icons {
  display: none;
}
.icon {
  display: inline-block;
  fill: #606468;
  font-size: 1rem;
  height: 1em;
  vertical-align: middle;
  width: 1em;
}
* {
  box-sizing: inherit;
}
#align {
  background-color: #2c3338;
  color: #606468;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  height: 100%;
  line-height: 1.5;
  margin: 0;
  min-height: 100vh;
}
a {
  color: #000000;
  outline: 0;
  text-decoration: none;
}
a:focus,
a:hover {
  text-decoration: underline;
}
input {
  background-image: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  transition: #2c3338 0.3s;
}
input[type='submit'], .btn-back {
  cursor: pointer;
}
.form {
  margin: calc(0.875rem * -1);
}
.form input[type='password'],
.form input[type='text'],
.form input[type='email'] {
  width: 100%;
  height: 56px;
}
.form input[type='submit'], .btn-back {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.form__field {
  display: flex;
  margin: 0.875rem;
}
.form__input {
  flex: 1;
}
.btn-back {
    background-color: rgb(156, 156, 126) !important;
}
.login {
  color: #eee;
}
.login label,
.login input[type='email'],
.login input[type='text'],
.login input[type='password'] {
  border-radius: 0.25rem;
  padding: 1rem;
}
.login input[type='submit'], .btn-back {
  border-radius: 0.25rem;
  width: 23vh;
  padding: 10px;
}
.login label {
  background-color: #3b4148;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.login input[type='password'],
.login input[type='text'],
.login input[type='email'] {
  background-color: #3b4148;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.login input[type='password']:focus,
.login input[type='password']:hover,
.login input[type='text']:focus,
.login input[type='text']:hover,
.login input[type='email']:focus,
.login input[type='email']:hover {
  background-color: #434a52;
}
.login input[type='submit'] {
  background-color: #434a52;
  color: 700;
  text-transform: uppercase;
}
.login .btn-back {
    background-color: #fd0000;
    color: #eee;
    font-weight: 700;
    text-transform: uppercase; 
}
.login input[type='submit']:focus,
.login input[type='submit']:hover {
  background-color: #d44179;
}
.btn-back:focus,
.btn-back:hover {
  background-color: #d44179;
}
p {
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
}
.text--center {
  text-align: center;
  color: #000000;
  box-shadow: #2c3338;
}
.form-submit .btn-back:hover,
.form-submit .btn-back:focus {
  background-color: #fd0000 !important;
}
</style>