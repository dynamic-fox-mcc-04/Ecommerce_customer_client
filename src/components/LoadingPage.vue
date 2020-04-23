<template>
  <div id="loading-page">
    <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_StfcYQ.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style scoped>
#loading-page{
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
