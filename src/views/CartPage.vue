<template>
  <div id="cartPage">
    <Navbar/>
    <div class="cart">
      <h1>My Shopping Cart</h1>
      <hr width="50px" color="red">
      <div>
        <div class="card mb-3" style="border: none;">
          <div class="row no-gutters">
            <div class="col-md-2 image">
              <h5 class="card-title">Image</h5>
            </div>
            <div class="col-md-10 item">
              <div class="card-deck d-flex">
                <div class="d-flex justify-content-center col-md-2 col-sm-12 col-xs-12 name" style="max-width: 200px">
                  <h5 class="card-title">Name</h5>
                </div>
                <div class="d-flex justify-content-center col-md-2 col-sm-12 col-xs-12 price">
                  <h5 class="card-text">Price</h5>
                </div>
                <div class="d-flex justify-content-center col-md-2 col-sm-12 col-xs-12 quantity">
                  <h5 class="card-text">Quantity</h5>
                </div>
                <div class="d-flex justify-content-center col-md-2 col-sm-12 col-xs-12 value">
                  <h5 class="card-text">Total</h5>
                </div>
                <div class="d-flex justify-content-center col-md-2 col-sm-12 col-xs-12 option" >
                  <h5 class="card-text">Option</h5>
                </div>
              </div>
            </div>
          </div>
          <hr>
        </div>
        <CartCard v-for="cart in carts" :key="cart.id" :cart="cart"/>
      </div>
    </div>
    <FooterPage/>
  </div>
</template>

<script>
import Navbar from '../components/NavBar'
import FooterPage from '../components/Footer'
import CartCard from '../components/CartCard'
export default {
  name: 'cartPage',
  components: {
    Navbar,
    FooterPage,
    CartCard
  },
  computed: {
    carts: function () {
      return this.$store.state.carts
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style scoped>
.cart{
  width: 100%;
  min-height: 30vh;
  margin: 30px;
}

.cart-head{
  justify-content: space-around;
  margin-top: 50px;
  border-bottom: 1px solid rgba(49, 49, 49, 0.288);
}

.cart h1{
  font-weight: 700;
  font-size: 60px;
}

.image{
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-deck{
  justify-content: space-evenly;
}
</style>
