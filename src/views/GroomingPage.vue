<template>
  <div class="accessories">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/ga.jpg" class="d-block w-100" alt="Product" />
        </div>
      </div>
    </div>
    <!-- <Loading v-if="isLoading"/> -->
    <div class="container my-3 py-5 text-center">
      <div class="row mb-5">
        <div class="col">
          <h1>OUR GROOMING AIDS</h1>
          <hr width="50px" color="red">
        </div>
      </div>
      <div class="row">
        <Card v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
    <Footerpage/>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import Footerpage from '../components/Footer'
// import Loading from '../components/LoadingPage'

export default {
  name: 'listProduct',
  components: {
    Card,
    Footerpage
    // Loading
  },
  computed: {
    products: function () {
      return this.$store.state.products.filter(product => product.category === 'Grooming Aids')
    }
    // isLoading: function () {
    //   return this.$store.state.isLoading
    // }
  },
  created () {
    this.$store.dispatch('fetchProduct')
  }
}
</script>

<style scoped>
.row{
  justify-content: space-evenly;
}

.col h1{
  font-weight: 700;
  /* font-size: 60px; */
}

</style>
