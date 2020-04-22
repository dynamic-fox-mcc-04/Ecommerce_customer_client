<template>
  <div class="containerBig">
    <table id="table-checkOut" class="table-light">
           <thead>
                <tr>
                    <td>id</td>
                    <td>name</td>
                    <td>quantity</td>
                    <td>total</td>
                    <td>Status</td>
                    <td>Date</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                    <td>{{transaction.id}}</td>
                    <td>{{transaction.Product.name}}</td>
                    <td>{{transaction.qty}}</td>
                    <td>Rp {{transaction.total}},-</td>
                    <td>{{transaction.status}}</td>
                    <td>{{new Date(transaction.createdAt).toDateString()}}</td>
                </tr>
            </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: 'ContainerTransaction',
  components: {
  },
  computed: {
    transactions () {
      return this.$store.state.transactions
    }
  }
}
</script>

<style>
.containerBig {
    font-family: 'Baloo Paaji 2', cursive ! important;
    padding: 10px;
    margin-top: 100px;
    width: 80vw;
    height: 40vh;
    border: solid #CFC08A 2px;
    position: relative;
    bottom: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    overflow: scroll;
    -webkit-box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
-moz-box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
}

#table-checkOut {
    width: 80%;
}
</style>
