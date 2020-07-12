import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* import locale from 'element-ui/lib/locale/lang/en' // lang i18n*/

/* mdnice */
import { VuePlugin } from 'vuera'


import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
/* Vue.use(ElementUI, { locale }) */
Vue.use(ElementUI)
Vue.use(VuePlugin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
