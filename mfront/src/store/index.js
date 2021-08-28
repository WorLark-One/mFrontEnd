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
        newUser: "cliente",
        layout: true,
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
        },
        SET_LAYOUT(state, value) {
            state.layout = value;
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
            await dispatch("goToHome");
        },
        async logout({ dispatch }) {
            await axios.post("/logout");
            await dispatch("getUser");
            await dispatch("goToHome");
        },
        async register({ dispatch }, re) {
            var flag = false;
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/api/public/registerUser", re)
                .then(() => {
                    flag = true;
                    //console.log(res.data);
                    //dispatch("getUser");
                })
                .catch((ex) => {
                    //dispatch("getUser");
                    console.log(ex);
                    flag = false;
                });
            if (flag) {
                let credentials = {
                    email: re.email,
                    password: re.password
                }

                await axios.post("/login", credentials);
                await dispatch("getUser");
                await dispatch("goToHome");
            }


        },
        async getUser({ commit }) {
            await axios.get("/api/user")
                .then((res) => {
                    console.log(res.data);
                    //await axios.get
                    commit('SET_USER', res.data);
                })
                .catch(() => {
                    commit('SET_USER', null);
                });
        },
        goToDashboad() {
            router.push("dashBoardAdmin");
        },
        goToHome() {
            router.push("/");
        },
        quitarLayout() {
            this.commit('SET_LAYOUT', false);
        },
        colocarLayout() {
            this.commit('SET_LAYOUT', true);
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
