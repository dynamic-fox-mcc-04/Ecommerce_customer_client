<template>
  <div id="app">
    <navbar/>
    <vue-progress-bar></vue-progress-bar>
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/navbar'
import io from './components/socket'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    navbar
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('SET_ISLOGIN', true)
      this.$store.dispatch('FetchProducts')
        .then(result => {
          this.$store.commit('SET_PRODUCTS', result.data)
        })
        .catch(err => {
          console.log(err)
        })
      io.on('updatedata', (msg) => {
        console.log('UPDATE DATA')
        this.$store.dispatch('FetchProducts')
          .then(result => {
            this.$store.commit('SET_PRODUCTS', result.data)
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('./assets/wallpaper.jpg');
  background-size: cover;
  height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
