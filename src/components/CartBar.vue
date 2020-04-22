<template>
      <div class="pos-f-t">
        <div class="collapse" id="navbarToggleExternalContent">
            <div class="contCart bg-light pt-3 pl-3 pr-3 d-flex justify-content-center align-items-center">
                <table class="table table-light">
                    <thead>
                        <tr>
                            <td>image</td>
                            <td>name</td>
                            <td>price</td>
                            <td>quantity</td>
                            <td>action</td>
                        </tr>
                    </thead>
                     <tbody>
                         <CartRow v-for="cart in myCart" :key="cart.id" :src="cart.src" :name="cart.name" :price="cart.price" :id="cart.id"></CartRow>
                    </tbody>
                </table>
            </div>
        </div>
        <nav id="cart-bar" class="navbar navbar-light bg-light d-flex justify-content-between align-items-center">
            <button class="navbar-toggler btn-outline-light" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon white-text"></span>
            </button>
            <h4 style="text-align: center; position: relative; top: 5px; color: white;" class="d-flex justify-content-between align-items-center">Cart Bar</h4>
            <div>
                <button class="btn-outline-light form-control">Check Out</button>
            </div>
        </nav>
    </div>
</template>

<script>
import CartRow from '../components/CartRow'
export default {
  name: 'CartBar',
  components: {
      CartRow
  },
  computed: {
      myCart () {
          return this.$store.state.currentCart
      }
  }
}
</script>

<style>
td {
    border: none ! important;
}
#img-cart {
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}

.pos-f-t {
    background-color: #CFC08A ! important;
    position: fixed;
    bottom: 0;
    left: 10vw;
    width: 80vw;
    border-radius: 10px ! important;
    font-family: 'Baloo Paaji 2', cursive ! important;
}

.contCart {
    background-color: #CFC08A ! important;
    border-radius: 10px 10px 0 0 ! important;
}

#cart-bar {
    background-color: #CFC08A ! important;
    border-radius: 10px 10px 0 0 ! important;

}
</style>
