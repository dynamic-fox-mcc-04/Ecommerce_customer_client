<template>
  <div class="container">
      <h1>Thanks for your Order</h1> <br>
      <h2>Please order again next time!</h2>
  </div>
</template>

<script>
export default {
  name: 'CheckOut',
  created () {
    setTimeout(() => {
      this.$router.push('/')
    }, 5000)
  }
}
</script>

<style>

</style>
