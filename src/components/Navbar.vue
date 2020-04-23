<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand @click.prevent="home" style="cursor: pointer">Home</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form @submit.prevent="search">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="find"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <b-icon icon="person-fill"></b-icon> Account
          </template>
          <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
          <b-dropdown-item @click.prevent="cart">{{order}}</b-dropdown-item>
          <b-dropdown-item @click.prevent="logout">Logut</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      find: ''
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    search () {
      this.$store.dispatch('search', this.find.toLowerCase())
    },
    home () {
      this.$router.push('/')
    },
    cart () {
      this.$router.push('/cart')
    }
  },
  computed: {
    order () {
      const order = this.$store.state.cart
      return `Cart ${order.length}`
    }
  },
  updated () {
    this.$store.dispatch('getProduct')
  }
}
</script>
