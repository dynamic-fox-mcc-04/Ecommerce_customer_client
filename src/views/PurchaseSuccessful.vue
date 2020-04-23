<template>
  <div>
      <div class="success-box">
        <h1>Thank you for your purchase!</h1>
        <p>A complete payment detail and guide has been sent to your email.</p>
        <p>Click <a href="#" @click="backToProducts">here</a> to continue shopping</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseSuccessfulPage',
  methods: {
    backToProducts () {
      this.$router.push('/dashboard')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
