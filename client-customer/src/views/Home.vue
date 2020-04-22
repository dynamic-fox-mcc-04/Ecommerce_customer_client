<template>
  <div class="pg-home">
    <Navbar/>
    <h1>E-APOTHEKE</h1>
    <p>Please Navigate Buttons to View or Purchase Drugs.</p>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  props: [],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
</style>
