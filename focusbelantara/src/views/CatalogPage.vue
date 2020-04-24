<template>
  <div class="col-md-12 mt-5 main">
        <Loader v-if="isLoading" />
        <NavbarLogin v-if="isLogin" />
        <Navbar v-else />
        <Slider />
        <router-view />
        <FooterProduct />
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import NavbarLogin from '../components/NavbarLogin'
import FooterProduct from '../components/FooterProduct'
import Slider from '../components/Slider'
import Loader from '../components/Loader'
export default {
  name: 'CatalogPage',
  components: {
    Navbar,
    NavbarLogin,
    FooterProduct,
    Slider,
    Loader
  },
  created () {
    this.$store.dispatch('fetchProducts')
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
.carousel {
  background-color: #ffff;
}

.main {
  background-color: #f1f1f1;
}

.card {
  cursor: pointer;
  height: 50vh;
  background-color: #ffff;
}

.card p {
  margin-top: -10px;
  margin-bottom: 1px;
}

.row .card:hover {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  transform: scale(1.02);
}

.footer-product {
  height: 250px;
  background-color: #dddddd;
  padding: 2rem 3vw;
  display: flex;
}

.supported-by {
  display: flex;
  align-items: center;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.supported-by small {
  color: #b3b3b3;
  text-align: center;
}

.cc {
  display: flex;
}
.cc i {
  margin: 0 5px;
}

.ecommerce-info {
  width: 40%;
  color: grey;
  padding: 0 2rem;
  border-left: 1px solid grey;
}

.title {
  color: #1e8080;
}
</style>