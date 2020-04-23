<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light shadow p-3 bg-white rounded">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/icn.jpg" style="height: 50px;"/>Neko Pawrtal
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggle"
        aria-controls="navbarToggle"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggle">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-center">
          <li class="nav-item active">
            <div class="dropdown">
              <a class="nav-link dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Product</a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <router-link class="dropdown-item" to="/product/accessories">Accessories</router-link>
                <router-link class="dropdown-item" to="/product/foods">Foods</router-link>
                <router-link class="dropdown-item" to="/product/groomingaids">Grooming Aids</router-link>
                <router-link class="dropdown-item" to="/product/toiletries">Toiletries</router-link>
              </div>
            </div>
          </li>
        </ul>
        <div class="icon">
          <div id="cart">
            <router-link class="nav-link" to="/cart">
              <i class="cart fas fa-shopping-basket fa-lg"></i>My Shopping Cart
            </router-link>
          </div>
          <div id="signout">
            <a @click="$store.dispatch('signout')" class="nav-link">
              <i class="fas fa-sign-out-alt fa-lg"></i>Signout
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
<style scoped>
.navbar-brand{
  font-family: 'Gochi Hand', cursive;
}

.navbar-brand img{
  margin-right: 15px;
}

#navbarToggle ul li {
  font-size: 20px;
}

.icon {
  display: flex;
}

.icon i {
  color: #444;
  margin-right: 5px;
}

.dropdown a{
  color: #444;
  cursor: pointer;
}

#cart {
  margin-right: 25px;
  cursor: pointer;
}

#cart:hover {
  transition: .5s;
  transform: scale(1.05);
}

#signout {
  cursor: pointer;
  margin-right: 20px;
}

#signout:hover {
  transition: .5s;
  transform: scale(1.05);
}

.nav-link{
  padding: 0;
  color:  #444;
}
</style>
