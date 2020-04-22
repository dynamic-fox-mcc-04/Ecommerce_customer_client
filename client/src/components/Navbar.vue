<template>
<div class="navbar-wrap">
<div class="navbar">
  <div class="title">
    <h1>.Balada.</h1>
  </div>
  <div class="search">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search biycle" aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-primary" type="button">Search</button>
      </div>
    </div>
  </div>
  <div class="basket">
    <i class="fas fa-shopping-basket"></i>
  </div>
  <div class="user-form">
    <!-- <div class="login">

    </div> -->
    <div class="notLogin">
      <button type="button" class="btn btn-outline-primary">Login</button>
      <button type="button" class="btn btn-primary">Register</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>

  .navbar-wrap {
    position: fixed;
    z-index: 9999;
    width: 100%;
  }
  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 64px;
    background: #120136;
  }

  .title h1 {
    font-family: 'Merienda', cursive;
    color: white;
    font-size: 24px;
  }

  .basket .fa-shopping-basket {
    color: white;
    width: 32px;
    height: 32px;
    margin-top: -5px;
  }
  .notLogin button {
    margin-right: 10px;
  }

  .notLogin {
    margin-top: -10px;
  }

  .search {
    width: 60%;
    margin-top: 5px;
  }
</style>
