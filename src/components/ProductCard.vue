<template>
  <div class="card card-product d-flex align-items-center" style="width: 16rem;">
    <div id="img" :style="urlData">
      <div style="width:100px; background-color: #CFC08A; border-radius: 3px 0 3px 0; color: white;">
        <p>Stock {{stock}}</p>
      </div>
    </div>
    <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title">{{name}}</h5>
        <p class="card-text">Rp. {{price}},- /Kg</p>
        <div class="d-flex justify-content-between">
          <button @click.prevent="add" class="btn btn-outline-success d-flex align-items-center justify-content-center">Add Cart</button>
        </div>
    </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ProductCard',
  props: ['src', 'name', 'price', 'id', 'stock'],
  computed: {
    urlData () {
      return `background-image: url("${this.src}");`
    },
    myCart () {
      return this.$store.state.currentCart
    }
  },
  methods: {
    ...mapMutations(['ADD_CART']),
    validationCart (id) {
      let tag = false
      this.myCart.forEach(el => {
        if (el.id == id) {
          tag = true
        }
      })
      if (tag) {
        return true
      } else {
        return false
      }
    },
    add () {
      if (localStorage.access_token && this.$store.state.isLogin) {
        if (!this.validationCart(this.id)) {
          this.ADD_CART({
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
            src: this.src
          })
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            text: `${this.name} has been added to your cart`,
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
          `Have'nt Sign in yet`,
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
  width: 16rem;
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
