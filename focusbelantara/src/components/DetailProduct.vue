<template>
    <div class="catalog-space">
        <h3 class="mt-2 mb-3">detail</h3>
        <div class="detail">
            <div class="detail-img" >
                <img :src="`${image_url}`" class="card-img-top pt-5" alt="products-Img">
            </div>
            <div class="detail-desc text-left">
                <h4><b>{{ name }}</b></h4>
                <h2>IDR {{ price }}</h2>
                <p>Stock: {{ stock }} </p>
                <medium>{{ category }}</medium>
                <button @click="addToCartWithBody(id)" class="my-btn my-btn-teal special mt-4" style="margin-left: 0; font-size: 1rem;">add to cart</button>
            </div>
            <div class="cart-qty">
                <form>
                <input type="number" min="1" class="qty-input" v-model="qtyInput">
                </form>
            </div>
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
      stock: '',
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
        this.stock = data.stock
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
          this.$toasted.show('You already add this item, please choose another one', {
              duration: 3000
          })
        })
    }
  }
}
</script>

<style>
.detail {
    display: flex;
    min-height: 70vh;
    background-color: rgb(255, 255, 255);
    padding: 1rem 1rem;
    box-shadow: 4px 5px 6px -2px rgba(0,0,0,0.26);
}
.my-btn {
  min-height: 50px;
}
.detail-img {
    padding-top: 50px;
    width: 25vw;
    height: 25vh;
}
.detail-img img {
  transform: scale(1.5);
}
.detail-desc {
    width: 50vw;
    margin-left: 10vw;
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