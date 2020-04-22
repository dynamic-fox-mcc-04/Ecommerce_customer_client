<template>
  <div class="pg-orders" v-if="!isLoading">
    <h2>MY ORDERS</h2>
     <OrderCard
      v-for="order in orders"
        :key="order.id"
        :order="order"
        class="ocards"
      />
  </div>
</template>

<script>
import OrderCard from '../components/OrderCard'
export default {
  name: 'Orders',
  components: {
    OrderCard
  },
  props: [],
  data () {
    return {}
  },
  methods: {},
  created () {
    this.$store.dispatch('fetchOrders')
  },
  computed: {
    orders () {
      return this.$store.state.orders
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style>
    .ocards {
        width: 50%;
        align-content: center;
        justify-items: center;
        align-items: center;
        margin-left: 25%;
        padding: 2vh;
    }
</style>
