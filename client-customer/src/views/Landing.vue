<template>
  <div class="pg-landing">
    <!-- FORM LOGIN START -->
    <LoginForm />
    <!-- FORM LOGIN END -->

    <!-- JUMBOTRON START -->
    <div class="pg-jumbotron">
      <b-jumbotron id="jb-login">
        <div id="remark-login">
          <h1>e-Apotheke</h1>
          <h2>Your Most Trusted e-Pharmacy</h2>
          <p>Please Login to Continue</p>
          <p>
            <router-link to="/register">Register</router-link>
          </p>
          <!-- GOOGLE LOGIN -->
          <g-signin-button
            id="btn-google"
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >Sign in with Google</g-signin-button>
          <!-- END GOOGLE LOGIN -->
        </div>
      </b-jumbotron>
    </div>
    <!-- JUMBOTRON END -->
    <!-- <SignupForm/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '../components/LoginForm.vue'
import socket from '../config/socket'
// import SignupForm from '../components/SignupForm.vue'
export default {
  name: 'Landing',
  props: [],
  components: {
    LoginForm
    // SignupForm
  },
  data () {
    return {
      googleSignInParams: {
        client_id:
          '42279192058-c1sjjp36e7p96vd42ib8hhqkitvorvnj.apps.googleusercontent.com'
      }
    }
  },
  methods: {

    onSignInSuccess (googleUser) {
      // const idToken = googleUser.getAuthResponse().id_token
      console.log('THIS IS GET AUTH RESPONSE 1 FROM GOOGLE')
      console.log(googleUser.getAuthResponse())
      // console.log(googleUser)
      const idToken = googleUser.getAuthResponse().id_token
      console.log('THIS IS ID_TOKEN: ', idToken)

      this.$store.dispatch('googleLogin', idToken)
        .then(response => {
          console.log('SUCCESS LOGIN FROM GOOGLE')
          console.log(response)
          localStorage.setItem('access_token', response.data.access_token)
          this.token = response.data.access_token
          this.$toasted.success(`Welcome Back, ${response.data.email}`)
          // SOCKET
          socket.emit('loggedin', response)

          socket.on('loggedin2', response => {
            const wlcm = 'HELLO AGAIN, ' + response
            this.$toasted.success(wlcm)
            console.log(wlcm)
            // this.fetchProjects();
          })

          this.$router.push({ path: '/home' })
        })
        .catch(err => {
          // console.log(err.response)
          console.log(err)
          // const arr = err.response.data.errors
          // const code = err.response.status
          // const type = err.response.statusText
          // const ct = code + ' ' + type
          // arr.forEach(el => {
          //   this.$toasted.error(`${ct}: ${el}`)
          // })
        })
    },

    onSignInError (error) {
      // console.log("OH NOPE!", error);
      this.$toasted.error(error)
    }
  },
  created () {}
}
</script>
<style scoped>
#pg-landing {
  margin: auto;
}
#jb-login {
  background-image: url("https://akcdn.detik.net.id/community/media/visual/2020/03/11/b0c95522-a5b9-4e9b-ae42-ab79125e0fbf_169.jpeg?w=600&q=90");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.7;
}
#remark-login {
  background-color: blanchedalmond;
  border-radius: 25px;
  color: brown;
  opacity: 0.8;
  width: 60%;
  margin-left: 20%;
}
</style>
