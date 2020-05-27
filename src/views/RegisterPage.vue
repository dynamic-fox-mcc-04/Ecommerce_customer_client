<template>
  <div class="container">
  <RegisterForm/>
   <router-view/>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue'
export default {
  name: 'RegisterPage',
  components: {
    RegisterForm
  }
}
</script>

<style>

</style>
