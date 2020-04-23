<template>
<div class="register">
    <div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Register</h3>
			</div>
			<div class="card-body">
				<form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="username" v-model="reg.email">
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" class="form-control" placeholder="password" v-model="reg.password">
					</div>
					<br><br>
					<div class="form-group">
						<input type="submit" value="register" class="btn register_btn" @click.prevent="registerUser">
					</div>
				</form>
                    <div class="form-group">
						<button class="btn cancel_btn" @click.prevent="cancelRegister">Cancel</button>
					</div>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					have an account?<a href="#" @click.prevent="login">Login</a>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</template>

<script>
export default {
    name: 'register',
    data () {
        return {
            reg: {
                email: '',
                password: ''
            }
        }
    },
    methods :{
        cancelRegister () {
            this.$store.dispatch('cancelLogin')
        },
        registerUser() {
            let payload = {
                email: this.reg.email,
                password: this.reg.password
            }
            this.$store.dispatch('register',payload)
            .then((data)=>{
                localStorage.setItem('access_token',data.access_token)
                this.cancelRegister()
                this.$router.push('/redirect')
            })
        },
        login () {
            this.$store.dispatch('openLogin')
            if(this.$router.currentRoute.path !== '/'){
                this.$router.push('/')
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Numans');

.register{
position: fixed;
background: rgba(0, 0, 0, 0.6);
background-size: cover;
height: 100%;
width: 100%;
font-family: 'Numans', sans-serif;
z-index: 998;
margin-top: -180px;
}

.container{
height: 100%;
align-content: center;
}

.card{
height: 370px;
margin-top: auto;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.register_btn{
color: black;
background-color: #FFC312;
width: 100%;
}

.cancel_btn{
color: black;
background-color: rgb(255, 65, 18);
width: 100%;
}

.register_btn:hover, .cancel_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

.links a{
margin-left: 4px;
}
</style>