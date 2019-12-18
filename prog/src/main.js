import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from "./index/index";
import global from './components/global.js';
import axios from 'axios'
import qs from 'qs';

Vue.use(ElementUI);

Vue.prototype.$axios = axios
Vue.prototype.$qs=qs;
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

Vue.prototype.$global = global;
new Vue({
  render: h => h(App),
  router,
  created () {
    this.$axios.defaults.baseURL='http://47.103.212.224:8080/'
   
  },
}).$mount('#app');
