<template>
<div>
   <div class='line'></div>
            <table class='order-table'>
            <tbody>
                <tr>
                <td><img class='full-width' :src="listpending.Product.image_url" >
                </td>
                <td>
                    <br> <span class='thin'>{{listpending.Product.name}}</span>
                    <span class='thin small'> {{listpending.stock}}<br><br></span>
                </td>

                </tr>
                <tr>
                <td>
                    <div class='price'>Rp.{{listpending.price}}</div>
                </td>
                </tr>
            </tbody>

            </table>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ListCard',
  props: ['listpending'],
  methods: {
    ...mapActions(['fetchPending'])
  },
  created () {
    this.fetchPending()
  }
}
</script>

<style>

</style>
