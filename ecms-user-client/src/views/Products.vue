<template>
  <div>
      <h1>Products</h1>
      <div id="ProductTable">
        <card class="Card" v-for="Product in Products" :key="Product.id" v-bind="Product"/>
      </div>
  </div>
</template>

<script>
import card from '../components/ProductCard'
export default {
  name: 'Products',
  computed: {
    Products () {
      return this.$store.state.Products
    }
  },
  components: {
    card
  },
  created () {
    this.$store.dispatch('FetchProducts')
      .then(result => {
        this.$store.commit('SET_PRODUCTS', result.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
#ProductTable{
  width: 80vw;
  margin-left: 10vw;
  height: 80vh;
  margin-top: 5vh;
  background-color: white;
  border-style: double;
  border-width: 5px;
  border-color: black;
  display: flex;
  flex-direction: row;
  overflow: auto;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-evenly;
  padding-top:20px;
}
.Card{
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>
