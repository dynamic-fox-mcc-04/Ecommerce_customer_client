<template>
  <tr>
    <td><div id="img-cart" :style="`background-image: url('` + src + `')`"></div></td>
    <td class="d-flex align-items-center justify-content-center">{{name}}</td>
    <td>{{price}}</td>
    <td>
        <div class="d-flex align-items-center justify-content-center">
            <button @click.prevent="decrementQty" class="btn btn-outline-danger mr-4"><i class='fas fa-minus'></i></button>
            <p style="text-align: center;">{{qty}}</p>
            <button @click.prevent="incrementQty" class="btn btn-outline-primary ml-4"><i class='fas fa-plus'></i></button>
        </div>
    </td>
    <td>{{total}}</td>
    <td><button @click.prevent="remove" class="btn btn-danger form-control" style="color: white">Remove</button></td>
  </tr>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'CartRow',
    props: ['src', 'name', 'price', 'id', 'stock'],
    data () {
        return {
            qty: 1
        }
    },
    methods: {
        ...mapMutations(['REMOVE_CART']),
        remove () {
            console.log(this.id)
            this.REMOVE_CART(this.id)
        },
        incrementQty () {
            console.log(this.stock)
            if (this.qty < this.stock) {
                this.qty++
            }
        },
        decrementQty () {
            if (this.qty > 0) {
                this.qty--
            }
        }
    },
    computed: {
        total () {
            return this.qty * this.price
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