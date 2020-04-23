<template>
<div class="row mt-4">
  <div class="col-md-3 col-xs-12 d-flex justify-content-center">
    <div id="sidebar" class="sidebar flex-column">
      <div class="title-left">
        <div class="icon d-flex">
          <!-- <h3 class="mb-2 pr-5">La Noire</h3> -->
          <a href="javascript:void(0);" @click="burger" style="display:none;">☰</a>
        </div>
        <h1 class="title-sidebar">Explore</h1>
      </div>
      <div class="item-left">
        <ul class="nav flex-column pt-3 topnav">
          <li></li>
          <li class="nav-item flex-column pt-3">
            <img src="../assets/sidebar/new.png" alt="">
            <span class="px-3" @click="categoryQuery = null">New In/All</span>
          </li>
          <li class="nav-item flex-column pt-3">
            <img src="../assets/sidebar/tshirt.png" alt="">
            <span class="px-3" @click="categoryQuery = 'cloat'">Cloathing</span>
          </li>
          <li class="nav-item flex-column pt-3">
            <img src="../assets/sidebar/pants.png" alt="">
            <span class="px-3" @click="categoryQuery = 'pants'">Pants</span>
          </li>
          <li class="nav-item flex-column pt-3">
            <img src="../assets/sidebar/shoe.png" alt="">
            <span class="px-3" @click="categoryQuery = 'shoes'">Shoes</span>
          </li>
          <li class="nav-item flex-column pt-3">
            <img src="../assets/sidebar/sunglasses.png" alt="">
            <span class="px-3" @click="categoryQuery = 'accessories'">Accessories</span>
          </li>
        </ul>
      </div>
      <div class="mt-5" v-if="isLogin">
        <span @click="logout" style="cursor: pointer">Log Out</span>
      </div>
    </div>
  </div>
  <div class="col-md-9 col-xs-12">
    <div class="mx-3">
      <!-- navbare here -->
      <nav class="navbar d-flex justify-content-between">
        <form class="form-inline">
          <div class="d-flex">
            <span class="icon-search"></span>
            <input class="form-control mr-sm-2" style="min-width:50vw !important;" type="search" placeholder="Search item name...." aria-label="Search" v-model="searchQuery">
          </div>
        </form>
        <div v-if="isLogin" class="d-flex dropdown">
          <button class="btn btn-success btn-sm dropdown-toggle" id="dropdownCart" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="../assets/sidebar/supermarket.png" alt="" width="24px!important">
            <span><b> Cart : </b>{{ cartList.length }}</span>
          </button>
          <div class="dropdown-menu dropdown-menu" aria-labelledby="dropdownCart">
            <div v-for="(cartData, index) in cartList" :key="index">
              <div class="dropdown-item-text text-nowrap text-left">
                <span class="badge badge-pill badge-success align-text-top mr-1">
                  {{cartData.qty}}
                </span>
                Rp.{{cartData.Product.price}}
                <b>{{cartData.Product.product_name}}</b>
                <button class="badge badge-danger border-0 mx-2" @click="deleteItem(cartData.id, cartData.qty)">-</button>
              </div>
            </div>
            <div style="float:right;">
              <button class="badge badge-pill badge-primary border-0 mx-4">Check Out</button>
            </div>
          </div>
          <div>
            <div ></div>
            <img class="profile mx-2" src="../assets/sidebar/img_avatar.png" alt="" style="max-width:32px!important;">
            <span>{{ user }}</span>
          </div>
        </div>
        <div v-else>
          <span class="btn-login" id="show-modal" @click="modalLogin = true" style="cursor: pointer">Login</span>
          ||
          <span class="btn-login" id="show-modal" @click="modalRegist = true" style="cursor: pointer">Register</span>
          <modal-login v-if="modalLogin" @close="modalLogin = false"></modal-login>
          <modal-regist v-if="modalRegist" @closeRegist="modalRegist = false"></modal-regist>
        </div>
      </nav>
    </div>
    <div>
      <div id="container-parent" class='container-fluid d-flex flex-wrap' >
        <!-- card here -->
        <card-product v-for="(item, index) in querySearch" :key="index"
          :data = item
        >
        </card-product>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Card from '../components/product/CardProduct'
