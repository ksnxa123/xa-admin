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
  //停车场
  {
    path: "/park",
    name: "Park",
    meta:{
      name:"停车场",
      icon:'backcontrol'
    },
    component: Layout,
    children:[{
      path:'/parkIndex',
      name:'ParkIndex',
      meta:{
        name:"停车场列表"
      },
      component:()=>import('../views/Parking/index')
    },
    {
      path:'/parkAdd',
      name:'ParkAdd',
      meta:{
        name:"新增停车场"
      },
      component:()=>import('../views/Parking/add')
    }]
  },

  // 车辆品牌
  {
    path: "/brand",
    name: "Brand",
    meta:{
      name:"车辆品牌",
      icon:'backcontrol'
    },
    component: Layout,
    children:[{
      path:'/carsBrand',
      name:'CarsBrand',
      meta:{
        name:"品牌列表"
      },
      component:()=>import('../views/carsBrand/index')
    }]
  },

  //车辆管理
  {
    path: "/cars",
    name: "Cars",
    meta:{
      name:"车辆管理",
      icon:'backcontrol'
    },
    component: Layout,
    children:[
      {
        path:'/carsIndex',
        name:'CarsIndex',
        meta:{
          name:"车辆属性"
        },
        component:()=>import('../views/Cars/attrList.vue')
      },
      {
        path:'/carsAdd',
        name:'CarsAdd',
        meta:{
          name:"新增车辆"
        },
        component:()=>import('../views/Cars/add.vue')
      },
      {
        path:'/carsList',
        name:'CarsList',
        meta:{
          name:"车辆列表"
        },
        component:()=>import('../views/Cars/index.vue')
      },
    ]
  },
  // 销售管理
  {
    path: "/sale",
    name: "Sale",
    meta: {
      name: "销售管理",
      icon:'backcontrol'
    },
    component: Layout,
    children: [
      {
        path: "/leaseList",
        name: "LeaseList",
        meta: {
          name: "租车类型"
        },
        component: () => import("../views/Sale/leaseList.vue"),
      }
    ]
  },
  // 会员管理
  {
    path: "/member",
    name: "Member",
    meta: {
      name: "会员管理",
      icon:'backcontrol',
      iconClass: "icon_console"
    },
    component: Layout,
    children: [
      {
        path: "/memberList",
        name: "MemberList",
        meta: {
          name: "会员列表",
          icon:'backcontrol',
        },
        component: () => import("../views/Member/index.vue"),
      },
      {
        path: "/memberInfo",
        name: "MemberInfo",
        hidden: true,
        meta: {
          name: "会员编辑"
        },
        component: () => import("../views/Member/memberInfo.vue"),
      },
      {
        path: "/memberDetailed",
        name: "MemberDetailed",
        hidden: true,
        meta: {
          name: "会员详情"
        },
        component: () => import("../views/Member/detailed.vue"),
      }
    ]
  },
  // 订单管理
  {
    path: "/order",
    name: "Order",
    meta: {
      name: "订单管理",
      icon:'backcontrol',
    },
    component: Layout,
    children: [
      {
        path: "/orderList",
        name: "OrderList",
        meta: {
          name: "订单列表"
        },
        component: () => import("../views/Order/index.vue"),
      }
    ]
  },
]

export default new Router({
  mode: 'hash',
  routes
});

