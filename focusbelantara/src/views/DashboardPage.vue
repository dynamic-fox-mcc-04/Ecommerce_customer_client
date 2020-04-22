<template>
  <div class="row no-gutters">
    <Loader v-if="isLoading" />
    <NavbarLogin v-if="isLogin" />
    <Navbar v-else />
    <section id="head">
        <div class="container d-flex justify-content-center">
            <div class="row">
              <div class="col-md-6 test">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                  <div class="carousel-item active">
                      <img src="../assets/img/jumbotron.png" class="d-block w-100 head-img" alt="slide1">
                  </div>
                  <div class="carousel-item">
                      <img src="../assets/img/jumbotron2.png" class="d-block w-100 head-img" alt="slide2">
                  </div>
                  <div class="carousel-item">
                      <img src="../assets/img/jumbotron3.png" class="d-block w-100 head-img" alt="slide3">
                  </div>
                  </div>
                  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                  </a>
              </div>
              </div>
                <div class="col-md-6 head-text text-left">
                    <h6 class="mt-5">BEST QUALITY PRODUCTS</h6>
                    <h1>Life Your Memories on !</h1>
                    <p>Pick your precious moments with our best quality product, if any questions about stock and spesifications product, feel free to ask to my admin by clicking messages button, and check our upcomming products bellow </p>
                    <button @click="redirProduct" class="my-btn btn"><i class="fas fa-cart-arrow-down"></i> Shop Now</button>
                </div>
            </div>
        </div>
      <router-view />
    </section>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
export default {
  name: 'DashboardPage',
  components: {
    Navbar,
    NavbarLogin,
    Footer,
    Loader
  },
  data () {
    return {
    }
  },
  methods: {
    redirProduct () {
      this.$router.push('/catalog')
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    isLogin () {
      return localStorage.token
      return this.$store.state.isLogin
    }
  }
}
</script>

<style lang="scss">
@import url(../assets/css/style.css);
</style>
