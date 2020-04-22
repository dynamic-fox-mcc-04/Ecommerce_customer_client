<template>
  <div class="signUpPage">
      <FormSign signIn=false headline="Create Your Account"></FormSign>
  </div>
</template>

<script>
import FormSign from '../components/FormSign'
export default {
    name: 'SignUpPage',
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
.signUpPage {
  position: relative;
  top: 100px;
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>