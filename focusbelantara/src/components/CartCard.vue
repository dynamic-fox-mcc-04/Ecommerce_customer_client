<template>
  <div class="cart-card">
    <div class="cart-img">
      <img :src="`${cart.Product.image_url}`" class="shoes-img" alt="shoes">
    </div>
    <div class="cart-desc">
      <h4>{{ cart.Product.name }}</h4>
      <p>{{ cart.Product.category }}</p>
    </div>
    <div class="cart-qty">
      <div @click="increase(cart.id)">
        <i class="fas fa-caret-square-up"></i>
      </div>
      <h2>{{ cart.product_qty }}</h2>
      <div @click="decrease(cart.id)">
        <i class="fas fa-caret-square-down"></i>
      </div>
    </div>
    <div class="cart-price">
      <h2>IDR {{ subtotal }}</h2>
    </div>
    <div class="add-btn">
      <i @click="deleteCart(cart.id)" class="fas fa-minus-circle fa-2x m-2"></i>
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
      console.log(this.cart.Product)
      console.log(this.cart.Product.price)
      return this.cart.Product.price * this.cart.product_qty
    }
  }
}
</script>

<style lang="scss">
.add-btn {
  cursor: pointer;
}
.cart-card {
  height: 10rem;
  width: 100%;
  // background-color: $primary;
  display: flex;
  margin-bottom: 1rem;
  box-shadow: 4px 5px 6px -2px rgba(0,0,0,0.26);
  p {
    margin: 0;
  }
  position: relative;
}
.cart-img {
  // @include flexCenterCol();
  width: 20%;
  background-color: rgb(255, 255, 255);
}
.cart-desc {
  // @include flexCenterCol();
  padding: 1rem 2rem;
  align-items: flex-start;
  width: 40%;
  // background-color: rgb(172, 37, 37);
  h2 {
    margin: 0;
    font-weight: 600;
    color: black;
  }
}
.cart-qty {
  // @include flexCenterCol();
  width: 10%;
  h2 {
    margin: .5rem 0;
    color: black;
  }
  // background-color: rgb(212, 29, 29);
}
.cart-price {
  // @include flexCenterCol();
  padding: 1rem .5rem;
  width: 30%;
  h2 {
    margin: .5rem 0;
    color: black;
  }
  // background-color: rgb(255, 47, 47);
}
.fa-caret-square-up {
  transition: .3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
    color: rgb(26, 231, 146);
  }
}
.fa-caret-square-down {
  transition: .3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
    color: rgb(255, 105, 5);
  }
}
.add-btn {
  img {
    width: 30px;
    height: 30px;
  }
}
</style>
