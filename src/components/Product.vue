<template>
<div class="d-flex flex-wrap">
  <div v-for="product in products" :key="product.id" :id="order(product.id)" class="order">
    <b-card
      :title="product.name"
      :img-src="product.image_url"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
       v-if="product.stock > 0"
    >
      <b-card-text>
        {{product.description}} <br>
        Stock: {{product.stock}} <br>
        Price: {{product.price}} <br>
      </b-card-text>
      <div class="d-flex bd-highlight mb-3">
        <!-- <b-input-group class="mt-3" prepend="Sum">
          <b-form-input v-model="sum[product.id]" type="number" min="1" :max="product.stock" ></b-form-input>
          <b-input-group-append>
          <b-button variant="primary" class="mr-auto p-2 bd-highlight" type="submit" @submit.prevent="buy(product)">Buy</b-button>
          </b-input-group-append>
        </b-input-group> -->
          <form @submit.prevent="addCart(product)">
            <input type="number" min="1" :max="product.stock" v-model="sum[product.id]">
            <input type="submit" value="Buy">
          </form>
      </div>
    </b-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      sum: {}
    }
  },
  computed: {
    role () {
      return this.$store.state.role
    },
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    addCart (product) {
      console.log(this.sum[product.id])
      product.sum = this.sum[product.id]
      this.$store.dispatch('addCart', product)
      this.$store.dispatch('getProduct')
      this.$router.push('/cart')
    },
    order (id) {
      return `order-${id}`
    }
  },
  created () {
    for (const i in this.products) {
      this.sum[this.products[i].id] = 1
    }
  }
}
</script>

<style scoped>
.order {
  margin: 5px 5px 0 0;
}
</style>
