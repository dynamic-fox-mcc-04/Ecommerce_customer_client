<template>
  <div class="loginPage">
      <FormSign signIn=true headline="Sign In Here"></FormSign>
  </div>
</template>

<script>
import FormSign from '../components/FormSign'
export default {
  name: 'LoginPage',
  components: {
    FormSign
  },
  created () {
    if (localStorage.access_token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.loginPage {
  position: relative;
  top: 100px;
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
