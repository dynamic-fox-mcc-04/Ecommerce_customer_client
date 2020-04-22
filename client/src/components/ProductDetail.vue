<template>
  <div class="productDetail">
      <div class="productsDetail-wrap">

        <div class="imageEdit">
            <img :src="product.image_url" alt="">
        </div>
        <div class="detail">
            <div class="titleEdit">
                <h1>{{product.name}}</h1>
            </div>
            <div class="prodPrice">
                 <h4 v-if="count <= 0">Rp. {{convert(product.price)}}</h4>
                <h4 v-else>Rp. {{convert(product.price * count)}}</h4>
            </div>
            <div class="prodStock">
                <input type="number" min="1" :max="product.stock" class="form-control"  v-model="count">
                <p v-if="product.stock > 0" style="color:orange;">in stock</p>
                <p v-else style="color:red;">out of stock</p>
            </div>
            <div class="checkOutbtn" v-if="product.stock > 0">
                <button class="btn btn-outline-warning" >Checkout</button>
                <button class="btn btn-warning" @click.prevent="addToBag">Add to bag</button>
            </div>
            <div class="checkOutbtn" v-else>
                <button class="btn btn-outline-secondary" disabled>Checkout</button>
                <button class="btn btn-secondary" disabled>Add to bag</button>
            </div>
              <div class="errors" v-if="isSuccess">
                <div class="alert alert-success" role="alert">
                    <li>SUCCESS ADD ITEM  </li>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import numeral from 'numeral'
export default {
  name: 'ProductDetail',
  data () {
    return {
      count: 1,
      prodId: 0,
      isSuccess: false
    }
  },
  methods: {
    ...mapActions(['fetchProducts']),
    ...mapActions(['addCart']),
    ...mapActions(['fetchCarts']),
    convert (price) {
      return numeral(price).format('0,0')
    },
    addToBag () {
      this.addCart({ productId: this.prodId, qty: this.count })
        .then(result => {
          this.fetchCarts()
          this.isSuccess = true
        })
        .catch(err => {
          console.log(err)
          this.isSuccess = false
        })
    }
  },
  computed: {
    ...mapState(['products']),
    product () {
      return this.products.find(prod => prod.id === Number(this.prodId))
    }
  },
  created () {
    this.prodId = this.$route.params.id
    this.fetchProducts()
  }
}
</script>

<style>
    .productDetail {
        height: 100vh;
        width: 70%;
        margin-left: 15%;
    }
    .productsDetail-wrap {
        margin-top: 65px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: white;
    }

    .imageEdit {
        width: 700px;
        height: 100%;
    }

    .imageEdit img {
        margin-top: 100px;
        width: 100%;
    }
    .detail {
        margin-top: 60px;
        flex: 1;
        text-align: left;
    }

    .prodStock {
        margin-left: 10px;
    }

    .detail input[type="number"] {
        width: 70%;
        margin-top: 20px;
        font-size: 24px;
        text-align: center;
    }

    .detail h1, .detail h4 {
        text-align: left;
        padding-left: 10px;
    }

    .detail h1 {
        font-size: 50px;
        font-weight: bolder;
    }

    .checkOutbtn {
        padding: 10px;
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 100px;

    }

    .checkOutbtn button {
        width: 100%;
        height: 50px;
        font-weight: bolder;
        margin-left: 10px;
    }

</style>
