<template>
  <div>
    <navbar></navbar>
    <!-- <b-table striped hover :items="items" :fields="fields"></b-table> -->
    <table border="1" style="width:100%">
      <thead>
        <th>Product Name</th>
        <th>Sum</th>
        <th>Action</th>
      </thead>
      <tr v-for="item in items" :key="item.id">
        <td>{{item.Product.name}}</td>
        <td>{{item.sum}}</td>
        <td><button @click.prevent="removeOrder(item)">Remove</button></td>
      </tr>
    </table>
    <button type="submit">Buy</button>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Cart',
  data () {
    return {
      fields: ['Product Name', 'Sum']
    }
  },
  methods: {
    removeOrder (order) {
      this.$store.dispatch('removeOrder', order)
    }
  },
  components: {
    Navbar
  },
  computed: {
    items () {
      console.log(this.$store.state.cart)
      return this.$store.state.cart
    }
  },
  created () {
    this.$store.dispatch('getCart')
  }
}
</script>
