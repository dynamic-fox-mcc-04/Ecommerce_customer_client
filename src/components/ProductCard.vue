<template>
  <div class="card card-product" style="width: 18rem;">
    <img class="card-img-top" :src="src" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-secondary">Go somewhere</a>
    </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['src']
}
</script>

<style>
.card-product {
    margin: 10px;
}

.card-product:hover {
    -webkit-box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
-moz-box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
box-shadow: 1px 1px 15px -2px rgba(5,5,5,0.4);
}
</style>
