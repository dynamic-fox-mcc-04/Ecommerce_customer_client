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
      let totalPrice = 0
      this.checkOutProduct.forEach(el => {
        totalPrice += el.total
      })
      this.$swal.fire({
        title: 'Do you want to proceed this checkout?',
        text: `Total price: Rp ${totalPrice},-`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, pay it!'
      }).then((result) => {
        if (result.value) {
          this.$swal.fire(
            'Success!',
            'Your order has been proceeded.',
            'success'
          )
          this.checkOutProduct.forEach(el => {
            const payload = {
              productId: el.id,
              qty: el.quantity,
              total: el.total,
              status: 'Paid'
            }
            const payloadUpdate = {
              id: el.id,
              name: el.name,
              image_url: el.image,
              price: el.price,
              stock: el.stock - el.quantity,
              category: el.category
            }
            this.$store.dispatch('pay', {payload, payloadUpdate})
          })
        }
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
    -webkit-box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
-moz-box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
}
#table-checkOut {
    width: 80%;
}
</style>
