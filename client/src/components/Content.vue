<template>
<div>
  <login-form v-if="showForm" @showLogin="toggleForm"/>
  <div class="content">
    <div class="left">
    </div>
    <div class="center">
        <div class="product-wrap" v-for="product in products" :key="product.id">
            <div class="img-form">
                <img :src="product.image_url" alt="">
            </div>
            <div class="productName">
                <h3>{{product.name}}</h3>
                <button class="btn btn-primary" @click.prevent="cekLogin">Buy</button>
            </div>
            <div class="price">
                <h3> Rp {{priceConvert(product.price)}}</h3>
            </div>
        </div>
    </div>
    <div class="right">
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import numeral from 'numeral'
import LoginForm from '../components/loginForm.vue'
export default {
  name: 'Content',
  components: {
    LoginForm
  },
  data () {
    return {
      showForm: false
    }
  },
  methods: {
    ...mapActions(['fetchProducts']),
    priceConvert (value) {
      return numeral(value).format('0,0')
    },
    toggleForm (value) {
      this.showForm = value
    },
    cekLogin () {
      if (!this.isLogin) {
        this.showForm = true
      } else {
        this.$route.push('/')
      }
    }
  },
  computed: {
    ...mapState(['products']),
    ...mapState(['isLogin'])
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style>
    .content {
        display: flex;
        flex-direction: row;
        overflow: auto;
        justify-content: space-between;
    }

    .product-wrap {
        margin: 5px;
        border-radius: 5px;
        border: 1px solid rgb(212, 212, 212);
        background: white;
    }

    .left, .right {
        max-width: 200px;
        background: rgb(180, 180, 180);
    }
    .center {
        height: 100%;
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .img-form img {
        width: 100%
    }

    .img-form img:hover {
        cursor: pointer;
    }

    .productName {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px;
    }

    .productName h3 {
        font-size: 20px;
        font-weight: bolder;
        color: rgb(105, 99, 99);
    }

     .productName button{
        width: 20%;
    }

    .price {
        margin: 10px;
    }

    .price h3 {
        padding-bottom: 10px;
        font-size: 32px;
        color: #ea6227
    }

</style>
