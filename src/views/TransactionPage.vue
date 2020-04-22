<template>
  <div class="transactionPage d-flex flex-column align-items-center justify-content-center">
      <h2>Checkout</h2>
      <ContainerCheckout></ContainerCheckout>
      <h2 class="mt-3">Transaction History</h2>
      <ContainerBig></ContainerBig>
  </div>
</template>

<script>
import ContainerBig from '../components/ContainerTransaction'
import ContainerCheckout from '../components/ContainerCheckout'
export default {
  name: 'TransactionPage',
  components: {
    ContainerBig,
    ContainerCheckout
  }
}
</script>

<style>
h2 {
    color: #CFC08A;
}
.transactionPage {
    width: 100vw;
    position: relative;
    top: 120px;
}
</style>
