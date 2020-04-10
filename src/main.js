// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'normalize.css'
import './assets/css/common.css'
import 'babel-polyfill'
import {$get,$post} from './api/index'
import BASE_URL from './api/index'
import VueClipboard from 'vue-clipboard2'
import VueCookies from 'vue-cookies'
import 'jquery'
import 'vue2-animate/dist/vue2-animate.min.css'


 
// import ECharts from 'vue-echarts'


Vue.use(VueCookies)
Vue.use(VueClipboard)

Vue.prototype.$get = $get
Vue.prototype.$post = $post
Vue.prototype.BASE_URL = BASE_URL
Vue.config.productionTip = false
// Vue.component('v-chart', ECharts)

  
Vue.use(ElementUI);



router.beforeEach(function (to, from, next) {
  console.log(to);
  
  if (to.meta.needLogin) {   
    //页面是否登录
    if (VueCookies.get('userInfo')) {
      
      //本地存储中是否有token(uid)数据  
      store.commit('userInfo', VueCookies.get('userInfo'))
      store.commit('userData', VueCookies.get('userData'))
       let {
         personnelType,
         personnelStatus,
         orgType,
         orgCode
       } = store.state.userData   
       if (!orgCode) { //如果登录了，但是没有注册机构则强制跳转注册机构
         if (to.meta.isNotReg) {
           next();
           return
         }
         next({
           name: "agency"
         })
         return
       }
       
       if (personnelStatus === 'TO' || personnelStatus === 'NO') {
         next({
           name: "applystatus"
         })
       } else {
         next();
       }
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        name: "login"
      });
    }
  } else {    
    //表示不需要登录
    next()
     //继续往后走
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

