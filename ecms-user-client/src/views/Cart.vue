<template>
  <div>
      <h1>Your Shopping Cart</h1><br><br>
      <b-button class="button" id="CheckoutButton" @click.prevent="Checkout" variant="primary">Checkout</b-button>
      <br>
      <br>
      <table id="CartTable">
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th colspan="2">Options</th>
        </tr>
        <tr v-for="Cart in Carts" :key="Cart.id">
            <!-- di for untuk dalem nya table  -->
          <td>{{Cart.Product.Name}}</td>
          <td>{{Cart.Quantity}}</td>
          <td>{{Cart.Product.Price}}</td>
          <td><b-button class="button"  variant="success" router-link :to="'/products/'+ Cart.id">Update</b-button></td>
          <td><b-button class="button"  variant="danger" @click.prevent="DeleteCart(Cart.id)">Delete</b-button></td>
        </tr>
      </table>
  </div>
</template>

<script>
import io from '../components/socket'
export default {
  name: 'Cart',
  computed: {
    Carts () {
      return this.$store.state.Cart
    }
  },
  created () {
    this.$store.dispatch('FetchCart')
      .then(result => {
        this.$store.commit('SET_CART', result.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    DeleteCart (value) {
      this.$store.dispatch('DeleteCart', value)
        .then(result => {
          return this.$store.dispatch('FetchCart')
        })
        .then(result => {
          this.$store.commit('SET_CART', result.data)
          this.$toasted.success('Delete Cart Success!!')
        })
        .catch(err => {
          console.log(err)
          this.$toasted.error('Delete Cart Failed!!')
        })
    },
    Checkout () {
      this.$Progress.start()
      this.$store.dispatch('Checkout')
        .then(result => {
          this.$Progress.finish()
          this.$toasted.success('Checkout Success!!')
          return this.$store.dispatch('FetchOrder')
        })
        .then(result => {
          this.$store.commit('SET_ORDER', result.data)
          this.$router.push('/products/history')
          io.emit('checkoutdone')
        })
        .catch(err => {
          console.log(err)
          this.$Progress.finish()
          this.$toasted.error('Checkout Failed!!')
        })
    }
  }

}
</script>

<style>
#CartTable {
  margin-left: 20%;
  margin-right: 20%;
  width: 60vw;
  padding: 10px;
  justify-content: center;
  text-align: center;
  justify-content: center;
  border-style: double;
  border-width: 10px;
  color: red;
  border-color: gray;
}
tr {
  margin: 5px;
  border-style: double;
  border-width: 10px;
  border-color: gray;
}
th {
  margin: 5px;
  border-style: double;
  border-width: 10px;
  border-color: gray;
}
td {
  margin: 5px;
  border-style: double;
  border-width: 10px;
  border-color: gray;
}
</style>
