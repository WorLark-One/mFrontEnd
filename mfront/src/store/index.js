import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stateSearch: false,
        rutaActual: "",
    },
    mutations: {
        stateTrueAppBarSearch(state) {
            state.stateSearch = true;
        },
        stateFalseAppBarSearch(state) {
            state.stateSearch = false;
        },
        SET_RUTAACTUAL(state, nuevaRuta) {
            state.rutaActual = nuevaRuta;
        }
    },
    actions: {
        setruta({ commit }, nuevaRuta) {
            commit("SET_RUTAACTUAL", nuevaRuta);
        },
    },
    modules: {
    },
    getters: {
        rutaActual: (state) => {
            return state.rutaActual
        },
    },

})
