import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login/Login'
import Register from '@/page/Login/Register'
import Forgot from '@/page/Login/Forgot'
import Agency from '@/page/Login/Agency'
import Apply from '@/page/Login/Apply'
import Sanitation from '@/page/Login/Sanitation'
import Food from '@/page/Login/Food'
import ApplyStatus from '@/page/Login/ApplyStatus'
import Index from '@/page/Home/Index'
import Home from '@/page/Home/Children/Home/Home'
import Shop from '@/page/Home/Children/Shop/Shop'
import My from '@/page/Home/Children/My/My'
import MyInfo from '@/page/Home/Children/My/Children/MyInfo'
import ChangeMobile from '@/page/Home/Children/My/Children/ChangeMobile'
import ChangePassword from '@/page/Home/Children/My/Children/ChangePassword'
import MemberManage from '@/page/Home/Children/My/Children/MemberManage'
import Kitchen from '@/page/Home/Children/Shop/Children/Kitchen'
import Record from '@/page/Home/Children/Shop/Children/Record'
import ShopInfo from '@/page/Home/Children/Shop/Children/ShopInfo'
import Device from '@/page/Home/Children/Shop/Children/Device'
import ShopDetail from '@/page/Home/Children/Shop/Children/ShopDetail'
import NotFound from '../components/404.vue'
Vue.use(Router)


//在使用Element UI 时点击同一个路由，控制台报错，但不影响使用
//解决方法如下：在引用vue - router的文件中添加一段代码
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'index',
      meta: {
        needLogin: true //需要加校检判断的路由
      },
    },
    {
      path: "/404",
      name: "notfound",
      component: NotFound
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect:'/index/home',
      meta: {
        needLogin: true //需要加校检判断的路由
      },
      children: [
        {
          path: 'shop',
          component: Shop,
          name:'shop',
          meta: {
            needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: 'shopdetail',
          component: ShopDetail,
          redirect:'/index/shopdetail/kitchen',
          name: 'shop',
          children: [{
              path: 'shopinfo',
              component: ShopInfo,
              name: 'shopinfo',
              meta: {
                needLogin: true //需要加校检判断的路由
              },
            },
            {
              path: 'record',
              component: Record,
              name: 'record',
              meta: {
                needLogin: true //需要加校检判断的路由
              },
            },
            {
              path: 'device',
              component: Device,
              name: 'device',
              meta: {
                needLogin: true //需要加校检判断的路由
              },
            },
            {
              path: 'kitchen',
              component: Kitchen,
              name: 'kitchen',
              meta: {
                needLogin: true //需要加校检判断的路由
              },
            },
          ]
        },
        {
          path: 'home',
          component: Home,
          name: 'home',
          meta: {
            needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: 'my',
          component: My,
          redirect:'/index/my/myinfo',
          name: 'my',
          meta: {
            needLogin: true //需要加校检判断的路由
          },
          children:[
            {
              path: 'myinfo',
              component: MyInfo,
              name: 'myinfo',
              meta: {
                needLogin: true //需要加校检判断的路由
              },
            },
            {
              path: 'membermanage',
              component: MemberManage,
              name: 'membermanage',
              meta: {
                needLogin: true //需要加校检判断的路由
              },
            },
            {
              path: 'changepassword',
              component: ChangePassword,
              name: 'changepassword',
              meta: {
                needLogin: true //需要加校检判断的路由
              },
            },
            {
              path: 'changemobile',
              component: ChangeMobile,
              name: 'changemobile',
              meta: {
                needLogin: true //需要加校检判断的路由
              },
            },
          ]
        },
      ]
    },
    // {
    //   path: '/shop',
    //   name: 'shop',
    //   component: Shop
    // }, 
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
   
    {
      path: '/food',
      name: 'food',
      component: Food,
      meta: {
        needLogin: true, //需要加校检判断的路由
        isNotReg: true
      },
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: Forgot,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/agency',
      name: 'agency',
      component: Agency,
      // meta: {
      //   needLogin: true //需要加校检判断的路由
      // },
    },
    {
      path: '/apply',
      name: 'apply',
      component: Apply,
      meta: {
        // needLogin: true, //需要加校检判断的路由
        isNotReg: true
      },
    },
    {
      path: '/sanitation',
      name: 'sanitation',
      component: Sanitation,
      meta: {
        // needLogin: true, //需要加校检判断的路由
        isNotReg:true
      },
    },
    {
      path: '/applystatus',
      name: 'applystatus',
      component: ApplyStatus,
      // meta: {
      //   needLogin: true //需要加校检判断的路由
      // },
    },
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404"
    }
  ],

})