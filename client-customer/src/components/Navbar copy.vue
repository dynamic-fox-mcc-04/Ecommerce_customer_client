<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand router-to="/home">e-Apotheke</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>{{username}}</b-nav-item>
          <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Options" right>
            <b-dropdown-item router-link to="/dashboard">Dashboard</b-dropdown-item>
            <b-dropdown-item router-link to="/shoppingcart">My Cart</b-dropdown-item>
            <b-dropdown-item router-link to="/orders">My Orders</b-dropdown-item>
            <b-dropdown-item @click.prevent="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import socket from '../config/socket'
export default {
  name: 'Navbar1',
  components: {},
  props: [],
  created () {},
  data () {
    return {
      user: ''
    }
  },
  computed: {
    username () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      console.log('LOGOUT @ hOME')
      this.user = this.$store.getters.getUser
      localStorage.clear()
      socket.emit('loggedout', this.user)
      this.$store.commit('SET_USER', '')
      socket.on('loggedout2', payload => {
        console.log(`${payload} HAS LOGGED OUT`)
        this.$toasted.show(`${payload} LOGGED OUT`)
      })
      this.$router.push({ path: '/' })
      this.$toasted.show('UNTIL NEXT TIME!')
    }
  }
}
</script>

<style>
</style>
