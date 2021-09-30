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
        rolUser: null,
        newUser: "cliente",
        layout: true,
        alertaLogin: false,
        alertaRegister: false,
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
            state.rolUser = user != null ? user.roles[0] : null;
        },
        SET_LAYOUT(state, value) {
            state.layout = value;
        },
        SET_ALERTALOGIN(state, value) {
            state.alertaLogin = value;
        },
        SET_ALERTAREGISTER(state, value) {
            state.alertaRegister = value;
        }
    },
    actions: {
        setruta({ commit }, nuevaRuta) {
            commit("SET_RUTAACTUAL", nuevaRuta);
        },
        async login({ dispatch }, credentials) {
            var flag = false;
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/login", credentials)
                .then(() => {
                    flag = true;
                })
                .catch(() => {
                    flag = false;
                });
            if (flag) {
                await dispatch("getUser");
                await dispatch("goToHome");
            } else {
                await dispatch("alertaLoginMostrar");
            }

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
            } else {
                await dispatch("alertaRegisterMostrar");
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
        },
        async alertaLoginMostrar() {
            await this.commit('SET_ALERTALOGIN', true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await this.commit('SET_ALERTALOGIN', false);
        },
        alertaLoginQuitar() {
            this.commit('SET_ALERTALOGIN', false);
        },
        async alertaRegisterMostrar() {
            await this.commit('SET_ALERTAREGISTER', true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await this.commit('SET_ALERTAREGISTER', false);
        },
        alertaRegisterQuitar() {
            this.commit('SET_ALERTAREGISTER', false);
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
