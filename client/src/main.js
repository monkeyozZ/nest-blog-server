import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/* mdnice */
// eslint-disable-next-line no-irregular-whitespace
import { VuePlugin } from 'vuera'
import '@/styles/index.scss' // global css

import '@/filters'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
/* Vue.use(ElementUI, { locale }) */
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VuePlugin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
