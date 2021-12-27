import Vue from 'vue';
import App from './components/App';
import store from './store';
import router from './router';
import ajax from './common/ajax';
import './common/config/elementUIComponents';

Vue.prototype.$ajax = ajax;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
