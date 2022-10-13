import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as echarts from 'echarts'
import HighchartsVue from 'highcharts-vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import 'iview-mpvue/dist/components/grid/style/css'
import 'iview-mpvue/dist/components/grid-item/style/css'
import 'iview-mpvue/dist/components/grid-icon/style/css'
import 'iview-mpvue/dist/components/grid-label/style/css'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false
// 配置请求的根路径
// axios.defaults.baseURL = 'http://localhost:5000/'
// axios.defaults.baseURL = 'http://192.168.190.15:5000/'
// 注册axios，每一个组件都可以直接用vue来访问到
// Vue.prototype.$http = axios

axios.interceptors.request.use(config => {
  // console.log(config)
  // 在请求头中绑定token
  // config.headers.Authorization = window.sessionStorage.getItem('token')
  config.headers.token = window.sessionStorage.getItem('token')
  // 必须return config
  return config
});

// //响应
// axios.interceptors.response.use(function (resp){
//   console.log("响应参数信息：",resp);
//   return resp;
// },error=>{
//   console.log("返回错误：",error);
//   return Promise.reject(error);
// })


Vue.prototype.$axios = axios;

// Vue.component('tree-table', TreeTable)
Vue.prototype.$echarts = echarts

// Vue.use(vue3dLoader)

Vue.use(iView);
Vue.use(HighchartsVue);
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
