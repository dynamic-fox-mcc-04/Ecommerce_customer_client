<template>
  <div id="signup-page">
    <div class="container">
      <div class="img">
        <img src="../assets/wcats.svg">
      </div>
      <div class="signup-container">
        <form id="signup-form" @submit.prevent="signup">
          <img class="avatar" src="../assets/avatar.svg">
          <div class="input-div zero">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div>
              <input
              v-model="name"
              id="signup-name"
              type="text"
              class="input"
              placeholder="Name"
              required
              >
            </div>
          </div>
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-at"></i>
            </div>
            <div>
              <input
              v-model="email"
              id="signup-email"
              type="text"
              class="input"
              placeholder="Email"
              required
              >
            </div>
          </div>
          <div class="input-div two">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div>
              <input
              v-model="password"
              id="signup-password"
              type="password"
              class="input"
              placeholder="Password"
              required
              >
            </div>
          </div>
          <div class="option">
            <p>Already have account? <router-link to="/signin" id="login-btn">Get In!</router-link></p>
          </div>
          <input type="submit" class="btn" value="signup">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupPAge',
  data: () => {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup: function () {
      const registerData = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signup', registerData)
        .then((result) => {
          localStorage.setItem('name', result.data.name)
          localStorage.setItem('email', result.data.email)
          localStorage.setItem('token', result.data.token)
          this.$toasted.show('Wellcome Purrends!', {
            duration: 3000
          })
          this.$router.push('/')
        })
        .catch(err => {
          this.$toasted.show(err.response.data.errors[0], {
            duration: 3000
          })
        })
    }
  }
}
</script>

<style scoped>
#signup-page .container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15rem;
  padding: 0 2rem;
  font-weight: 600;
}

.signup-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

#signup-form {
  width: 360px;
}

#signup-form h2 {
  font-size: 2.9rem;
  text-transform: uppercase;
  margin: 15px 0;
  font-weight: 600;
  color: #333;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.img img {
  width: 500px;
}

.avatar {
  width: 100px;
}

.input-div {
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.input-div .i i {
  color: #c65039;
}

.input-div.one {
  margin-top: 0;
}

.input-div.two {
  margin-bottom: 4px;
}

.i {
  display: flex;
  justify-content: center;
  align-items: center;
}

.i i {
  color: #d9d9d9;
}

.input-div>div {
  position: relative;
  height: 45px;
}

.input,
.form-control {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
}

.option {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: .3s;
}

.option a {
  color: #333;
}

.option a:hover {
  color: #c65039;
  text-decoration: none;
  cursor: pointer;
}

.btn {
  display: block;
  width: 100%;
  height: 50%;
  border-radius: 25px;
  margin: 1rem 0;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #a8a8a8, #919191, #a8a8a8);
  cursor: pointer;
  color: #fff;
  background-size: 200%;
  transition: .5s;
}

.btn:hover {
  background-position: right;
  color: #fff;
}

@media screen and (max-width: 1050px) {
  #signup-page .container {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  #signup-form{
    width: 290px;
  }

  #signup-page .container{
    justify-content: center;
  }

  .signup-container h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }
  .img img {
    width: 400px;
  }
}

@media screen and (max-width: 900px) {
  #signup-page .container {
    grid-template-columns: 1fr;
    justify-content: center;
  }
  .img {
    display: none;
  }
  .signup-container {
    justify-content: center;
  }
}
</style>
