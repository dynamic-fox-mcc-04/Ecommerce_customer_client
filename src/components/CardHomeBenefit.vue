<template>
  <div class="card d-flex flex-row align-items-center justify-content-center m-1" style="width:350px">
    <div><i :class='icon' style="width: 80px; font-size:48px;"></i></div>
    <div class="card-body d-flex flex-column align-items-start">
      <h4 class="card-title">{{title}}</h4>
      <p class="card-text">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CardBenefit',
    props: ['icon', 'title', 'text']
}
</script>

<style>
.card-body {
  text-align: left;
}
</style>