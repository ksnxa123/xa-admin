import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 引入布局组件
import Layout from '@/views/Layout'

export const routes = [
  {
    path: "/",
    redirect: "login",
    hidden:true,
    meta:{
      name:"主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    meta:{
      name:"登录"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/backcontrol",
    name: "Backcontrol",
    redirect: "index",
    meta:{
      name:"控制台",
      icon:'backcontrol'
    },
    component: Layout,
    children:[{
      path:'/index',
      name:'Index',
      meta:{
        name:"首页"
      },
      component:()=>import('../views/Backcontrol/index')
    }]
  },
  {
    path: "/info",
    name: "Info",
    meta:{
      name:"信息管理",
      icon:'news'
    },
    component: Layout,
    children:[
      {
      path:'/infoIndex',
      name:'InfoIndex',
      meta:{
        name:"信息列表"
      },
      component:()=>import('../views/Info/index')
      },
      {
        path:'/infoDif',
        name:'InfoDif',
        meta:{
          name:"信息分类"
        },
        component:()=>import('../views/Info/dif')
        }
    ]
  },
   /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      role: ['sale'],
      system: 'userSystem', // 自定义key
      name: "用户管理",
      icon: 'users'
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          keepAlive: true,
          role: ['sale'],
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  },
]

export default new Router({
  mode: 'hash',
  routes
});

