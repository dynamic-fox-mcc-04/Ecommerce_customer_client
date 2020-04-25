<template>
<div class="loading">
  <lottie-player
  src="https://assets7.lottiefiles.com/datafiles/pAgGyqHIpiYx9sPXUM2sQhpbSOYbrQ9IFanbS4O0/LineProgressLoading.json"
  background="transparent"
  speed="1"
  width="100px"
  height="100px"
  loop
  autoplay
  ></lottie-player>
</div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style>
.loading {
  background-color: rgba(0, 0, 0, .5);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
</style>
