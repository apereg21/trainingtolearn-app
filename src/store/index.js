import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idUser: "",
        roleUser: ""
    },
    mutations: {
        SET_IDUSER: (state, idUser) => {
            state.idUser = idUser
        },
        SET_ROLE: (state, roleUser) => {
            state.roleUser = roleUser
        }
    },
    actions: {},
    modules: {}
})