<template>
  <div>
        <Banner class="banner"></Banner>
        <div class="content d-flex flex-column align-items-center mt-5 mb-5">
          <!-- <Support/> -->
          <hr><h1>Our Products</h1>
          <div class="filtering">
            <div class="dropdown show mb-0">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                See by category
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item text-white" @click="getByCategory()">All Products</a>
                <a class="dropdown-item text-white" @click="getByCategory('sneakers')">Sneakers</a>
                <a class="dropdown-item text-white" @click="getByCategory('brogue')">Brogue</a>
                <a class="dropdown-item text-white" @click="getByCategory('boots')">Boots</a>
                <a class="dropdown-item text-white" @click="getByCategory('trekking')">trekking</a>
              </div>
            </div>
            <form class="form-inline my-2 my-lg-0">
              <input v-model="search" class="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search">
            </form>

          </div>
          <div class="wrapper container-fluid d-flex flex-row justify-content-center">
            <router-view/>
            <Cards v-for="product in products" :key="product.id" :product="product"></Cards>
          </div>
        </div>
        <Footer/>
  </div>
</template>

<script>
import socket from '../config/socket.js'
import Banner from '../components/Banner.vue'
import Cards from '../components/Cards.vue'
import Footer from '../components/Footer.vue'
// import Support from '../components/Support.vue'

export default {
  name: 'Home',
  components: {
    Cards,
    Banner,
    Footer
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    getByCategory (category) {
      this.$store.dispatch('fetchProducts', category)
    },
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  computed: {
    products () {
      return this.$store.state.products.filter(el => {
        return el.productName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCarts')
    socket.on('pleaseFetch', () => {
      this.$store.dispatch('fetchProducts')
    })
  }
}
</script>
<style>
  .search {
    border-radius: 20px;
    border: 2px solid black
  }
  .wrapper {
    flex-wrap: wrap;
    padding: 0 200px;
  }
  .filtering {
    width: 65%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .dropdown-menu {
    width: 220px;
    background: #4b4276;
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top: 1px solid rgba(225, 225, 225, 0.05);
  }
  .dropdown-item {
    margin: 0;
    cursor: pointer;
    width: 180px;
    background: #4b4276;
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top: 1px solid rgba(225, 225, 225, 0.05);
  }
  .dropdown-item:hover {
    width: 180px;
    background: #594f8d;
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top: 1px solid rgba(225, 225, 225, 0.05);
  }
  hr {
    width: 70%;
    border-top: 2px solid red;
  }
  .content h1 {
    margin-top: 50px;
    font-family: 'Permanent Marker', cursive;
  }
</style>
