<template>
  <div>
    <Loading v-if="isLoading"/>
    <div v-else id="product-page">
      <div class="row d-flex">
        <img :src="image_Url" :alt="name">
        <div class="card col-lg-6 col-md-12">
          <div class="detail">
            <h3>{{ name }}</h3>
            <p class="card-text text-muted">Jadi yang pertama untuk memberi ulasan</p>
            <h4 class="card-text">Price: <span>Rp.{{ price }}</span> </h4>
            <p>Ketersediaan: {{ stock }}</p>
          </div>
          <div class="input" @click="addToCart">
            <a><i class="fas fa-cart-plus fa-lg"></i>Add to cart</a>
          </div>
        </div>
      </div>
    </div>
    <Footerpage/>
  </div>
</template>

<script>
import Footerpage from '../components/Footer'
import Loading from '../components/LoadingPage'

export default {
  name: 'detailProduct',
  components: {
    Footerpage,
    Loading
  },
  data () {
    return {
      id: '',
      name: '',
      price: '',
      stock: '',
      image_Url: ''
    }
  },
  methods: {
    addToCart: function () {
      const payload = this.$route.params.id
      this.$store.dispatch('addCart', payload)
        .then(_ => {
          this.$toasted.show(`successfully added item ${this.name} to cart`, {
            duration: 3000
          })
          this.$router.push('/product/:id')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    isLoading: function () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.$store.dispatch('getProduct', this.$route.params.id)
      .then(({ data }) => {
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.stock = data.stock
        this.image_Url = data.image_Url
      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {
        this.$store.commit('SET_LOADING', false)
      })
  }
}
</script>

<style scoped>
#product-page{
  width: 100%;
  height: 100%;
}

.row{
  margin-top: 50px;
  width: 100%;
  justify-content: center;
}

.row img{
  max-height: 50%;
  max-width: 50%;
}

.card{
  padding-left: 30px;
  margin-bottom: 30px;
  text-align: left;
  border: none;
}

.detail{
  padding-top: 50px;
}

.detail h3{
  font-weight: 700;
}

.detail h3::before{
  content: '|';
  color: #c65039;
  padding-right: 10px;
}

.detail h4{
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(80, 80, 80);
  line-height: 40px;
}

.detail h4 span{
  color: rgb(192, 14, 14);
}

.input{
  color: #c65039;
  cursor: pointer;
}

.input i{
  margin-right: 10px;
}

</style>
