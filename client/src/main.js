import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToastr from 'vue-toastr'

Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
