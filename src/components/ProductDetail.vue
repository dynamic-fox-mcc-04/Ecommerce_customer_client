<template>
<div class="details">
    <Navbar/>
      <div class="space">
      </div>
        <br><br>
    <div id="item-detail">
        <h2>{{item.name}}</h2>
        <img :src="item.image" />
        <h4>{{item.description}}</h4>
        <h3>IDR {{item.price}}</h3>
        <h3>{{item.stock}} item(s) left</h3>
    </div>
    <div id="Action">
        <form>
            <input type="number" v-model="quantity" style="width: 50px;"><br>
            <button type="submit" class="btn btn-info btn-lg" value="submit" @click.prevent="addToCart(item.id)"><span class="glyphicon glyphicon-plus"></span>Add to Cart</button> 
        </form>
        <!-- <button href="#" class="btn btn-info btn-lg">
          <span class="glyphicon glyphicon-minus"></span> Remove from Cart 
        </button> -->
        <button class="btn btn-info btn-lg" @click.prevent="back">Back</button>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    name: 'ProductDetail',
    components: {
        Navbar
    },
    data () { 
        return{
            quantity : 0
        }
    },
    computed: {
      item () {
          return this.$store.state.item
      }
  },
  methods: {
      back () {
          this.$router.push('/')
      },
      addToCart(id) {
          let payload = {
              id: id,
              quantity: this.quantity
          }
          this.$store.dispatch('addToCart',payload)
          .then((data)=>{
              this.$router.push('cart')
          })
      }
  },created (){
      if(this.item.id==undefined){
          this.$router.push('/')         
      }
  }
}
</script>

<style scoped>
.space{
    height: 75px;
}
.details{
    width: 100%;
    text-align: center;
}

#item-detail{
    margin: auto;
    width: fit-content;
    text-align: center;
}

#Action{
    width: fit-content;
    margin: auto;
}

button{
    margin: 5px;
    height: fit-content;
    width: 150px;
}

</style>