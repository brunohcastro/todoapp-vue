import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import PrettyCheckbox from 'pretty-checkbox-vue';

import App from './App.vue';
import store from './store';
import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(PrettyCheckbox);

if (process.env.VUE_APP_BASE_URL) {
  Axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/api`;
} else {
  Axios.defaults.baseURL = 'http://localhost:8080/api';
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
