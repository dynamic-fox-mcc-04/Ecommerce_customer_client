<template>
    <div id="Card">
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
        <b-col md="6">
            <b-card-img :src="$attrs.Image_Url" alt="Image" class="rounded-0" height="250" width="250"></b-card-img>
        </b-col>
        <b-col md="6">
            <b-card-body :title="$attrs.Name">
            <b-card-text>
                Stock: {{Stock}}<br>
                Price: {{Price}}
            </b-card-text>
            <form>
                <input type="numbers" v-model="Quantity" ><br><br>
                <b-button class="button"  variant="secondary" @click="AddCart">Add To Cart</b-button>
            </form>
            </b-card-body>
        </b-col>
        </b-row>
    </b-card>
    </div>
</template>

<script>
export default {
  name: 'Product-Card',
  data () {
    return {
      Quantity: 0
    }
  },
  computed: {
    Stock () {
      return this.$attrs.Stock
    },
    Price () {
      return this.$attrs.Price
    }
  },
  methods: {
    AddCart () {
      this.$Progress.start()
      const payload = {
        Quantity: this.Quantity,
        ProductId: this.$attrs.id
      }
      this.$store.dispatch('AddCart', payload)
        .then(result => {
          this.$Progress.finish()
          this.$toasted.success('Added to Cart!!')
        })
        .catch(err => {
          this.$Progress.finish()
          this.$toasted.error('Failed Add Cart!!')
          console.log(err)
        })
    }
  }

}
</script>

<style>
</style>
