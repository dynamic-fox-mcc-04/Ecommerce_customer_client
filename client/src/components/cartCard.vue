<template>
  <div style="margin-bottom:3%;">
    <div class="card">
      <div class="card-header">
        Product : {{cartProduct.name}}
      </div>
      <div class="card-body">
        <div style="display:flex; justify-content:flex-start; align-items:center;">
          <div style="width:20%">
            <img class="card-img-left" :src="cartProduct.image_url" alt="Card image" width="60px" style="margin-right:3%">
          </div>
          <div style="width:40%">
            <h5> Quantity : {{cartProduct.quantity}}</h5>
            <h5> Total Price : {{cartProduct.total_price}}</h5>
          </div>
          <div style=" width:65%; display:flex; justify-content:flex-end;">
            <button type="button" class="btn btn-danger" style="margin-left:2%; width:20%;" v-on:click="hapusCart(cartProduct.ProductId)">Delete</button>
            <button type="button" class="btn btn-success" style="margin-left:2%; width:30%;" v-on:click="checkout(payload)">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartCard',
  props: ['cartProduct'],
  data () {
    return {
      isEdit: false,
      payload: {
        ProductId: this.cartProduct.ProductId,
        quantity: this.cartProduct.quantity
      }
    }
  },
  methods: {
    hapusCart (id) {
      this.$store.dispatch('hapusCart', id)
      this.$store.dispatch('findAllCart')
    },
    checkout (payload) {
      this.$store.dispatch('updateStock', payload)
      this.$store.dispatch('updatePaid', payload.ProductId)
      this.$router.push('/checkout')
      // this.$store.commit('SET_IS')
    }
  }
}
</script>

<style>

</style>
