<template>
  <div class="card card-product col-xl-3 m-4" style="width: 18rem;">
    <img class="card-img-top" :src="product.imageUrl" alt="Card image cap">
    <div class="card-body">
      <div class="left">
        <h5 class="card-title body-item">{{product.productName}}</h5>
        <p class="card-text body-item">{{product.price | currency}}</p>
        <p class="card-text body-item">Stock: {{product.stock}}</p>
          <!-- <button class="btn btn-primary" @click="detail">Detail</button> -->
        <button class="btn btn-success body-item" @click="addCart(product.id)"><i class="fas fa-cart-arrow-down"></i></button>
      </div>
      <div class="right">
        <span class="badge badge-pill badge-warning">{{product.category}}</span>
      </div>

    </div>
  </div>
</template>
<script>

export default {
  name: 'Cards',
  props: ['product'],
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    unPaidCarts () {
      return this.$store.getters.unPaidCarts
    }
  },
  methods: {
    addCart (productId) {
      const found = this.unPaidCarts.find(el => el.ProductId === productId)
      if (!found) {
        console.log('masuknya ke add baru')
        this.$store.dispatch('addCart', productId)
          .then(({ data }) => {
            this.$store.dispatch('fetchCarts')
            console.log('success added to cart', data)
            this.$toasted.show('success added to cart', {
              theme: 'bubble',
              position: 'top-right',
              duration: 3000,
              type: 'success'
            })
          })
          .catch(err => {
            console.log(err.response.data.errors[0].message)
            if (!localStorage.getItem('token')) {
              this.$router.push('/login')
            }
            err.response.data.errors.forEach(el => {
              this.$toasted.show(el.message, {
                theme: 'bubble',
                position: 'top-right',
                duration: 3000,
                type: 'error'
              })
            })
          })
      } else {
        console.log('masuk ke add tapi patch')
        let id = ''
        for (let i = 0; i < this.unPaidCarts.length; i++) {
          if (this.unPaidCarts[i].ProductId === productId) {
            id = this.unPaidCarts[i].id
          }
        }
        console.log('ini Cart Idnyaaaa', id)
        const payload = {
          id,
          action: 'plus'
        }
        this.$store.dispatch('patchCart', payload)
          .then(({ data }) => {
            this.$store.dispatch('fetchCarts')
            console.log('quantity successfully increased', data)
            this.$toasted.show('quantity successfully increased', {
              theme: 'bubble',
              position: 'top-right',
              duration: 3000,
              type: 'success'
            })
          })
          .catch(err => {
            console.log(err.response.data.errors[0].message)
            if (!localStorage.getItem('token')) {
              this.$router.push('/login')
            }
            err.response.data.errors.forEach(el => {
              this.$toasted.show(el.message, {
                theme: 'bubble',
                position: 'top-right',
                duration: 3000,
                type: 'error'
              })
            })
          })
      }
    },
    detail (id) {
      this.$store.dispatch('addCart', id)
        .then(({ data }) => {
          console.log(`successfully see detail id: ${id}`)
        })
        .catch(err => {
          console.log(err.response.data.errors[0].message)
        })
    }
  }
}
</script>
<style>
  .btn {
    margin: 0 10px;
  }
  .card-product {
    font-family: 'tahoma';
    border-radius: 10px;
    box-shadow: 5px 5px 5px 0 grey;
    border: none;
  }
  .card-product:hover {
    box-shadow: 10px 10px 10px 0 grey;
  }
  .card-body {
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .btn {
    border-radius: 20px
  }
  .card-img-top {
    height: 65%;
  }
  .body-item {
    margin: 3px 22px;
  }
  .card-title {
    font-weight: bold;
  }
</style>
