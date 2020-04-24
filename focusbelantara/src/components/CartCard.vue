<template>
  <div class="cart-card">
    <div class="cart-img pt-4">
      <img :src="`${cart.Product.image_url}`" width="200px" height="100px" alt="camera">
    </div>
    <div class="cart-desc pt-3">
      <h4>{{ cart.Product.name }}</h4>
      <p>{{ cart.Product.category }}</p>
      <p>Stock: {{ cart.Product.stock }}</p>
    </div>
    <div class="cart-qty pt-4">
      <div @click="increase(cart.CartId)">
        <i class="fas fa-caret-square-up"></i>
      </div>
      <h2>{{ cart.product_qty }}</h2>
      <div @click="decrease(cart.CartId)">
        <i class="fas fa-caret-square-down"></i>
      </div>
    </div>
    <div class="cart-price">
      <h2>IDR {{ subtotal }}</h2>
    </div>
    <div class="add-btn">
      <i @click="deleteCart(cart.CartId)" class="fas fa-minus-circle fa-2x m-2"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cart'],
  methods: {
    increase (id) {
      this.$store.commit('SET_ISLOADING', true)
      this.$store.dispatch('increase', id)
        .then(({ data }) => {
          console.log('masuk cartcard increase',data)
          this.$router.push('/cart')
          this.$store.dispatch('fetchCarts')
          this.$store.commit('ADD_TOTAL', this.subtotal)
        })
        .catch(err => {
          console.log(err)
          this.$toasted.show(err, {
            duration: 2000
          })
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    },
    decrease (id) {
      console.log(id)
      this.$store.commit('SET_ISLOADING', true)
      this.$store.dispatch('decrease', id)
        .then(({ data }) => {
          this.$router.push('/cart')
          this.$store.dispatch('fetchCarts')
          this.$store.commit('SUBSTRACT_TOTAL', this.subtotal)
        })
        .catch(err => {
          this.$toasted.show(err, {
            duration: 2000
          })
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    },
    deleteCart (id) {
      console.log('hapus id')
      this.$toasted.show(`Are you sure you want to remove ${this.cart.Product.name} from your cart?`, {
        action: [
          {
            text: 'Yes',
            onClick: (e, toastObject) => {
              this.$store.commit('SET_ISLOADING', true)
              this.$store.dispatch('deleteCart', id)
                .then(({ data }) => {
                  this.$router.push('/cart')
                  this.$store.dispatch('fetchCarts')
                  this.$store.commit('SUBSTRACT_TOTAL', this.subtotal)
                  toastObject.goAway(0)
                })
                .catch(err => {
                  this.$toasted.show(err, {
                    duration: 2000
                  })
                })
                .finally(_ => {
                  this.$store.commit('SET_ISLOADING', false)
                })
            }
          },
          {
            text: 'No',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        ]
      })
    }
  },
  computed: {
    subtotal () {
      return this.cart.Product.price * this.cart.product_qty
    }
  }
}
</script>

<style>
.add-btn {
  cursor: pointer;
}

.cart-card {
  height: 10rem;
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  box-shadow: 4px 5px 6px -2px rgba(0, 0, 0, 0.26);
  position: relative;
}
.cart-card p {
  margin: 0;
}

.cart-card .cart-img {
  width: 20%;
  padding-top: 10px;
  background-color: white;
}

.cart-desc {
  padding-right: 2rem;
  align-items: flex-start;
  width: 40%;
}
.cart-desc h2 {
  margin: 0;
  font-weight: 600;
  color: black;
}

.cart-qty {
  width: 10%;
}
.cart-qty h2 {
  margin: 0.5rem 0;
  color: black;
}

.cart-price {
  margin-top: 30px;
  padding: 1rem 0.5rem;
  width: 30%;
}
.cart-price h2 {
  margin: 0.5rem 0;
  color: black;
}

.fa-caret-square-up {
  transition: 0.3s;
  cursor: pointer;
}
.fa-caret-square-up:hover {
  transform: scale(1.25);
  color: #1ae792;
}

.fa-caret-square-down {
  transition: 0.3s;
  cursor: pointer;
}
.fa-caret-square-down:hover {
  transform: scale(1.25);
  color: #ff6905;
}

.add-btn img {
  width: 30px;
  height: 30px;
}
</style>
