// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入axios库
import axios from 'axios'
//引入rem.js
import './assets/js/remScale'
//引入动画库
import 'animate.css'
//引入清除默认样式
import './assets/css/reset.css'
//引入swipe.js文件
import 'swiper/js/swiper.min'
//引入swiper.css文件
import 'swiper/css/swiper.min.css'
//引入图片懒加载插件
import VueLazyLoad from 'vue-lazyload'

//使用图片懒加载
Vue.use(VueLazyLoad,{
  loading:'../static/default.jpg'
})

//把axios挂载到vue实例上
Vue.prototype.http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
