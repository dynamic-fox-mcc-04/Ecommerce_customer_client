<template>
<a class="product-card" href="#" @click.prevent="findById(product.id)">
    <div id="card" v-if="product">
        <div id="card-name">
        <h2>{{product.Product.name}}</h2>
        </div><br>
        <div id="product-image">
            <img id="image" :src="product.Product.image"/>
        </div><br>
        <div id="product-desc">
                <h3>{{product.Product.description}}</h3><br>
                <h3>Quantity : {{product.quantity}}</h3>
                <h3>Total Price : IDR {{formatMoney(product.Product.price*product.quantity)}}</h3>
        </div>
    </div>
</a>
</template>
<script>
export default {
    name: 'ProductCard',
    props: ['product'],
    data () {
        return {
            productPrice : ''
        }
    },
    methods : {
        findById (id) {
            this.$store.dispatch('fetchCartById',id)
            .then((data)=>{
                this.$router.push('cart/detail')
            })
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
        }
    }
    
}
</script>
<style scoped>
.product-card{
    margin: 5px;
}

#card{
    background: white;
    border: solid rgba(0, 0, 0, 0.6);
    border-width: 1px;
    width: 300px;
    height: 350px;
    display: flex;
    flex-direction: column;
    box-shadow: 5px 5px 5px grey;
    transition-duration: 100ms;
    color: black;
    border-radius: 10px;
}

#card:hover{
    transform: scale(1.1);
    transition-duration: 100ms;
    /* box-shadow: none; */
}
#product-image{
    width: 100%;
}
#image{
    width: 150px;
    height: 150px;
}

#product-desc{
    margin: 0;
}
li{
    margin: 0;
    padding: 0;
    list-style-type: none;
}
a{
    text-decoration: none;
    text-align: center;
}

#card-name{
      background-color: #4CAF50;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
}

h2{
    font-weight: 500;
}
</style>