import { Login ,Logout} from "@/api/login";
import { setToken, setUsername, getUsername, removeToken, removeUsername } from "@/utils/app";


const state = {
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse'))||false,
    token: '',
    username: ''||getUsername()
}

const getters = {
}

const mutations = {
    SET_NAV(state){
        state.isCollapse = !state.isCollapse
        //h5本地存储
        sessionStorage.setItem('isCollapse',String(state.isCollapse))
    },
    SET_TOKEN(state, value){
        state.token = value
    },
    SET_USERNAME(state, value){
        state.username = value
    },
}

const actions = {
    login(content, repuestData) {
        return new Promise((resolve, reject) => {
            Login(repuestData).then((response) => {
                let data = response.data
                console.log(data)
                content.commit('SET_TOKEN', data.token);
                content.commit('SET_USERNAME', data.username);
                setToken(data.token);
                setUsername(data.username);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logoutAction({ commit }){
        return new Promise((resolve, reject) => {
                removeToken();
                removeUsername();
                commit('SET_TOKEN', '');
                commit('SET_USERNAME', '');
                resolve();
        })
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}