<template>
  <div class="btn-bar">
    <div class="mt-3">
      <!-- <b-button-group>
        <b-button variant="primary" router-link to="/home">Home</b-button>
        <b-button variant="success" router-link to="/dashboard">Show Items</b-button>
        <b-button variant="secondary" router-link to="/shoppingcart">My Cart</b-button>
        <b-button variant="info" router-link to="/orders">My Orders</b-button>
        <b-button variant="danger" @click.prevent="logout">Logout</b-button>
      </b-button-group> -->

      <!-- REAL NAVBAR -->
      <b-navbar toggleable="lg" type="dark" variant="success">
      <router-link to="/home">
        <b-navbar-brand>e-Apotheke</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item disabled>{{username}}</b-nav-item>
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

      <!-- END REAL NAVBAR -->
    </div>
  </div>
</template>

<script>
import socket from '../config/socket'
export default {
  name: 'Navbar',
  components: {},
  props: [],
  created () {},
  data () {
    return {
      user: ''
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
  },
  computed: {
    username () {
      return this.$store.state.user
    }
  }
}
</script>

<style>
</style>
