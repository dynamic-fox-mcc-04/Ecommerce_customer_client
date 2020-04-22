<template>
    <div class="catalog-space">
        <h3 class="mt-2 mb-3">detail</h3>
        <div class="detail">
            <div class="detail-img" >
                <img :src="`${product.image_url}`" class="card-img-top" alt="products-Img">
            </div>
            <div class="detail-desc">
                <h2><b>{{ product.name }}</b></h2>
                <h2>IDR {{ product.price }}</h2>
                <small>{{ product.category }}</small>
            </div>
            <div class="cart-qty">
                <form>
                <input type="number" min="1" class="qty-input" v-model="qtyInput">
                </form>
            </div>
            <button @click="addToCartWithBody(product.id)" class="my-btn my-btn-teal special" style="margin-left: 0; font-size: 1rem;">add to cart</button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'DetailProduct',
  data () {
    return {
      product: {},
      qtyInput: 1
    }
  },
  created () {
    this.$store.dispatch('fetchProductById', this.$route.params.id)
      .then(({ data }) => {
        console.log(data)
        this.product = data
      })
      .catch(err => {
          console.log(err)
        this.$toasted.show(err.response.data)
      })
  },
  methods: {
    addToCartWithBody (id) {
      this.$store.dispatch('addToCartWithBody', { id, product_qty: this.qtyInput })
        .then(({ data }) => {
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          this.$toasted.show(err.response.data)
        })
    }
  }
}
</script>

<style lang="scss">
    .detail {
        display: flex;
        background-color: rgb(255, 255, 255);
        padding: 1rem 1rem;
        box-shadow: 4px 5px 6px -2px rgba(0,0,0,0.26);
    }
    .detail-img {
        width: 30%;
    }
    .detail-desc {
        width: 70%;
        padding: 1rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: black;
    }
    .qty-input {
        border: 1px solid rgb(202, 202, 202);
        height: 50px;
        width: 50px;
        text-align: center;
    }
</style>