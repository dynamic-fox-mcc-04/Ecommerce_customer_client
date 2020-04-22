<template>
  <nav class="navbar navbar-expand-lg fixed-top d-flex">
    <a class="navbar-brand d-flex justify-content-center"><img src="../assets/img/camera-logo.png" alt="camera-logo">Focusbelantara</a>
    <button class="mbl-btn navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="my-navbar navbar-nav">
            <li class="nav-item active">
                <router-link to="/" class="nav-link my-nav-btn"> Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
                <router-link to="/catalog" class="nav-link my-nav-btn"> Catalog <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
                <router-link to="/login" class="nav-link my-nav-btn"> Login <span class="sr-only">(current)</span></router-link>
            </li>
        </ul>
    </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    Logout: function () {
      this.$vToastify.prompt({
        body: 'Are you sure want to Logout?',
        answers: { Yes: true, No: false }
      })
        .then(value => {
          if (value) {
            this.$toasted.show('Thank you for your comming, hope you enjoy shopped to our store', {
              duration: 4000
            })
            this.$router.push('/')
            localStorage.clear()
          }
        })
    }
  }
}
</script>

<style lang="scss">
.navbar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.25);
  color: rgb(0, 0, 0);
  position: fixed;
  z-index: 2;
}
.my-nav-btn {
  margin: 0 10px 0 0;
  text-decoration: none;
  cursor: pointer;
  transition: .3s;
  &:hover {
    color: rgba($color: #000000, $alpha: 1.0);
    transform: scale(1.1);
  }
}
.shopping-bag {
    position: relative;
}
.shopping-bag i {
  font-size: 30px;
  cursor: pointer;
}
.shopping-bag .badge {
  border-radius: 50%;
  height: 18px;
  width: 18px;
  position: absolute;
  transform: translate(0, -10px);
  top: 12px;
  right: 5px;
  transform: translate(0, -10px);
}
.bxs-cart {
  transition: .3s;
  cursor: pointer;
  &:hover {
    color: rgba($color: #000000, $alpha: 1.0);
    transform: scale(1.2);
  }
}
.my-navbar a {
  color: #000000;
}
.my-navbar a:hover {
  color: #f7a800;
}
.navbar .navbar-brand {
  cursor: pointer;
  font-style: large bold;
  font-weight: 100;
}
.navbar-brand img {
  height: 2rem;
  margin-right: 10px;
  padding-bottom: 5px;
}
</style>