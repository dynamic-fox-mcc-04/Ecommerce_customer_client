<template>
    <div class="container">
        <!-- Get the design and inspired from https://bbbootstrap.com/snippets/ecommerce-furniture-product-list-onhover-83554976 -->
    <div class="row" v-for="product in products" :key="product.id">
        <div class="col-md-4">
            <div class="category mb-10">
                <div class="htcatthumb">  <img :src="product.image_url"> </div>
                <div class="frhoverinfo">
                    <ul class="productaction">
                        <li><a  @click.prevent="makeOrder"><i class="fa fa-shopping-bag"></i></a></li>
                        <li><a @click.prevent="toCart(product.id, product.price, product.stock)"><i class="fa fa-plus"></i></a></li>
                        <li><a><i class="fa fa-share"></i></a></li>
                    </ul>
                </div>
                <div class="frproductinner innerposition">
                    <h4><a >{{product.name}}</a></h4>
                    <p>Stock left: {{product.stock}}</p>
                    <ul class="frproprize text-left ml-text">
                        <li class="oldprize">{{updateCurrency(product.price)}}</li>
                    </ul>
                    <ul class="rating">
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'CardProduct',
  methods: {
    toCart (id, price, stock) {
      this.$store.commit('setQuantity')
      const total = this.$store.state.cart.quantity * price
      console.log(total)
      this.$store.commit('setTotalPrice', total)
      this.$store.commit('setProductId', id)
      this.$store.commit('setInitialStock', stock)
      console.log(this.$store.state.cart.quantity)
      this.$store.dispatch('toCart')
        .then(({ data }) => {
          this.$alert(`success add to cart product ${data.ProductId}`)
          this.$store.commit('updateStockProduct', data.quantity)
          return this.$store.dispatch('updateStockProduct')
        })
        .then(({ data }) => {
          this.$alert(data.msg)
          this.$store.commit('resetCart')
          return this.$store.dispatch('getProducts')
        })
        .then(({ data }) => {
          const { products } = data
          console.log(products)
          this.$store.commit('fillProducts', products)
        })
        .catch(err => this.$alert(err))
    },
    updateCurrency (price) {
      const formatter = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      })
      return formatter.format(price)
    },
    makeOrder () {
      this.$router.push('/carts')
    }
  },
  computed: {
    products: {
      get () {
        return this.$store.state.products
      }
    }
  },
  created () {
    this.$store.dispatch('getProducts')
      .then(({ data }) => {
        const { products } = data
        console.log(products)
        this.$store.commit('fillProducts', products)
      })
      .catch(err => this.$alert(err))
    console.log(this.$store.state.cart.OrderId)
    this.$store.dispatch('getCarts')
      .then(({ data }) => console.log('sukses', data))
      .catch(err => console.log('ini', err))
  }
}
</script>

<style scoped>
.category {
    overflow: hidden;
    position: relative;
    border: 3px solid #121212
}

.container {
    margin-top: 50px;
    margin-bottom: 50px
}

a,
.btn {
    transition: all 0.3s ease-out 0s
}

a {
    color: white;
    text-decoration: none !important
}

h4 {
    margin-bottom: 0px !important
}

.mb-10 {
    margin-bottom: 10px
}

.htcatthumb img {
    height: 100%;
    width: 100%
}

p+img,
img:last-child {
    margin-bottom: 0
}

.frhoverinfo {
    position: absolute;
    right: 20px;
    top: 20px
}

.productaction {
    display: flex;
    justify-content: center;
    flex-flow: column
}

.ml-text {
    margin-left: -44px
}

ul,
ol {
    list-style: none
}

.productaction li:nth-child(1) {
    opacity: 0;
    transition: opacity 300ms linear 0s
}

.productaction li:nth-child(2) {
    opacity: 0;
    transition: opacity 300ms linear 0s
}

.productaction li:nth-child(3) {
    opacity: 0;
    transition: opacity 300ms linear 0s
}

.productaction li {
    margin: 0;
    margin-bottom: 2px
}

.productaction li a {
    background: #121212 none repeat scroll 0 0;
    display: inline-block;
    height: 50px;
    line-height: 60px;
    text-align: center;
    transition: all 0.4s ease 0s;
    width: 50px
}

.productaction li a i {
    color: white;
    font-size: 18px;
    transition: all 0.4s ease 0s
}

.category:hover .productaction li:nth-child(1) {
    -webkit-animation: 300ms ease-in-out 0s normal none 1 running fadeInRight;
    animation: 300ms ease-in-out 0s normal none 1 running fadeInRight;
    opacity: 1;
    transition: opacity 300ms linear 0s
}

.category:hover .productaction li:nth-child(2) {
    -webkit-animation: 500ms ease-in-out 0s normal none 1 running fadeInRight;
    animation: 500ms ease-in-out 0s normal none 1 running fadeInRight;
    opacity: 1;
    transition: opacity 500ms linear 0s
}

.category:hover .productaction li:nth-child(3) {
    -webkit-animation: 500ms ease-in-out 0s normal none 1 running fadeInRight;
    animation: 500ms ease-in-out 0s normal none 1 running fadeInRight;
    opacity: 1;
    transition: opacity 500ms linear 0s
}

.category:hover .frproductinner.innerposition {
    bottom: 0;
    opacity: 1
}

.frproductinner.innerposition {
    background: #121212 none repeat scroll 0 0;
    bottom: -20px;
    left: 0;
    opacity: 0;
    padding: 30px 20px;
    position: absolute;
    text-align: left;
    transition: all 0.5s ease 0s;
    width: 100%
}

.frproductinner h4 a {
    color: white;
    font-family: Old Standard TT;
    font-size: 17px;
    font-weight: 600;
    text-transform: capitalize;
    transition: all 0.3s ease 0s
}

.innerposition .frproprize {
    float: left;
    justify-content: flex-start
}

.frproprize {
    display: flex;
    justify-content: center;
    margin-top: 6px
}

.frproprize li {
    color: white;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    margin: 0 5px
}

.innerposition .frproprize {
    margin-top: 0
}

.innerposition .rating {
    display: flex;
    float: right
}

.rating li i {
    color: yellowgreen
}
</style>
