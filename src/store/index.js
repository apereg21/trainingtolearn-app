import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idUser: ""
    },
    mutations: {
        SET_IDUSER: (state, idUser) => {
            state.idUser = idUser
        }
    },
    actions: {},
    modules: {}
})