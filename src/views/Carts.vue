<template>
  <div class="mt-5">
      <h1>Carts: Your Order</h1>
      <button @click="checkOut">Checkout</button>
      <table class="table table-striped table-dark">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Total Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Product Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody v-for="cart in carts" :key="cart.id">
    <tr>
      <th scope="row">{{cart.id}}</th>
      <td>{{cart.total_price}}</td>
      <td>{{cart.quantity}}</td>
      <td>{{cart.Product.name}}</td>
      <td><button @click.prevent="deleteProduct(cart.id)">Cancel</button></td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  name: 'Carts',
  methods: {
    checkOut () {
      this.$store.dispatch('checkOut')
        .then(({ data }) => {
          this.$router.push('/checkout')
          this.$store.commit('setAmout', 0)
          localStorage.removeItem('OrderId')
        })
        .catch(err => this.$alert(err))
    },
    deleteProduct (id) {
      this.$store.commit('setCartId', id)
      this.$store.dispatch('cancelCart')
        .then(() => {
          this.$router.push('/cart')
        })
        .catch(err => this.$alert(err))
    }
  },
  computed: {
    carts: {
      get () {
        return this.$store.state.carts
      }
    }
  },
  created () {
    this.$store.dispatch('getCarts')
      .then(({ data }) => {
        this.$store.commit('fillCarts', data)
        let amount = 0
        data.map(datum => {
          amount += datum.quantity
          return amount
        })
        this.$store.commit('setAmount', amount)
      })
      .catch(err => this.$alert(err))
    if (!localStorage.OrderId) {
      this.$store.dispatch('newOrder')
        .then(({ data }) => {
          localStorage.setItem('OrderId', data.id)
        })
    }
  }
}
</script>

<style>

</style>
