<template>
    <div class="row">
        <div class="col-xl-2"></div>
        <div id="tableHistory" class="col-xl-8">
            <h1>Transaction History</h1>
            <router-link :to="{name: 'Cart'}"><button  class="btn btn-success histoyBtn">My Cart</button></router-link>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price/item</th>
                    <th scope="col">Total</th>
                    <th scope="col">Checkout at</th>
                    </tr>
                </thead>

                <tbody v-for="(item, i) in paidCarts" :key="i">
                    <tr>
                        <td>{{i + 1}}</td>
                        <td>{{item.Product.productName}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.Product.price | currency}}</td>
                        <td>{{item.totalPrice | currency}}</td>
                        <td>{{new Date(item.updatedAt).toString().substring(4, 25)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-xl-2"></div>
    </div>
</template>

<script>
export default {
  name: 'History',
  computed: {
    paidCarts () {
      return this.$store.getters.paidCarts
    }
  },
  created () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
  th {
      vertical-align: center;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      font-family: 'tahoma';
  }
  td {
      vertical-align: center;
      text-align: center;
      font-size: 17px;
      font-weight: bold;
      font-family: 'tahoma';
  }
  .table{
      margin-top: 20px;
      border: none;
  }
  #tableHistory {
      margin-top: 100px;
      width: 98%;
      overflow-y: hidden;
      overflow-x: hidden;
      max-height: 85vh;
  }
  h1 {
      font-family: 'Permanent Marker', cursive;
      text-align: center;
  }
  .qBtn {
      border-radius: 10px;
  }
</style>
