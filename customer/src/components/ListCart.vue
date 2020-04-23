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
                    <span class='thin small'> stock: {{listpending.Product.stock}}<br><br></span>
                </td>

                </tr>
                <tr>
                <td>
                  <button @click.prevent="del">delete</button>
                    <div class='price'>Rp.{{listpending.price}}</div>
                </td>
                </tr>
            </tbody>

            </table>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from '../axios'
export default {
  name: 'ListCard',
  props: ['listpending'],
  methods: {
    ...mapActions(['fetchPending']),
    del () {
      console.log('--------------', this.listpending.id)
      axios({
        method: 'delete',
        url: '/trans',
        headers: {
          token: localStorage.token,
          idalamat: localStorage.idalamat
        },
        data: {
          id: this.listpending.id
        }
      })
        .then(result => {
          this.fetchPending()
          this.$toasted.global.my_app_info({
            message: 'Delete item in cart success'
          })
        })
        .catch(err => {
          // this.loginstate = false
          console.log(err)
        })
    }
  },
  created () {
    this.fetchPending()
  }
}
</script>

<style>

</style>
