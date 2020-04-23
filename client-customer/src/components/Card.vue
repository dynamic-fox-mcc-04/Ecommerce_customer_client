<template>
  <div class="card">
    <b-card
      :img-src="`${item.image_url}`"
      :img-alt="`${item.name}`"
      img-left
      img-height="100vh"
      img-width="100vh"
      class="mb-3"
    >
      <b-card-text>
        <p>
          <router-link :to="{ name: 'Detail', params: { id: item.id } }">
            <b>
              <h5>{{ item.name }}</h5>
            </b>
          </router-link>
        </p>
        <p>IDR {{ item.price }}</p>
        <p>QTY: {{ item.stock }} pcs</p>
        <p>
          <b-button-group>
            <b-button variant="info" @click.prevent="addToCart(item.id)">Add To Cart</b-button>
          </b-button-group>
        </p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
// import socket from '../config/socket'
export default {
  name: 'Card',
  components: {
    // Navbar
  },
  props: ['item'],
  data () {
    return {}
  },
  methods: {
    addToCart (productId) {
      console.log('ADD TO CART FROM @ CARD')
      console.log(productId)
      this.$store.dispatch('addItem2Cart', +productId)
        .then(_ => {
          console.log('ADDED ITEM TO CART')
          this.$toasted.success('ADDED ITEM TO CART')
          this.$router.push({ path: '/shoppingcart' })
        })
        .catch(err => {
          console.log(err.response)
          const arr = err.response.data.errors
          const code = err.response.status
          const type = err.response.statusText
          const ct = code + ' ' + type
          arr.forEach(el => {
            this.$toasted.error(`${ct}: ${el}`)
          })
        })
    }
  },
  created () {
    // socket.on('deleted_product', payload => {
    //   this.$toasted.success(payload)
    //   this.$store.dispatch('fetchProducts')
    // })
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  border: 0.5px solid black;
  background-color: brown;
  padding: 2vh;
  margin: 2vh;
  border-radius: 25px;
}

.mb-3 {
  background-color: wheat;
  padding: 2vh;
  margin: 2vh;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  border-radius: 25px;
}
</style>
