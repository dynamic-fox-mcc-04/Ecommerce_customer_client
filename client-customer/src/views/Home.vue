<template>
  <div class="pg-home">
    <Navbar />
    <h1>E-APOTHEKE</h1>
    <p>Please Navigate Buttons to View or Purchase Drugs.</p>
    <router-view />
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import socket from '../config/socket'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  props: [],
  data () {
    return {}
  },
  methods: {},
  created () {
    socket.on('added_product', payload => {
      this.$toasted.success(`${payload.name} IS NOW IN STORE`, {
        position: 'bottom-right'
      })
    })

    socket.on('updated_product', (payload) => {
      this.$toasted.success(`PRODUCT ${payload.name} HAS BEEN UPDATED`, {
        position: 'bottom-right'
      })
    })

    socket.on('deleted_product', (payload) => {
      console.log('ONE PROJECT DROPPED FROM STORE')
      this.$toasted.show(payload, {
        position: 'bottom-right'
      })
    })
  },
  mounted: {}
}
</script>

<style>
</style>
