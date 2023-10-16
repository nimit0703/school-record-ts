import './assets/main.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

// Import CSS files
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


// import lodash-es
import _ from 'lodash-es';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  el: '#app', // Specify the element where your Vue app will be mounted
  router,
  store,
  render: (h) => h(App),
});
