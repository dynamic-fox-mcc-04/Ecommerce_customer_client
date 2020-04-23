<template>
  <div id="app">
    <div id="nav">
        <div id="title">
            <a>Ragnarok Shop</a>
        </div>
        <div id="homepage-logo">
            <img src="./assets/ragnarok.png" id="logo">
        </div>
        </div>
        <!-- <div class="obs">
        </div> -->
    <router-view/>
  </div>
</template>
<script>
export default {
    components: {
        
    },
    methods : {
        home () {
            if(this.$router.currentRoute.path !== '/'){
                this.$router.push('/')
            }
        }
    }
}
</script>
<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Josefin Slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  height: 55px;
  width: 100%;
  background-image: linear-gradient(to right, red , black);
  position: fixed;
  z-index: 9;

}

/* #nav #homepage-logo a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
  font-size: 20px;
} */

#nav a.router-link-exact-active {
  color: #385347;
}
#homepage-logo{
    position: fixed;
    width: 100%;
    text-align: center;
    background: none;
}

#logo {
    width: 150px;
    height: 100px;
    margin-top: 5px;
}
#title{
    position: fixed;
    margin-left: 5px;
    width: 100%;
    font-family: 'Righteous', cursive;
}

#title a{
    color: white;
    font-size: 36px;
}
.obs{
    height: 55px;
    background: black;
}

</style>
