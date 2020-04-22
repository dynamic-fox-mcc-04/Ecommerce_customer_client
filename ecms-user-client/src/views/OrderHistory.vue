<template>
  <div>
      <h1>Order History</h1><br><br>
      <table id="OrderTable">
        <tr class="Order">
          <th class="Order">Name</th>
          <th class="Order">Quantity</th>
          <th class="Order">Price</th>
          <th class="Order">Total Price</th>
        </tr>
        <tr v-for="Order in Orders" :key="Order.id" class="Order">
            <!-- di for untuk dalem nya table  -->
          <td class="Order">{{Order.Product.Name}}</td>
          <td class="Order">{{Order.Quantity}}</td>
          <td class="Order">{{Order.Product.Price}}</td>
          <td class="Order">{{Order.TotalPrice}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: 'Order-History',
  computed: {
    Orders () {
      return this.$store.state.Order
    }
  },
  created () {
    this.$store.dispatch('FetchOrder')
      .then(result => {
        this.$store.commit('SET_ORDER', result.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

}
</script>

<style>
#OrderTable {
  margin-left: 20%;
  margin-right: 20%;
  width: 60vw;
  padding: 10px;
  justify-content: center;
  text-align: center;
  justify-content: center;
  border-style: double;
  border-width: 10px;
  color: black;
  border-color: brown;
}
tr .Order {
  margin: 5px;
  border-style: double;
  border-width: 10px;
  border-color: brown;
}
th .Order {
  margin: 5px;
  border-style: double;
  border-width: 10px;
  border-color: brown;
}
td .Order{
  margin: 5px;
  border-style: double;
  border-width: 10px;
  border-color: brown;
}
</style>
