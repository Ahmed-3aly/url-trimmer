import '@fortawesome/fontawesome-free/css/all.min.css';
import Vue from 'vue';
import App from './App.vue';
import { router } from './components';
import { Store } from './state';

Vue.config.productionTip = false;

Store.reset();
Vue.prototype.$store = Store;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
