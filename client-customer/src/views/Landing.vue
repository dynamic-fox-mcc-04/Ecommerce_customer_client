<template>
  <div class="pg-landing">

    <!-- FORM LOGIN START -->
    <LoginForm/>
    <!-- FORM LOGIN END -->

    <!-- JUMBOTRON START -->
    <div class="pg-jumbotron">
      <b-jumbotron header="e-Apotheke" lead="Your Most Trusted e-Phramacy">
        <p>Please Login to Continue</p>
      </b-jumbotron>
    </div>
    <!-- JUMBOTRON END -->

    <!-- FORM SIGNUP START -->
    <SignupForm/>
    <!-- FORM SIGNUP END -->

  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'
export default {
  name: 'Landing',
  props: [],
  components: {
    LoginForm,
    SignupForm
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
<style scoped>
  #pg-landing {
    margin: auto;
  }
</style>
