<template>
  <div class="fruitPage d-flex align-items-start justify-content-center">
      <ContainerBig></ContainerBig>
  </div>
</template>

<script>
import ContainerBig from '../components/ContainerProductBig'
export default {
    name: 'FruitPage',
    components: {
        ContainerBig
    }
}
</script>

<style>
.fruitPage {
    width: 100vw;
    position: relative;
    top: 200px;
}
</style>