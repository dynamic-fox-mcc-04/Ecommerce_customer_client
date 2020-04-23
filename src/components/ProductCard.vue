<template>
  <div>
      <div class="product-cards-rows">
        <div class="all-product-cards" v-for="product in allProducts" :key="product.id">
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id }}" class="product-card">
                <img :src="product.imageUrl" class="product-card-img">
                <div class="product-card-description">
                  <h4 id="product-card-name">{{product.name}}</h4>
                  <p id="product-card-price"><b>Rp. {{priceFormatter(product.price)}}</b></p>
                </div>
            </router-link>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'ProductCard',
  methods: {
    seeProductPage (productId) {
      this.$router.push('/')
    },
    priceFormatter (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    allProducts () {
      return this.$store.state.allProducts
    }
  }
}
</script>

<style>

.product-cards-rows{
    display:flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    text-decoration:none;
}
.product-card{
  border:1px;
  border-style: solid;
  border-radius: 5px;
  border-color: #2ecc71;
  background-color:#ecf0f1;
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 25vw;
  height: auto;
  margin: 20px;
  padding: 10px;
  text-decoration:none;
}

.product-card-description{
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  text-decoration:none
}

.product-card-img {
  width: 100%;
  height:auto
}

#product-card-name{
  margin: 10px 0px;
}

#product-card-price{
  color:#27ae60;
  margin: 10px 0px;
}

</style>
