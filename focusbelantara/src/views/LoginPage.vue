<template>
  <div class="align">
  <Loader v-if="isLoading" />
  <div class="grid">
    <div class="mb-5">
        <h2>Login Form</h2>
    </div>
    <form @submit.prevent="Login" class="form login">
      <div class="form__field">
        <label for="login__email"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use></svg><span class="hidden">Email</span></label>
        <input id="login__email" v-model="email" type="email" class="form__input" placeholder="Email" required>
      </div>
      <div class="form__field">
        <label for="login__password"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use></svg><span class="hidden">Password</span></label>
        <input id="login__password" v-model="password"  type="password" class="form__input" placeholder="Password" required>
      </div>
      <div class="form__field form-submit">
          <div class="d-flex w-100 mr-1">
            <input type="submit" value="Login">
          </div>
          <div class="d-flex w-100 ml-1">
            <a @click="redireBack" class="btn-back"><span class="sr-only">(current)</span>Back</a>
          </div>
      </div>
    </form>
    <p class="text--center pt-3">Not a member?<router-link to="/register"> Register now</router-link><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icons.svg#arrow-right"></use></svg></p>
    <svg xmlns="http://www.w3.org/2000/svg" class="icons"><symbol id="arrow-right" viewBox="0 0 1792 1792"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"/></symbol><symbol id="lock" viewBox="0 0 1792 1792"><path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z"/></symbol><symbol id="user" viewBox="0 0 1792 1792"><path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z"/></symbol></svg>
   </div>
  </div>
</template>

<script>
import Loader from '../components/Loader'
export default {
  name: 'LoginPage',
  components: {
    Loader
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    Login: function () {
      this.$store.commit('SET_ISLOADING', true)
      this.$store.dispatch('Login', { email: this.email, password: this.password })
        .then(({ data }) => {
          console.log(data.token)
          console.log(data.currentUser)
            this.$toasted.show(`Welcome to our website ${data.currentUser}, happy shoping!`, {
            duration: 4000
          })
            localStorage.setItem('token', data.token)
            localStorage.setItem('isLogin', true)
            this.$router.push('/catalog')
        })
        .catch(err => {
          console.log('error ya')
            this.$toasted.show(err.response.data, 'Login Error')
        })
        .finally(_ => {
            this.$store.commit('SET_ISLOADING', false)
        })
    },
    redireBack: function () {
        this.$router.push('/')
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
  margin-left: 50px;
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
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  height: 100%;
  line-height: 1.5;
  margin: 0;
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

input[type=submit], .btn-back {
  cursor: pointer;
}

.form {
  margin: calc(0.875rem * -1);
}

.form input[type=password],
.form input[type=text],
.form input[type=email] {
  padding: 10px;
}

.form input[type=submit], .btn-back {
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
  background-color: #9c9c7e !important;
}

.login {
  color: #eee;
}

.login label,
.login input[type=email],
.login input[type=text],
.login input[type=password] {
  border-radius: 0.25rem;
}

.login input[type=submit], .btn-back {
  border-radius: 0.25rem;
  padding: 10px;
}

.login label {
  background-color: #3b4148;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.login input[type=password],
.login input[type=text],
.login input[type=email] {
  background-color: #3b4148;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.login input[type=password]:focus,
.login input[type=password]:hover,
.login input[type=text]:focus,
.login input[type=text]:hover,
.login input[type=email]:focus,
.login input[type=email]:hover {
  background-color: #434a52;
}

.login input[type=submit] {
  background-color: #108d7c;
  color: #eee;
  text-transform: uppercase;
}

.login .btn-back {
  background-color: #fd0000;
  color: #eee;
  font-weight: 700;
  text-transform: uppercase;
}

.login input[type=submit]:focus,
.login input[type=submit]:hover {
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
