<template>
  <div class="ccard">
    <b-card
      :img-src="`${tray.Product.image_url}`"
      :img-alt="`${tray.Product.name}`"
      img-left
      img-height="100vh"
      img-width="100vh"
      class="mb-3"
    >
      <b-card-text>
        <p><b>{{tray.Product.name}}</b></p>
        <p>Description: {{tray.Product.description}}</p>
        <p>UNIT PRICE: IDR {{ tray.Product.price }}</p>
        <p><b>QTY: {{ tray.total_qty }} pcs</b></p>
        <p><b>SUBTOTAL: IDR {{ Number(tray.total_qty) * Number(tray.Product.price) }}</b></p>
        <p>
          <b-button-group>
            <b-button variant="info" @click.prevent="addQty(tray.id)">+</b-button>
            <b-button variant="secondary" @click.prevent="reduceQty(tray.id)">-</b-button>
            <b-button variant="danger" @click.prevent="dropCart(tray.id)">DROP</b-button>
          </b-button-group>
        </p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
// import socket from '../config/socket'
export default {
  name: 'CartCard',
  components: {
  },
  props: ['tray'],
  data () {
    return {}
  },
  methods: {
    addQty (trayId) {
      console.log('ADD QTY @ CARTCARD')
      console.log(+trayId)
      this.$store.dispatch('addQty', +trayId)
    },

    reduceQty (trayId) {
      console.log('REDUCE QTY @ CARTCARD')
      console.log(+trayId)
      this.$store.dispatch('reduceQty', +trayId)
    },

    dropCart (trayId) {
      console.log('DROP CART @ CARTCARD')
      console.log(+trayId)
      this.$store.dispatch('dropCart', +trayId)
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
.ccard {
  width: 100%;
  border: 0.5px solid black;
  background-color: brown;
  padding: 2vh;
  margin: 2vh;
}

.mb-3 {
  background-color: wheat;
  padding: 2vh;
  margin: 2vh;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
}
</style>
