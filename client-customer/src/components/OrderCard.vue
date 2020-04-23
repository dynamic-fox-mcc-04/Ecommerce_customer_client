<template>
  <div class="ccard">
    <b-card
      :img-src="`${order.Product.image_url}`"
      :img-alt="`${order.Product.name}`"
      img-left
      img-height="100vh"
      img-width="100vh"
      class="mb-3"
    >
      <b-card-text>
        <p><b>{{order.Product.name}}</b></p>
        <p>Description: {{order.Product.description}}</p>
        <p><b>TOTAL QTY: {{ order.total_qty }} pcs</b></p>
        <p><b>TOTAL AMT: IDR {{ order.total_price }}</b></p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
// import socket from '../config/socket'
export default {
  name: 'OrderCard',
  components: {
  },
  props: ['order'],
  data () {
    return {}
  },
  methods: {},
  created () {}
}
</script>

<style scoped>
.ccard {
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
