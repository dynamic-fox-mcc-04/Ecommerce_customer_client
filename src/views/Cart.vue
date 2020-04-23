<template>
    <div class="row">
        <div class="col-xl-2"></div>
        <div id="tableProduct" class="col-xl-8">
            <h1>My Cart</h1>
            <router-link :to="{name: 'History'}"><button  class="btn btn-success histoyBtn"> Transaction History</button></router-link>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">quantity</th>
                    <th scope="col">price/item</th>
                    <th scope="col">total</th>
                    <th scope="col">Remove Item</th>
                    </tr>
                </thead>

                <tbody else v-for="(cart, i) in carts" :key="i">
                    <tr>
                        <td>{{i + 1}}</td>
                        <td>{{cart.Product.productName}}</td>
                        <td><button @click="patchPlus(cart.id)" class="qBtn btn btn-primary">+</button>  {{cart.quantity}} <button @click="patchMin(cart.id)" class="btn btn-danger qBtn">-</button></td>
                        <td>{{cart.Product.price | currency}}</td>
                        <td>{{cart.totalPrice | currency}}</td>
                        <td><a href="#" @click="deleteCart(cart.id)"><i class="fas fa-trash-alt"></i></a></td>
                    </tr>
                </tbody>
            </table>
            <div v-if="cartCon" class="card card-checkout">
                <div class="card-body body-card-checkout">
                    <p>Total Payment: {{totalPayment | currency}}</p>
                    <button class="btn btn-success" @click="checkoutCart"><i class="fas fa-wallet"></i> CHECKOUT</button>
                </div>
            </div>
        </div>
        <div class="col-xl-2"></div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import socket from '../config/socket.js'

export default {
  name: 'Cart',
  computed: {
    carts () {
      return this.$store.getters.unPaidCarts
    },
    cartCon () {
      if (this.carts.length !== 0) {
        return true
      } else {
        return false
      }
    },
    totalPayment () {
      const total = this.carts.map(el => {
        return el.totalPrice
      })
      return total.reduce(function (a, b) { return a + b }, 0)
    }
  },
  methods: {
    patchPlus (id) {
      console.log('masuk patch plus')
      const payload = {
        id,
        action: 'plus'
      }
      this.$store.dispatch('patchCart', payload)
        .then(({ data }) => {
          console.log('successfully increased more quantity', data)
          this.$store.dispatch('fetchCarts')
          this.$toasted.show('successfully increased more quantity', {
            theme: 'bubble',
            position: 'top-right',
            duration: 3000,
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err.response.data.errors[0].message)
          if (!localStorage.getItem('token')) {
            this.$router.push('/login')
          }
          err.response.data.errors.forEach(el => {
            this.$toasted.show(el.message, {
              theme: 'bubble',
              position: 'top-right',
              duration: 3000,
              type: 'error'
            })
          })
        })
    },
    patchMin (id) {
      const payload = {
        id,
        action: 'min'
      }
      this.$store.dispatch('patchCart', payload)
        .then(({ data }) => {
          console.log('quantity successfully decreased', data)
          this.$store.dispatch('fetchCarts')
          this.$toasted.show('quantity successfully decreased', {
            theme: 'bubble',
            position: 'top-right',
            duration: 3000,
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err.response.data.errors[0].message)
          if (!localStorage.getItem('token')) {
            this.$router.push('/login')
          }
          err.response.data.errors.forEach(el => {
            this.$toasted.show(el.message, {
              theme: 'bubble',
              position: 'top-right',
              duration: 3000,
              type: 'error'
            })
          })
        })
    },
    deleteCart (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteCart', id)
            .then(result => {
              console.log(result)
              this.$store.dispatch('fetchCarts')
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
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
  },
  created () {
    this.$store.dispatch('fetchCarts')
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
  }
}
</script>
<style>
  th {
      vertical-align: center;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      font-family: 'tahoma';
  }
  td {
      vertical-align: center;
      text-align: center;
      font-size: 17px;
      font-weight: bold;
      font-family: 'tahoma';
  }
  .table{
      margin-top: 20px;
      border: none;
  }
  #tableProduct {
      margin-top: 100px;
      width: 98%;
      overflow-y: hidden;
      overflow-x: hidden;
      max-height: 85vh;
  }
  h1 {
      font-family: 'Permanent Marker', cursive;
      text-align: center;
  }
  .card-checkout {
      box-shadow: none;
      border: none;
  }
  .body-card-checkout{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
  }
  .body-card-checkout p {
      font-family: tahoma;
      font-size: 20px;
      font-weight: bold;
      margin-right: 30px;
  }
  .qBtn {
      border-radius: 10px;
  }
  /* ::-webkit-scrollbar {
      width: 5px;
  }

  ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 1px;
  }

  ::-webkit-scrollbar-thumb {
      background: red;
      border-radius: 2px;
  } */
</style>
