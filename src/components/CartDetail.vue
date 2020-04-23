<template>
<div class="details">
    <Navbar/>
      <div class="space">
      </div>
        <br><br>
    <div id="item-detail">
        <h2>{{item.Product.name}}</h2>
        <img :src="item.Product.image" />
        <h4>{{item.Product.description}}</h4>
        <h3>IDR {{formatMoney(item.Product.price)}}</h3>
        <h3>{{item.Product.stock}} item(s) left</h3>
        <h3>You Ordered {{item.quantity}} item(s)</h3>
        <h3>Total : IDR {{formatMoney(item.quantity*item.Product.price)}} item(s)</h3>
    </div>
    <div id="Action">
        <form>
            <input type="number" v-model="quantity" style="width: 50px;">
            <button type="submit" class="btn btn-info btn-lg" value="submit" @click.prevent="addToCart(item.Product.id)"><span class="glyphicon glyphicon-plus"></span>Add More</button> 
        </form>
        <button href="#" class="btn btn-info btn-lg" @click.prevent="deleteFromCart(item.id)">
          <span class="glyphicon glyphicon-minus"></span> Remove from Cart 
        </button>
        <button class="btn btn-info btn-lg" @click.prevent="back">Back</button>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    name: 'CartDetail',
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
          return this.$store.state.itemcart
      }
  },
  methods: {
      addToCart(id) {
          let payload = {
              id: id,
              quantity: this.quantity
          }
          this.$store.dispatch('addToCart',payload)
          .then((data)=>{
              this.$router.push('/cart')
          })
      },
      back () {
          this.$router.push('/cart')
      },
      formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                const negativeSign = amount < 0 ? "-" : "";

                let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;

                return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
                console.log(e)
            }
        },
        deleteFromCart(id) {
            this.$store.dispatch('deleteFromCart',id)
            .then((result)=>{
                this.$router.push('/cart')
            })
        }
  },created (){
      if(this.item.id==undefined){
          this.$router.push('/cart')         
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