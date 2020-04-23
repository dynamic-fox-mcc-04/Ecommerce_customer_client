<template>
  <div id="Product">
      <h1>Update Product</h1>
      <b-form @submit="onSubmit">
          <b-form-group id="input-group-2" label="Name:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.Name"
                type='text'
                required
                placeholder="Enter Product Name Here"
                ></b-form-input>
          </b-form-group>

            <b-form-group id="input-group-2" label="Quantity:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.Quantity"
                type='number'
                required
                placeholder="Enter Quantity Here"
                ></b-form-input>
          </b-form-group>

          <div id="button">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger" @click.prevent="CancelUpdate">Cancel</b-button>

        </div>
       </b-form>
  </div>
</template>

<script>
export default {
  name: 'Update-Form',
  data () {
    return {
      form: {
        Name: '',
        Quantity: '',
        ProductId: 0
      }
    }
  },
  created () {
    this.$store.dispatch('GetCartDetail', this.$route.params.id)
      .then(result => {
        this.form.Name = result.data.Product.Name
        this.form.Quantity = result.data.Quantity
        this.form.ProductId = result.data.Product.id
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$Progress.start()
      const payload = this.form
      payload.id = Number(this.$route.params.id)
      this.$store.dispatch('UpdateCart', payload)
        .then(result => {
          this.$Progress.finish()
          this.$toasted.success('Update Cart Success!!')
          this.$router.push('/products/cart')
        })
        .catch(err => {
          this.$Progress.finish()
          this.$toasted.error('Update Cart Failed!!')
          console.log(err)
        })
    },
    CancelUpdate () {
      this.$router.push('/products/cart')
    }
  }

}
</script>

<style>
#Product{
  width: 40vw;
  margin-left: 30vw;
}
</style>
