<template>
  <div class="home">
    <h1>Welcome to Caddy's Shack</h1>
    <h2>Where you can buy your favourite foods here</h2>
    <img src="../assets/logo.png">
    <br>
    <br>
    <h2>How to Use</h2>
    <div id="List">
      <ul>
        <li>Login / Register</li>
        <li> Press Products</li>
        <li> input how many food you want and click add to cart</li>
        <li> Press Checkout in your Cart menu when you done</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
<style>
.home{
  width: 40vw;
  text-align: center;
  margin-left: 30vw;
  margin-top: 10vh;
}
#List{
  width: 25vw;
  text-align: left;
  margin-left: 10vw;
}

</style>
