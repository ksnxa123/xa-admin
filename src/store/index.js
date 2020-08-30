import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from './modules/app'
import common from './modules/common'
import infoDetail from './modules/infoDetail'
import login from './modules/login'
import permission from './modules/permission'

export default new Vuex.Store({
  modules:{
    app,
    common,
    infoDetail,
    login,
    permission
  }
})