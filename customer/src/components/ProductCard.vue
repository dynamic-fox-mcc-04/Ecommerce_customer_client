<template>

  <div class="card" style="width:200px">
  <img class="card-img-top" :src="product.image_url" alt="Card image">
  <div class="card-body">
    <h4 class="card-title">{{product.name}}</h4>
    <p class="card-text">price : {{product.price}}</p>
    <p class="card-text">stock : {{product.stock}}</p>
    <a href="#" class="btn btn-primary">add to cart</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product']
}
</script>

<style>

</style>
