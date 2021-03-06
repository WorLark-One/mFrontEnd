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
        userId: -1,
        userName: "",
        userEmail: "",
        userRol: "",
        userCreacion: "",
        auth: false,
        rolUser: null,
        newUser: "cliente",
        layout: true,
        alertaLogin: false,
        alertaRegister: false,
        navUsuario: false,
        comunas: [],
        productosCarrito: [],
        productosCarritoFinal: [],
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
            state.userName = user != null ? user.user.name : "";
            state.userEmail = user != null ? user.user.email : "";
            state.userRol = user != null ? user.roles[0] : "";
            state.userCreacion = user != null ? user.user.created_at : "";
            state.userId = user != null ? user.user.id : -1;
        },
        SET_CARRITO_FINAL(state, result) {
            state.productosCarritoFinal = result != null ? result.data : [];
        },
        SET_LAYOUT(state, value) {
            state.layout = value;
        },
        SET_NAVUSER(state, value) {
            state.navUsuario = value;
        },
        SET_ALERTALOGIN(state, value) {
            state.alertaLogin = value;
        },
        SET_ALERTAREGISTER(state, value) {
            state.alertaRegister = value;
        },
        SET_COMUNAS(state, value) {
            let aux = {
                created_at: "",
                id: -1,
                nombre: "Todas",
                nombre_region: "",
                region_id: -1,
                updated_at: "",
            }
            state.comunas = [aux];
            for (const iterator of value) {
                state.comunas = [...state.comunas, iterator];
            }
        },
        SET_CARRITO(state, producto) {
            var flag = false;
            for (let index = 0; index < state.productosCarrito.length; index++) {
                const element = state.productosCarrito[index];
                if (element.producto.id == producto.id) {
                    flag = true;
                    state.productosCarrito[index].cantidad += 1;
                }
            }
            if (!flag) {
                let p = {
                    producto: producto,
                    cantidad: 1,
                };
                state.productosCarrito = (state.productosCarrito.length > 0) ? [...state.productosCarrito, p] : [p];
            }
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
                    commit('SET_USER', res.data);
                    let id = res.data.user.id;
                    axios.get('/api/private/getCartUsuario/' + id)
                        .then((result) => {
                            commit('SET_CARRITO_FINAL', result.data);
                        })
                        .catch((error) => {
                            console.log(error);
                            commit('SET_CARRITO_FINAL', null);
                        });
                })
                .catch(() => {
                    commit('SET_USER', null);
                });
        },
        async obtenerComunas({ commit }) {
            await axios
                .get("/api/public/getComunasPublic")
                .then((result) => {
                    console.log(result.data.data);
                    commit('SET_COMUNAS', result.data.data);
                })
                .catch((error) => {
                    console.log(error);
                    commit('SET_COMUNAS', []);
                });
        },
        async obtenerCarrito({ commit }, state) {
            await axios.get(`/api/private/getCartUsuario/${state.userId}}`)
                .then((result) => {
                    commit('SET_CARRITO_FINAL', result.data);
                })
                .catch((error) => {
                    console.log(error);
                    commit('SET_CARRITO_FINAL', null);
                });
        },
        async postProductoCarrito({ commit }, request) {
            let id = request.usuario_id;
            await axios.post('/api/private/postProductoCart', request)
                .then(() => {
                    axios.get('/api/private/getCartUsuario/' + id)
                        .then((result) => {
                            commit('SET_CARRITO_FINAL', result.data);
                        })
                        .catch((error) => {
                            console.log(error);
                            commit('SET_CARRITO_FINAL', null);
                        });
                })
                .catch((error) => {
                    console.log(error);
                    commit('SET_CARRITO_FINAL', null);
                });

        },
        async deleteProductCarrito({ commit }, request) {
            let idProducto = request.producto_id;
            let idUsuario = request.usuario_id;
            await axios.delete('/api/private/deleteProductoCart/' + idProducto + '/' + idUsuario)
                .then(() => {
                    axios.get('/api/private/getCartUsuario/' + idUsuario)
                        .then((result) => {
                            commit('SET_CARRITO_FINAL', result.data);
                        })
                        .catch((error) => {
                            console.log(error);
                            commit('SET_CARRITO_FINAL', null);
                        });
                })
                .catch((error) => {
                    console.log(error);
                    commit('SET_CARRITO_FINAL', null);
                });
        },
        async deleteProductCarritoRaiz({ commit }, request) {
            let idProducto = request.producto_id;
            let idUsuario = request.usuario_id;
            await axios.delete('/api/private/deleteProductoCartRaiz/' + idProducto + '/' + idUsuario)
                .then(() => {
                    axios.get('/api/private/getCartUsuario/' + idUsuario)
                        .then((result) => {
                            commit('SET_CARRITO_FINAL', result.data);
                        })
                        .catch((error) => {
                            console.log(error);
                            commit('SET_CARRITO_FINAL', null);
                        });
                })
                .catch((error) => {
                    console.log(error);
                    commit('SET_CARRITO_FINAL', null);
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
        navUsuarioDesactivada() {
            this.commit('SET_NAVUSER', false);
        },
        navUsuarioActiva() {
            this.commit('SET_NAVUSER', true);
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
        agregarProducto({ commit }, producto) {
            commit("SET_CARRITO", producto);
        },

    },
    modules: {
    },
    getters: {
        rutaActual: (state) => {
            return state.rutaActual
        },
    },

    methods: {

    },



})
