<template>
  <section id="Best-selling" class="d-flex justify-content-center w-100 p-3">
    <Loader v-if="isLoading"/>
    <div class="container">
      <div class="row pt-4 pb-4">
        <div class="col-md-12">
            <div class="title">
                <h3>Best Selling Products</h3>
            </div>
        </div>
      </div>
    <div class="row mx-auto d-flex justify-content-center crusor-pointer pb-4">
    <CardProduct v-for="product in products" :key="product.id" :product="product"/>
    </div>
    </div>
  </section>
</template>

<script>
import CardProduct from '../components/CardProduct'
import Loader from '../components/Loader.vue'
export default {
  name: 'Products',
  components: {
    CardProduct,
    Loader
  },
  computed: {
    products: function () {
      return this.$store.state.products
    },
    isLoading: function () {
      return this.$store.state.isLoading
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

.title {
  color: #1e8080;
}
</style>
