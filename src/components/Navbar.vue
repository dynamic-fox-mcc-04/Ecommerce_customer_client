<template>
  <div class="navbar">
      <div id="navbar-list">
          <button class="homebtn" @click.prevent="home"><span class="glyphicon glyphicon-home"></span></button> 
          <button class="cartbtn" @click.prevent="cart" v-if="isLogin"><span class="glyphicon glyphicon-shopping-cart"></span></button>
          <button class="logoutbtn" @click.prevent="logout" v-if="isLogin">LOGOUT</button>
          <div class="dropdown" v-if="!isLogin">
            <button class="dropbtn"><span class="glyphicon glyphicon-user"></span></button>
             <div class="dropdown-content">
                <a href="#" @click.prevent="login">LOGIN</a>
                <a href="#" @click.prevent="register">REGISTER</a>
             </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
    computed : {
        logged () {
            return this.$store.state.logged
        }
    },
    data () {
        return{
            isLogin: false
        }
    },
    created () {
        this.isLogin = this.logged
        if(localStorage.access_token){
            this.isLogin = true
        }else{
            this.isLogin = false
        }
    },
    methods : {
        register (){
            this.$store.dispatch('openRegister')
            if(this.$router.currentRoute.path !== '/'){
                this.$router.push('/')
            }
        },
        logout () {
            this.$store.dispatch('logout')
            this.isLogin = false
            if(this.$router.currentRoute.path !== '/'){
                this.$router.push('/')
            }
        },

        login () {
            this.$store.dispatch('openLogin')
            if(this.$router.currentRoute.path !== '/'){
                this.$router.push('/')
            }
        },

        cart () {
            if(this.$router.currentRoute.path !== '/Cart'){
                this.$router.push('/cart')
            }
        },

        home () {
            if(this.$router.currentRoute.path !== '/'){
                this.$router.push('/')
            }
        }
    }
}
</script>

<style scoped>
.navbar{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 50px;
    margin-top: -7px;
    margin-left: 12px;
    z-index: 100;
    position: fixed;
}


a{
    color: rgb(139, 0, 0);
    text-decoration: none;
    font-family: 'Josefin Slab', serif;
    font-size: 18px;
    margin: 15px;
}

/* Style The Dropdown Button */
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 75px;
}

.homebtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.homebtn:hover{
    background-color: #3e8e41;
}
.cartbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.cartbtn:hover, .logoutbtn:hover{
  background-color: #3e8e41;
}

.logoutbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  margin-left: -40px;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 14px;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

</style>