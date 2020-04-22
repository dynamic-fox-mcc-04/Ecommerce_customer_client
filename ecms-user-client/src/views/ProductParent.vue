<template>
  <div>
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'ProductParent',
  data () {
    return {
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.dispatch('FetchProducts')
        .then(result => {
          this.$store.commit('SET_PRODUCTS', result.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
