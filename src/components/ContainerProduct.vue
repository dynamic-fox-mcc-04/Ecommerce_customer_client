<template>
  <div class="containerProduct d-flex align-items-start flex-wrap justify-content-center">
      <ProductCard src="https://5.imimg.com/data5/TB/TU/MY-1542160/leaf-lettuce1-500x500.jpg"></ProductCard>
      <ProductCard src="https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38="></ProductCard>
      <ProductCard src="https://lh3.googleusercontent.com/proxy/KZnmuP-LNDiELH66QzQbqESIhvyyWn--ZwA12ON7OA6TtZHxEgl2V3k8P9e2IGGNX5WNNSDUC6uAvWnECmp2S5TUWkMYdoT0txd5"></ProductCard>
      <ProductCard src="https://lh3.googleusercontent.com/proxy/KZnmuP-LNDiELH66QzQbqESIhvyyWn--ZwA12ON7OA6TtZHxEgl2V3k8P9e2IGGNX5WNNSDUC6uAvWnECmp2S5TUWkMYdoT0txd5"></ProductCard>
      <ProductCard src="https://lh3.googleusercontent.com/proxy/KZnmuP-LNDiELH66QzQbqESIhvyyWn--ZwA12ON7OA6TtZHxEgl2V3k8P9e2IGGNX5WNNSDUC6uAvWnECmp2S5TUWkMYdoT0txd5"></ProductCard>
      <ProductCard src="https://lh3.googleusercontent.com/proxy/KZnmuP-LNDiELH66QzQbqESIhvyyWn--ZwA12ON7OA6TtZHxEgl2V3k8P9e2IGGNX5WNNSDUC6uAvWnECmp2S5TUWkMYdoT0txd5"></ProductCard>
      <ProductCard src="https://lh3.googleusercontent.com/proxy/KZnmuP-LNDiELH66QzQbqESIhvyyWn--ZwA12ON7OA6TtZHxEgl2V3k8P9e2IGGNX5WNNSDUC6uAvWnECmp2S5TUWkMYdoT0txd5"></ProductCard>

  </div>
</template>

<script>
import ProductCard from './ProductCard'
export default {
  name: 'ContainerProduct',
  components: {
    ProductCard
  }
}
</script>

<style>
.containerProduct {
    padding: 10px;
    padding-bottom: 80px;
    width: 70vw;
    position: relative;
}
</style>
