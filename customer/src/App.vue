<template>
  <div id="app">
    <div id="nav" >
      <nav class="navbar navbar-expand-sm bg-light navbar-light ">
        <div class="container1">
          <div class="item">
            <router-link to="/">Home</router-link>
          </div>
          <div class="item">
            <b-button v-b-modal.modal-prevent-closing>Login</b-button>
          </div>
        </div>
      </nav>
    </div>
    <div>
    <!-- <div class="mt-3">
      Login
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="(name,idx) in submittedNames" :key="idx">{{ name }}</li>
      </ul>
    </div> -->

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="LOGIN"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="emailState"
          label="email"
          label-for="email"
          invalid-feedback="email is required"
        >
          <b-form-input
            id="email"
            v-model="email"
            :state="emailState"
            required
          ></b-form-input>
          </b-form-group>

          <b-form-group
          :state="passwordState"
          label="password"
          label-for="password"
          invalid-feedback="password is required"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="password"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>

    <router-view/>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      emailState: null,
      password: '',
      passwordState: null,
      submittedNames: []
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.emailState = valid
      this.passwordState = valid
      return valid
    },
    resetModal () {
      this.email = ''
      this.password = ''
      this.emailState = null
      this.passwordState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      axios({
        method: 'post',
        url: 'http://localhost:3000/customer/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          console.log('>>>', result.data)
        })
        .catch(err => {
          console.log(err)
        })
      this.submittedNames.push(this.email)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
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
.container1 {
  width: 100vw;
  display: flex;
  justify-content: space-between;
}
.item {
  color: #42b983;
}
</style>
