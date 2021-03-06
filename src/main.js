// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//入口文件
import Vue from 'vue'
import App from './App'
import router from './router'

//引入 饿了么UI 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入axios
// import axios from 'axios'
// Vue.prototype.axios = axios
//自己开发vue插件 axios
import MyHttpServer from '@/plugins/http.js'

import '@/assets/css/index.css'

Vue.config.productionTip = false
//使用vue插件
Vue.use(ElementUI)
Vue.use(MyHttpServer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
