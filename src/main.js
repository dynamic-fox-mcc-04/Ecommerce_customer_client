import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCurrencyFilter from 'vue-currency-filter'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  duration: 9000,
  position: 'top-right',
  action: {
    text: 'Okay',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})
Vue.use(Loading)
Vue.use(VueCurrencyFilter,
  {
    symbol: 'Rp',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
