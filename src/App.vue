<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created: function () {
    if (localStorage.access_token) {
      if (localStorage.email) {
        this.$store.commit('SET_USER', localStorage.email)
      }
    }
  }
}
</script>

<style>

</style>
