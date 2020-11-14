import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from "./router/router"
import 'material-design-icons'
import vuetify from './plugins/vuetify';
import './assets/css/style.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
