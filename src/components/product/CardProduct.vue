<template>
  <div class="card mx-3 col-md-3 col-10 my-5 pt-4 shadow-sm">
    <div class="d-flex sale flex-row-reverse">
      <div class="btn" @click="addCart(data.id)">Add Cart</div>
    </div>
    <img class='mx-auto img-thumbnail' :src="'http://localhost:3000/'+data.image" width="auto" height="auto" />
    <div class="card-body container-fluid mx-auto text-center">
      <h5 class="card-title ">{{data.product_name}}</h5>
      <div class="row">
        <div class="col-md-6">
          <p class="card-text">Price</p>
          <p class="card-text-price">Rp. {{data.price}}</p>
        </div>
        <div class="col-md-6">
          <p class="card-text">Stock</p>
          <p class="card-text-stock">{{data.qty}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'
const baseUrl = 'http://localhost:3000'
export default {
  props: ['data'],
  computed: {
    cartList: function () {
      return this.$store.state.cart
    },
    isLogin: function () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    addCart: function (id) {
      if (this.isLogin) {
        let productQty
        let cartId
        const productExist = this.cartList.find((item, index) => {
          if (+item.ProductId === +id) {
            productQty = item.qty
            cartId = item.id
            return true
          } else {
            return false
          }
        })
        if (productExist) {
          axios({
            method: 'PATCH',
            url: baseUrl + '/customer/cart/' + cartId,
            data: {
              qty: productQty + 1
            },
            headers: {
              access_token: localStorage.access_token
            }
          })
            .then((result) => {
              this.$store.dispatch('fetchCart')
              swal('Success')
            })
        } else {
          axios({
            method: 'POST',
            url: baseUrl + '/customer/cart',
            data: {
              ProductId: id,
              qty: 1
            },
            headers: {
              access_token: localStorage.access_token
            }
          })
            .then((result) => {
              this.$store.dispatch('fetchCart')
              swal('Success')
            })
        }
      } else {
        swal('Please Login First', {
          closeOnEsc: false,
          dangerMode: true
        })
      }
    }
  }
}
</script>

<style>
.btn{
  border-radius: 10px!important;
}

/* card */
.card{
  border: none!important;
  border-radius: 15px!important;
}

.img-thumbnail{
  border: none!important;
}

.sale .btn{
  margin: 1px!important;
  border-radius: 0;
  width: fit-content;
  background-color: #28a745;
  z-index: 1;
  color: white;
  font-size: 12px;
  font-weight: 700
}

.btn:hover{
  color: #28a745!important;
  background: white;
  border: solid 1px #28a745;
}

.card-title {
  font-size: 14px;
  font-family: sans-serif;
  font-weight: 900
}

p{
  margin-bottom: 0px!important;
}

.card-text-price{
  color: #28a745;
}

.card-text-stock{
  color: #3ba9fc;
}
</style>
