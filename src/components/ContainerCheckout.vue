<template>
<div>
  <div class="containerCheckout d-flex flex-row align-items-start">
      <h2 v-if="checkOutStatus">Go shop now!</h2>
      <table id="table-checkOut" class="table-light" v-if="!checkOutStatus">
           <thead>
                <tr>
                    <td>name</td>
                    <td>price</td>
                    <td>quantity</td>
                    <td>total</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="checkout in checkOutProduct" :key="checkout.id" :image="checkout.image">
                    <td>{{checkout.name}}</td>
                    <td>{{checkout.price}}</td>
                    <td>{{checkout.quantity}}</td>
                    <td>{{checkout.total}}</td>
                </tr>
            </tbody>
      </table>
  </div>
   <div v-if="!checkOutStatus" class="m-1">
    <button @click.prevent="payCart" class="btn btn-outline-success">Pay</button>
    <button @click.prevent="cancel" class="btn btn-outline-success">Cancel</button>
   </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ContainerCheckout',
  methods: {
    ...mapMutations(['SET_CHECKOUT']),
    cancel () {
      this.SET_CHECKOUT(true)
      this.$router.push('/')
    },
    payCart () {
      this.checkOutProduct.forEach(el => {
        const payload = {
          productId: el.id,
          qty: el.quantity,
          total: el.total,
          status: 'Paid'
        }
        console.log(payload)
        this.$store.dispatch('pay', payload)
      })
    }
  },
  computed: {
    checkOutStatus () {
      if (this.$store.state.checkOut[0]) {
        return false
      } else {
        return true
      }
    },
    checkOutProduct () {
      return this.$store.state.checkOut
    }
  }
}
</script>

<style>
#img-cart {
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}
.containerCheckout {
    font-family: 'Baloo Paaji 2', cursive ! important;
    border: solid #CFC08A 2px;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    width: 80vw;
    height: 20vh;
    border: solid #CFC08A 2px;
    overflow: scroll;
}
#table-checkOut {
    width: 80%;
}
</style>
