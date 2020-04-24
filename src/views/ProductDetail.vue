<template>
  <div>
    <div v-if="successMessage" class="successfulMesssage-box">{{successMessage}}</div>
    <div class='product-box-section'>
      <img :src="product.imageUrl" class="product-box-img">
      <div class='product-box-description'>
        <h3>{{product.name}}</h3>
        <h4>Price: Rp.{{priceFormatter(product.price)}}</h4>
        <h4>Available stock: {{product.stock}}</h4>
        <label for="quantity">Purchase quantity:</label><br><br>
        <input type="number" value="1" id="quantity" name="quantity" min="1" max="15" v-model="purchaseQuantity">
        <input type="submit" @click="addToShoppingCart" value="Add to Cart">
        <button @click="goToProducts">Back to products</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductDetail',
  data () {
    return {
      product: '',
      purchaseQuantity: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    addToShoppingCart () {
      const payload = {
        ProductId: this.product.id,
        quantity: this.purchaseQuantity
      }
      // console.log(payload)
      axios({
        method: 'POST',
        url: 'https://sheltered-mountain-85329.herokuapp.com/shoppingCart',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(result => {
          this.successMessage = result.data.message
          const selectedId = this.product.id
          const updatedPayload = {
            name: this.product.name,
            imageUrl: this.product.imageUrl,
            price: this.product.price,
            stock: (this.product.stock - this.purchaseQuantity)
          }
          axios({
            method: 'PUT',
            url: 'https://sheltered-mountain-85329.herokuapp.com/products/' + selectedId,
            headers: {
              access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmNoaWVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg3NDcwNjc0fQ.hdJFI_HQt1xR3Zcm4CG2NAvwpddmCpv-SOcdAZyb1EI'
            },
            data: updatedPayload
          })
            .then(result => {
              this.product = result.data.updatedProduct[1][0]
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    goToProducts () {
      this.$router.push('/dashboard')
    },
    priceFormatter (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push('/')
    } else {
      // nanti pindahin proses axios ke store
      this.$store.commit('set_isLoggedIn', true)
      const id = this.$route.params.id
      axios({
        method: 'GET',
        url: 'https://sheltered-mountain-85329.herokuapp.com/products/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          const selectedProduct = result.data.Product
          this.product = selectedProduct
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.successfulMesssage-box{
  margin:10px;
  border:1px;
  border-style: solid;
  border-radius: 5px;
  border-color: #2ecc71;
}

.product-box-section{
  border:1px;
  border-style: solid;
  border-radius: 5px;
  border-color: #2ecc71;
  padding:10px;
  display:flex;
  flex-direction: row;
  height: 75vh;
}

.product-box-img{
  max-height: 100%;
  max-width: 100%;
}

.product-box-description{
  padding:10px;
  text-align: left;
}
</style>
