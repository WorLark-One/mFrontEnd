import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Raphael from "raphael/raphael";
//import * as $ from "jquery";
global.Raphael = Raphael;
global.jQuery = require('jquery');
Vue.config.productionTip = false

store.dispatch("getUser");


new Vue({
    router,
    store,
    vuetify,

    render: h => h(App)
}).$mount('#app')
