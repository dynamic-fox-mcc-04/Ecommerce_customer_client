<template>
  <div class="pg-form-signup">
    <b-form inline class="form-signup">
      <label class="sr-only" for="inline-form-input-email">Email</label>
      <b-input
        id="inline-form-input-email"
        v-model="form.email"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="janedoe@mail.com"
      ></b-input>

      <label class="sr-only" for="inline-form-input-password">Password</label>
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-input
          id="inline-form-input-password"
          v-model="form.password"
          type="password"
          placeholder="secret"
        ></b-input>
      </b-input-group>

      <b-button variant="warning" form="form-login" @click.prevent="register">REGISTER</b-button>
    </b-form>
  </div>
</template>

<script>
// import socket from '../config/socket'
export default {
  name: 'SignupForm',
  props: [],
  components: {

  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {

    register () {
      console.log('REGISTER @ LANDINGPAGE.VUE')
      this.$store.dispatch('register', this.form)
    }

  },
  created () {
  }
}
</script>
<style scoped>
  .form-signup {
    padding: 2vh;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color:#25A026;
  }
</style>
