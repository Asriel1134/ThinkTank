import Vue from 'vue'
import App from './App'
import store from './store/user'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$serverUrl = 'http://106.12.74.90:8081'
Vue.prototype.$store = store

const app = new Vue({
	store,
    ...App
})
app.$mount()