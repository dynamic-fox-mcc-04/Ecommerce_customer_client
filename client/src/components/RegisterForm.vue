<template>
    <div class="register-from">
        <div class="register-wrap">
            <h1>Register</h1> <br>
            <form @submit.prevent="register">
                <h4>PERSONAL INFORMATION</h4>
                <input type="text" placeholder="First Name" class="form-control" v-model="data.fname" required>
                <input type="text" class="form-control" v-model="data.lname" placeholder="Last Name" required>
                <textarea type="text" placeholder="address" class="form-control" v-model="data.address" required> </textarea>
                <input type="text" class="form-control" v-model="data.phone" placeholder="Phone Number" required><br><br>

                <h4>LOGIN INFORMATION</h4>
                <input type="email" placeholder="ex. foo@mail.com" class="form-control" v-model="data.email" required>
                <input type="password" class="form-control" v-model="data.password" placeholder="password" required>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <div class="errors" v-if="errors">
                <div class="alert alert-danger" role="alert" v-for="error in errors" :key="error.id">
                    <li>{{error.message}}</li>
                </div>
            </div>
            <div class="errors" v-if="isSuccess">
                <div class="alert alert-success" role="alert">
                    <li>SUCCESS REGISTER</li>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterForm',
  data () {
    return {
      data: {
        email: '',
        password: '',
        fname: '',
        lname: '',
        phone: '',
        address: ''
      },
      errors: [],
      isSuccess: false
    }
  },
  methods: {
    ...mapActions(['registerCustomer']),
    register () {
      this.registerCustomer(this.data)
        .then(result => {
          this.errors = []
          this.isSuccess = true
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
          this.clear()
        })
        .catch(err => {
          this.errors = err.errors
          this.isSuccess = false
        })
    },
    clear () {
      this.data.fname = ''
      this.data.lname = ''
      this.data.address = ''
      this.data.phone = ''
      this.data.email = ''
      this.data.password = ''
    }
  }
}
</script>

<style>
    .register-from {
        height: 100%;
        width: 100%;
        background: whitesmoke;
        padding: 20px;
        margin-top: 40px;
    }

    .register-wrap {
        width: 40%;
        height: 100%;
        padding: 10px;
        border-radius: 10px;
        -webkit-box-shadow: -5px -11px 19px -8px rgba(0,0,0,0.53);
        -moz-box-shadow: -5px -11px 19px -8px rgba(0,0,0,0.53);
        box-shadow: -5px -11px 19px -8px rgba(0,0,0,0.53);
        margin-top: 20px;
        background: white;
        margin-left: 30%;

    }

    h1 {
        text-align: center;
    }
    form h4 {
        font-size: 16px;
    }

    .register-wrap form input {
        margin-top: 20px;
    }

    .register-wrap form textarea {
        margin-top: 20px;
    }

</style>
