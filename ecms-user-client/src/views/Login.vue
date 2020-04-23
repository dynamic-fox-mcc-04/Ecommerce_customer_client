<template>
    <div id="Login">
        <div id="LoginForm">
            <h1>Login</h1>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                id="input-1"
                v-model="form.Email"
                type="email"
                required
                placeholder="Enter Email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                <b-form-input
                id="input-2"
                type="password"
                v-model="form.Password"
                required
                placeholder="Enter Password"
                ></b-form-input>
            </b-form-group>
            <div id="button">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button variant="info">Cancel</b-button>
            </div>
            </b-form>
        </div>
    </div>
</template>

<script>
import io from '../components/socket'
export default {
  name: 'LoginForm',
  data () {
    return {
      form: {
        Email: '',
        Password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const payload = this.form
      this.$Progress.start()
      this.$store.dispatch('Login', payload)
        .then(result => {
          this.$Progress.finish()
          this.$toasted.success('Login Success')
          localStorage.setItem('access_token', result.data.access_token)
          this.$router.push('/')
          this.$store.commit('SET_ISLOGIN', true)
          io.emit('login')
        })
        .catch(err => {
          console.log(err)
          this.$Progress.finish()
          this.$toasted.error('Login Failed')
          this.form.Email = ''
          this.form.Password = ''
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.Email = ''
      this.form.Password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  created () {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken == null) {
    } else {
      this.$router.push('/')
    }
  }

}
</script>

<style>
#LoginForm{
    width: 40vw;
}
#Login{
    margin-left: 30vw;
    margin-top: 20vh;
}
#button{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 15vw;
    margin-left: 12vw;
}
</style>
