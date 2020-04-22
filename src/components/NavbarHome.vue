<template>
  <div class="NavBar">
    <nav class="navbar navbar-light bg-white">
      <div class="nav-brand">
        <img src="../assets/icn.jpg" alt="logo" style="height: 50px;">
        <a class="navbar-brand">Neko Pawrtal</a>
      </div>
      <div id="signin">
        <router-link id="btn" to="/signin">
          <i class="fas fa-sign-in-alt fa-lg"></i>Signin
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavbarHome'
}
</script>

<style scoped>
.nav-brand{
  display: flex;
  align-items: center;
}

.nav-brand img{
  margin-right: 15px;
}

.nav-brand a{
  font-family: 'Gochi Hand', cursive;
  font-size: 30px;
  color: #444;
  padding: 0;
}

#signin {
  height: 80%;
  padding-left: 30px;
  border-left: 1px solid #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
}

#signin #btn{
  color: #646666;
  display: flex;
  align-items: center;
}

#signin #btn i{
  margin-right: 10px;
}

#signin #btn:hover {
  color: #f96816;
  transition: .5s;
  transform: scale(1.15);
  text-decoration: none;
}
</style>
