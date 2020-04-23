<template>
  <div class="card card-product d-flex align-items-center" style="width: 16rem;">
    <div id="img" :style="urlData">
      <div style="width:100px; background-color: #CFC08A; color: white;">
        <p v-if="stock > 0">Stock {{stock}}</p>
        <p v-if="stock <= 0">Out of Stock</p>
      </div>
    </div>
    <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title">{{name}}</h5>
        <p class="card-text">Rp. {{price}},- /Kg</p>
        <div class="d-flex justify-content-between">
          <button @click.prevent="add" class="btn btn-outline-success d-flex align-items-center justify-content-center" v-if="stock > 0">Add Cart</button>
          <button @click.prevent="out" class="btn btn-outline-success d-flex align-items-center justify-content-center" v-if="stock <= 0">Sold Out</button>
        </div>
    </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ProductCard',
  props: ['src', 'name', 'price', 'id', 'stock', 'category'],
  computed: {
    urlData () {
      return `background-image: url("${this.src}");`
    },
    myCart () {
      return this.$store.state.currentCart
    },
    total () {
      return 1 * this.price
    }
  },
  methods: {
    ...mapMutations(['ADD_CART']),
    validationCart (id) {
      let tag = false
      this.myCart.forEach(el => {
        if (el.id === id) {
          tag = true
        }
      })
      if (tag) {
        return true
      } else {
        return false
      }
    },
    out () {
      this.$swal.fire({
            position: 'center',
            icon: 'info',
            text: `${this.name} is out of stock`,
            showConfirmButton: false,
            timer: 1500
          })
    },
    add () {
      if (localStorage.access_token && this.$store.state.isLogin) {
        if (!this.validationCart(this.id) && this.$store.state.checkOut.length === 0) {
          this.ADD_CART({
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
            src: this.src,
            quantity: 1,
            total: this.total,
            image: this.src,
            category: this.category
          })
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            text: `${this.name} has been added to your cart`,
            showConfirmButton: false,
            timer: 1500
          })
        } else if (this.$store.state.checkOut.length > 0) {
          this.$swal.fire({
            position: 'center',
            icon: 'info',
            text: `Please Finish your checkout product first`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.$swal.fire({
            position: 'center',
            icon: 'info',
            text: `${this.name} already in your cart`,
            showConfirmButton: false,
            timer: 1500
          })
        } 
      } else {
        this.$swal.fire(
          'Have\'nt Sign in yet',
          'Please sign in first before making purchase',
          'question'
        )
      }
    }
  }
}
</script>

<style scoped>
#img {
  width: 15rem;
  height: 180px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.btn {
  color: white;
  background-color: #CFC08A;
  font-family: 'Baloo Paaji 2', cursive ! important;
}

.btn:hover {
  background-color: #CFC08A;
}

.card-product {
  font-family: 'Baloo Paaji 2', cursive ! important;
  margin: 10px;
}

.card-product:hover {
    -webkit-box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
-moz-box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
}
</style>
