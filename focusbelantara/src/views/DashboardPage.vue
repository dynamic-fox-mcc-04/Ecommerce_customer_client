<template>
  <div class="row no-gutters">
    <Loader v-if="isLoading" />
    <NavbarLogin v-if="isLogin" />
    <Navbar v-else />
    <section id="head">
        <div class="container d-flex justify-content-center">
            <div class="d-flex flex-row w-100">
              <div class="col-md-5 test">
                <div id="carouselExampleControls" class="carousel slide w-100" data-ride="carousel">
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
                <div class="col-md-7 head-text text-left">
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

<style>
#head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

img.head-img {
  width: 550px;
}

img.head-img:hover {
  transform: scale(1.5);
}

button .my-btn {
  background: #75b61ac2;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 20px;
}

.my-btn:hover {
  background: #75B61A;
  color: white;
}

section#shiping {
  padding: 50px;
  background: #001524;
  color: white;
}

.box-icon {
  display: inline-block;
}

.box-title {
  display: inline-grid;
  margin-left: 20px;
}

.box-title h3 {
  font-size: 23px;
}

.box-icon i {
  color: #75B61A;
  font-size: 30px;
}

#best-selling {
  background-color: #ffffff;
}

.test {
  backdrop-filter: blur(5px);
}

.carousel {
  background-color: #f5f6f8;
}

.carousel-inner img {
  height: auto;
  width: auto;
}
</style>
