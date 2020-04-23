<template>
  <div>
      <div class="shoppingCart-box">
        <div class="shoppingCart-card-rows" >
            <div class="shoppingCart-card" v-for="product in shoppingCartProducts" :key="product.CartId">
                <div class="shoppingCart-card-infoBar">
                    <img :src="product.Product.imageUrl" class="shoppingCart-card-img">
                    <div class="shoppingCart-card-description">
                        <h3 class="shoppingCart-card-product-name">{{ product.Product.name }}</h3>
                        <p class="shoppingCart-card-product-price-quantity"><b>Rp. {{ priceFormatter(product.Product.price) }} | Purchase quantity: {{ product.quantity }} </b></p>
                        <button @click="deleteItem(product.Product.id, product.CartId, product.Product.name, product.Product.imageUrl, product.Product.price, product.Product.stock, product.quantity)">Delete item</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="total-purchase-box">
          <h3>Purchase Total:</h3>
          <h2>Rp. {{ priceFormatter(totalPrice()) }}</h2>
          <button @click="checkout">Checkout</button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ShoppingCartCard',
  data () {
    return {
      totalPurchase: ''
    }
  },
  methods: {
    checkout () {
      axios({
        method: 'DELETE',
        url: 'http://localhost:3000/shoppingCart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.$router.push('/purchasesuccess')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteItem (ProductId, CartId, productName, productImageUrl, productPrice, productStock, ReturnedQuantity) {
      // console.log('deleteItem remarked')
      axios({
        method: 'DELETE',
        url: 'http://localhost:3000/shoppingCart/' + CartId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          // update quantity using axios
          const updatedPayload = {
            name: productName,
            imageUrl: productImageUrl,
            price: productPrice,
            stock: (productStock + ReturnedQuantity)
          }
          axios({
            method: 'PUT',
            url: 'http://localhost:3000/products/' + ProductId,
            headers: {
              access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmNoaWVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg3NDcwNjc0fQ.hdJFI_HQt1xR3Zcm4CG2NAvwpddmCpv-SOcdAZyb1EI'
            },
            data: updatedPayload
          })
            .then(result => {
              this.$store.dispatch('fetchShoppingCartProducts')
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    priceFormatter (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    totalPrice () {
      let totalPurchase = 0
      for (let i = 0; i < this.shoppingCartProducts.length; i++) {
        let itemPrice = this.shoppingCartProducts[i].Product.price
        let itemQuantity = this.shoppingCartProducts[i].quantity
        totalPurchase += (itemPrice * itemQuantity)
        itemPrice = ''
        itemQuantity = ''
      }
      this.totalPurchase = totalPurchase
      return this.totalPurchase
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    shoppingCartProducts () {
      return this.$store.state.shoppingCartProducts
    }
  }
}
</script>

<style>

.shoppingCart-box{
    display: flex;
    flex-direction: row;
}

.shoppingCart-card-rows{
    display: flex;
    flex-direction: column;
}

.shoppingCart-card{
  display:flex;
  flex-direction: column;
  border:1px;
  border-style: solid;
  border-color: #2ecc71;
  border-radius: 15px;
  height: 200px;
  width: 50vw;
  margin: 20px;
  padding: 10px;
}

.shoppingCart-card-description{
    padding: 20px;
    text-align: left;
    height: 100%
}

.shoppingCart-card-infoBar{
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 65vw;
}

.shoppingCart-card-img {
    height:100%;
    width:auto;
}

.total-purchase-box{
  display:flex;
  flex-direction: column;
  border:1px;
  border-style: solid;
  border-color: #2ecc71;
  border-radius: 15px;
  margin:20px;
  padding:10px;
  height:200px;
  width:35vw;
}

.shoppingCart-card-product-name{
    width: 60%;
}

.shoppingCart-card-product-price-quantity{
    width: 60%;
}

</style>
