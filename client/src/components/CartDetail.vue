<template>
  <div class="cartDetail">
      <div class="cartDetail-warp">
        <div class="cartList">
            <div class="wrap" v-for="item in cart" :key="item.id">
                <div class="wrap-image">
                    <div class="prodImg">
                        <img :src="item.image_url" alt="">
                    </div>
                    <div class="wrap-2">
                        <div class="prodTitle">
                            <h2>{{item.name}}</h2>
                        </div>
                        <div class="prodPrice">
                            <h4>Rp.{{convertPrice(item.price)}}</h4>
                        </div>
                         <div class="qty-input">
                            <input type="number" min="1" :max="item.stock" class="form-control" v-model="item.qty" @input="getQty($event.target.value)">
                        </div>
                    </div>
                </div>
                <div class="btn-group">
                    <div class="delete">
                        <button @click.prevent="delCart(item.orderId, item.cartId)"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="cartTotal">
            <h1 v-if="countSummary <= 0">Your Bag is Empty</h1>
            <div v-else>
                <div class="summary">
                    <h3>Total</h3>
                </div>
                <div class="totalPrice">
                    <h1>Rp {{convertPrice(countSummary)}}</h1>
                </div>
                <div class="checkout-btn">
                    <button @click.prevent="checkOutCart" class="btn btn-warning">checkout</button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import numeral from 'numeral'

export default {
  name: 'CartDetail',
  data () {
    return {
      totalSummary: 0,
      qty: 0
    }
  },
  methods: {
    ...mapActions(['fetchCarts']),
    ...mapActions(['deleteCart']),
    ...mapActions(['checkout']),
    checkOutCart () {
      const temp = this.cart.map((el, index) => {
        return {
          orderId: el.orderId,
          cartId: el.cartId,
          prodId: el.ProdId,
          qty: Number(this.countQty[index]),
          total: Number(this.countSummary)
        }
      })

      this.checkout(temp)
        .then(result => {
          this.fetchCarts()
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch(err => {
          console.log(err.data)
        })
    },
    convertPrice (value) {
      return numeral(value).format('0,0')
    },
    getQty (value) {
      this.qty = value
    },
    summary (value) {
      this.totalSummary += value
    },
    delCart (orderId, cartId) {
      console.log(orderId, cartId)
      this.deleteCart({ orderId, cartId })
        .then(res => {
          this.fetchCarts()
          this.$router.push('/cart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState(['cart']),
    countQty () {
      let result = []
      result = this.cart.map(el => {
        return el.qty
      })
      return result
    },
    countSummary () {
      let result = 0
      this.cart.forEach(el => {
        const temp = el.price * el.qty
        result += temp
      })
      return result
    }
  },
  created () {
    this.fetchCarts()
  }
}
</script>

<style>
    .cartDetail {
        height: 100vh;
        width: 90vw;
        margin-top: 5%;
    }
    .cartDetail-warp{
        height: 100%;
        margin-left: 20%;
        display: flex;
        flex-direction: row;
    }

    .checkout-btn button {
        width: 90%;
        font-weight: bolder;
        font-size: 24px;
        color: white;
    }

    .checkout-btn {
        text-align: center;
    }

    .cartList {
        background: white;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }

    .wrap-image {
        display: flex;
        flex-direction:row ;
    }

    .wrap-2 {
        display: flex;
        flex-direction: column;
    }

    .prodImg {
        height: 200px;
        width: 200px;
        background: white;
        margin-right: 10px;
        margin-top: 10px;
    }

    .prodImg img {
        width: 100%;
    }

    .wrap {
        width: 700px ;
        background:white;
        height: 250px;
        display: flex;
        flex-direction: column;
        margin: 10px;
        border: 1px solid rgb(197, 197, 197);
    }
    .cartTotal {
        width: 400px;
        background: white
    }

    .qty-input input[type="number"]{
        text-align: center;
        font-weight: bolder;
        font-size: 20px;
        width: 125px;

    }

    .delete button {
        background: none;
        border: none;
    }

    .delete button:focus {
        outline: none;
    }

    .delete .fa-trash {
        color: rgb(138, 136, 136);
        width:  24px;
        height: 24px;
    }
</style>
