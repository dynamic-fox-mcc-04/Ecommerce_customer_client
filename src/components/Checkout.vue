<template>
  <div class="collapse" id="collapseExample">
    <div class="card card-body">
      Please choose payment method:
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
        <label class="form-check-label" for="inlineCheckbox1">BCA Syariah</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
        <label class="form-check-label" for="inlineCheckbox1">BNI Syariah</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
        <label class="form-check-label" for="inlineCheckbox1">Mandiri Syariah</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
        <label class="form-check-label" for="inlineCheckbox1">BRI Syariah</label>
      </div>
    </div>
    <div class="card card-checkout">
      <div class="card-body body-card-checkout">
          <button class="btn btn-success" @click="checkoutCart"><i class="fas fa-wallet"></i> CHECKOUT</button>
      </div>
    </div>
  </div>
</template>
<script>
import socket from '../config/socket.js'
import Swal from 'sweetalert2'
export default {
  name: 'Checkout',
  methods: {
    checkoutCart () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, pay all!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('checkoutCart')
            .then(({ data }) => {
              socket.emit('checkout')
              console.log('successfully checkout')
              this.$store.dispatch('fetchCarts')
              this.$router.push('/history')
              this.$toasted.show('successfully checkout', {
                theme: 'bubble',
                position: 'top-right',
                duration: 3000,
                type: 'success'
              })
            })
            .catch(err => {
              console.log('err checkout', err.response.data.errors[0].message)
              this.$store.dispatch('fetchCarts')
              this.$toasted.show(err.response.data.errors[0].message, {
                theme: 'bubble',
                position: 'top-right',
                duration: 3000,
                type: 'error'
              })
            })
        }
      })
    }
  }
}
</script>
