<template>
  <div class="pg-register">
    <SignupForm />
    <!-- JUMBOTRON START -->
    <div class="pg-jumbotron-reg">
      <b-jumbotron id="reg-jb">
        <div id="remark-reg">
            <h1>e-Apotheke</h1>
            <h2>Reliable, Versatile, Affordable</h2>
            <p>Register To Enjoy Our Second-to-None Quality Services</p>
            <p>
                <router-link to="/">Login</router-link>
            </p>
        </div>
      </b-jumbotron>
    </div>
    <!-- JUMBOTRON END -->
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue'
export default {
  name: 'RegisterPage',
  props: [],
  components: {
    SignupForm
  },
  data () {
    return {}
  },
  methods: {},
  created () {}
}
</script>
<style scoped>
    #reg-jb {
        opacity: 0.7;
        background-image: url('https://ichef.bbci.co.uk/news/410/cpsprodpb/120D/production/_103912640_pharmacygettyimages-525984851.jpg');
        background-repeat: no-repeat;
        background-size: cover;
    }
    #remark-reg {
        background-color: blanchedalmond;
        border-radius: 25px;
        color: olivedrab;
        opacity: 0.8;
        width: 60%;
        margin-left: 20%;
    }
</style>
