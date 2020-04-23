<template>
    <div class="catalog-space">
        <h3 class="mt-2 mb-3">detail</h3>
        <div class="detail">
            <div class="detail-img" >
                <img :src="`${image_url}`" class="card-img-top" alt="products-Img">
            </div>
            <div class="detail-desc">
                <h4><b>{{ name }}</b></h4>
                <h2>IDR {{ price }}</h2>
                <medium>{{ category }}</medium>
            </div>
            <div class="cart-qty">
                <form>
                <input type="number" min="1" class="qty-input" v-model="qtyInput">
                </form>
            </div>
            <button @click="addToCartWithBody(id)" class="my-btn my-btn-teal special" style="margin-left: 0; font-size: 1rem;">add to cart</button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'DetailProduct',
  data () {
    return {
      id: '',
      name: '',
      price: '',
      category: '',
      image_url: '',
      qtyInput: 1
    }
  },
  created () {
    this.$store.dispatch('fetchProductById', this.$route.params.id)
      .then(({ data }) => {
        console.log(this.$route.params.id)
        console.log('------------')
        console.log(data)
        console.log('------------')
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.category = data.category
        this.image_url = data.image_url
      })
      .catch(err => {
        this.$toasted.show(err.response.data)
      })
  },
  methods: {
    addToCartWithBody (id) {
      this.$store.dispatch('addToCartWithBody', { id, product_qty: this.qtyInput })
        .then(({ data }) => {
          this.$router.push('/cart')
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
            console.log(err)
          this.$toasted.show(err, {
              duration: 3000
          })
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