import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";


//引入全局组件
import './icons';
//高德地图
import "./plugins/aMap";


import './router/premit'

Vue.config.productionTip = false;

//runtime模式(运行时)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
