<template>
  <div class="checkoutPage">
    <div class="greetingCard">
      <h1> Thank you for shopping :)</h1>
      <h2>Please transfer to virtual account :</h2><br>
      <h3>xxx-xxx-xxx-xxx</h3>
      <h2>Your order will be sent after you pay</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkoutPage',
  mounted () {
    setTimeout(() => {
      this.$router.push('/cart')
    }, 5000)
  }
}
</script>

<style>

</style>
