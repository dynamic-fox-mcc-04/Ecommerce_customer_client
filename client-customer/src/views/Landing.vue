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
          <h2>Your Most Trusted e-Phramacy</h2>
          <p>Please Login to Continue</p>
          <p>
            <router-link to="/register">Register</router-link>
          </p>
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
// import SignupForm from '../components/SignupForm.vue'
export default {
  name: 'Landing',
  props: [],
  components: {
    LoginForm
    // SignupForm
  },
  data () {
    return {}
  },
  methods: {},
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