import modal from '../components/login/login'
import regist from '../components/login/register'
const baseUrl = 'http://localhost:3000'
export default {
  data: function () {
    return {
      modalLogin: false,
      modalRegist: false,
      searchQuery: null,
      categoryQuery: null
    }
  },
  components: {
    'card-product': Card,
    'modal-login': modal,
    'modal-regist': regist
  },
  computed: {
    product: function (params) {
      return this.$store.state.product
    },
    cartList: function () {
      return this.$store.state.cart
    },
    querySearch: function () {
      if (this.categoryQuery) {
        const FilterByCategory = this.product.filter((item) => {
          return this.categoryQuery.toLowerCase() === item.Category.toLowerCase()
        })
        if (this.searchQuery) {
          return FilterByCategory.filter((item) => {
            return this.searchQuery.toLowerCase().split(' ').every(v => item.product_name.toLowerCase().includes(v))
          })
        } else {
          return FilterByCategory
        }
      } else {
        if (this.searchQuery) {
          return this.product.filter((item) => {
            return this.searchQuery.toLowerCase().split(' ').every(v => item.product_name.toLowerCase().includes(v))
          })
        } else {
          return this.product
        }
      }
    },
    isLogin: function () {
      return this.$store.state.isLogin
    },
    user: function () {
      const email = this.$store.state.user
      if (email.length > 10) {
        return email.substring(0, 9) + '...'
      } else {
        return email
      }
    }
  },
  methods: {
    burger: function () {
      document.getElementsByClassName('topnav')[0].classList.toggle('responsive')
    },
    logout: function () {
      localStorage.clear()
      this.$store.commit('SET_IsLogin', false)
      this.modalLogin = false
    },
    deleteItem: function (id, qty) {
      if (qty > 1) {
        axios({
          method: 'PATCH',
          url: baseUrl + '/customer/cart/' + id,
          data: {
            qty: qty - 1
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then((result) => {
            this.$store.dispatch('fetchCart')
          })
      } else {
        axios({
          method: 'DELETE',
          url: baseUrl + '/customer/cart/' + id,
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then((result) => {
            this.$store.dispatch('fetchCart')
          })
      }
    }
  },
  created: function () {
    this.$store.dispatch('fetchProduct')
    if (localStorage.access_token && localStorage.level) {
      this.$store.dispatch('fetchCart')
      this.$store.commit('SET_IsLogin', true)
    }
  }
}
</script>

<style>
body{
  overflow: hidden;
}
/* sidebar */
.profile{
  border-radius: 50%;
}

@media screen and (max-width:900px) {
  div.icon a{
    display: block!important;
  }
  div.icon a{
    float: right;
    display: inline-block;
  }
  ul.topnav li:not(:first-child) {display: none;}
  .title-sidebar{
    display: none;
  }
  #sidebar{
    display: flex;
    justify-content: space-evenly!important;
  }
}
ul.topnav li {float: left;}

@media screen and (max-width:900px) {
  ul.topnav.responsive {position: relative;}
  ul.topnav.responsive li.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  ul.topnav.responsive li {
    float: none;
    display: inline;
  }
  ul.topnav.responsive li a {
    display: block;
    text-align: left;
  }
}

li span {
  cursor: pointer;
}

/* right side bar */

input[type=search]{
  background-color: white !important;
  border: 0px !important;
}
input[type=search]:focus{
  box-shadow: inset 0 -1px 0 #ddd;
}
.icon-search::before{
  content: url('../assets/sidebar/search.png');
}

#container-parent{
  max-height: 90vh;
  overflow-y: scroll;
}

/* right side bar */

input[type=search]{
  background-color: white !important;
  border: 0px !important;
}
input[type=search]:focus{
  box-shadow: inset 0 -1px 0 #ddd;
}
.icon-search::before{
  content: url('../assets/sidebar/search.png');
}

#container-parent{
  max-height: 90vh;
  overflow-y: scroll;
}
</style>
