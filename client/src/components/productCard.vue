<template>
<div class="card" style="width:300px; height:500px;" id="productCard">
  <div class="card-body">
    <h4 class="card-title text-center">{{product.name}}</h4>
  <img class="card-img-top" :src="product.image_url" alt="Card image">
    <p class="card-text">Price :</p>
    <p class="card-text">{{product.price}}</p>
    <p class="card-text">Stock :</p>
    <p class="card-text">{{product.stock}}</p>
    <form v-on:submit.prevent="createProduct">
    <input type="number" id="quantity" name="quantity" min="1" :max="product.stock" style="width:40%" v-model="payload.quantity" required> <button type="submit" class="btn btn-primary">Add to Cart</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'productCard',
  props: ['product'],
  data () {
    return {
      payload: {
        name: this.product.name,
        image_url: this.product.image_url,
        ProductId: this.product.id,
        quantity: '',
        price: this.product.price
      }
    }
  },
  methods: {
    createProduct () {
      if (!localStorage.access_token) {
        this.$router.push('/login')
        this.$toastr.e('Please Login First!')
      } else {
        console.log('masuk createproduct')
        console.log(this.payload)
        this.$store.dispatch('createProduct', this.payload)
        this.quantity = ''
      }
    }
  }
}
</script>

<style>

</style>
