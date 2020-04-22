<template>
  <tr>
    <td><div id="img-cart" :style="`background-image: url('` + src + `')`"></div></td>
    <td class="d-flex align-items-center justify-content-center">{{name}}</td>
    <td>{{price}}</td>
    <td>0</td>
    <td><button @click.prevent="remove" class="btn btn-danger form-control" style="color: white">Remove</button></td>
  </tr>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'CartRow',
    props: ['src', 'name', 'price', 'id'],
    methods: {
        ...mapMutations(['REMOVE_CART']),
        remove () {
            console.log(this.id)
            this.REMOVE_CART(this.id)
        }
    }
}
</script>

<style>
td {
    border: none ! important;
}
#img-cart {
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}
</style>