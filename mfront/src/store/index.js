import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import router from '../router'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stateSearch: false,
        rutaActual: "",
        user: null,
        auth: false,
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
        },
        SET_USER(state, user) {
            state.user = user;
            state.auth = Boolean(user);
        }
    },
    actions: {
        setruta({ commit }, nuevaRuta) {
            commit("SET_RUTAACTUAL", nuevaRuta);
        },
        async login({ dispatch }, credentials) {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/login", credentials);
            await dispatch("getUser");
            await dispatch("goToDashboad");
        },
        async logout({ dispatch }) {
            await axios.post("/logout");
            return dispatch("getUser");
        },
        async getUser({ commit }) {
            await axios.get("/api/user")
                .then((res) => {
                    commit('SET_USER', res.data);
                })
                .catch(() => {
                    commit('SET_USER', null);
                });
        },
        goToDashboad() {
            router.push("dashBoardAdmin");
        }
    },
    modules: {
    },
    getters: {
        rutaActual: (state) => {
            return state.rutaActual
        },
    },


})
