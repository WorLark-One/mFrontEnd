<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      flat
      elevate-on-scroll
      color="primary"
      dark
      v-if="this.$store.state.layout"
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <v-toolbar-title>
        <a
          href="/"
          class="white--text"
          style="text-decoration: none; font-family: montserrat"
          ><font-awesome-icon
            icon="shopping-basket"
            size="2x"
            class="hidden-sm-and-down"
          />&nbsp; KMaule</a
        >
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="producto"
        flat
        solo-inverted
        hide-details
        label="Buscar producto"
        class="hidden-sm-and-down"
      />
      <v-select
        v-model="comuna"
        style="width: 25px"
        :items="items"
        label="Comuna"
        flat
        solo-inverted
        hide-details
        class="hidden-sm-and-down pl-2"
      ></v-select>
      <v-btn
        class="ml-1"
        color="hidden-sm-and-down cbtn"
        solo-inverted
        fab
        small
        elevation="0"
        @click="goToSearch()"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer />

      <v-menu
        open-on-click
        :close-on-content-click="false"
        bottom
        offset-y
        rounded
        :max-height="400"
        :min-width="300"
        :max-width="300"
        v-if="
          this.$store.state.auth == true &&
          this.$store.state.userRol != 'Cliente'
        "
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click.prevent="notificacionesLeidas()"
          >
            <v-badge
              :content="contadorNotificaciones"
              :value="contadorNotificaciones"
              color="green"
              overlap
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list color="white">
          <v-subheader><strong>Notificaciones</strong></v-subheader>
          <template v-for="(item, index) in itemss">
            <v-list-item v-if="itemss.length > 0" :key="index">
              <v-list-item-content>
                <v-list-item-title
                  ><a
                    @click="goToProduct(item.producto_id)"
                    style="text-decoration: none"
                    ><span style="font-size: 100%">{{
                      item.nombre_producto
                    }}</span></a
                  >
                </v-list-item-title>
                <v-list-item-subtitle class="mt-2"
                  >${{ formatPrecio(item.precio_producto) }}
                  <strong
                    class="ml-1 pl-1 pr-1 cbtn rounded"
                    style="
                      font-size: 0.9em;
                      color: #ffff;
                      font-family: montserrat;
                    "
                    >-{{ item.descuento_producto }}%
                  </strong>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                icon
                small
                text
                color="danger"
                @click.prevent="eliminarNotificacion(item.id)"
                >X</v-btn
              >
            </v-list-item>
            <v-divider
              v-if="itemss.length > 0"
              :key="index"
              class="mx-4"
            ></v-divider>
          </template>
          <template v-if="itemss.length == 0">
            <v-list-item :key="0">
              <v-list-item-content>
                <v-list-item-subtitle>
                  Usted no tiene notificaciones
                  disponibles.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-btn
        text
        elevation="0"
        :to="{ path: '/login' }"
        v-if="this.$store.state.auth == false"
      >
        <span>Iniciar sesión</span>
      </v-btn>
      <v-menu
        open-on-click
        bottom
        offset-y
        rounded
        v-if="
          this.$store.state.auth == true &&
          this.$store.state.userRol == 'cliente'
        "
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text elevation="0" v-bind="attrs" v-on="on">
            <span>{{ $store.state.userName }}</span>
            <v-icon class="pl-1">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item key="1" :to="{ path: '/userProfile' }">
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item key="2" :to="{ path: '/userList' }">
            <v-list-item-title>Mi Lista</v-list-item-title>
          </v-list-item>
          <v-list-item key="3" :to="{ path: '/userRatings' }">
            <v-list-item-title>Mis Valoraciones</v-list-item-title>
          </v-list-item>
          <v-list-item key="4" link @click="logout()">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        open-on-click
        bottom
        offset-y
        rounded
        v-if="
          this.$store.state.auth == true &&
          this.$store.state.userRol != 'cliente'
        "
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded text elevation="0" v-bind="attrs" v-on="on">
            <span>{{ $store.state.userName }}</span>
            <v-icon class="ml-1">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item key="2" link to="/dashboardAdmin">
            <v-list-item-title>Panel de control </v-list-item-title>
          </v-list-item>
          <v-list-item key="4" link @click="logout()">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!--<v-dialog
        v-model="dialog"
        width="500"
        :persistent="crearCuenta"
        v-if="this.$store.state.auth == false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded text elevation="0" v-bind="attrs" v-on="on">
            <span>Iniciar sesión</span>
            <v-icon class="ml-1">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title
            v-if="this.$store.state.auth == false && crearCuenta == false"
            class="text-h5 lighten-2"
          >
            Iniciar sesión en KMaule
          </v-card-title>
          <v-card-title
            v-if="this.$store.state.auth == false && crearCuenta == true"
            class="text-h5 lighten-2"
          >
            <v-btn
              icon
              class="mr-1"
              color="primary"
              @click="crearCuenta = false"
            >
              <font-awesome-icon icon="arrow-left" size="2x" />
            </v-btn>
            Crear cuenta en KMaule
          </v-card-title>
          <v-card-title
            v-if="this.$store.state.auth == true"
            class="text-h5 lighten-2"
          >
            Cerrar sesión en KMaule
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-form
            class="mx-6 mt-6"
            @submit.prevent="
              login(form);
              dialog = false;
            "
            v-if="this.$store.state.auth == false && crearCuenta == false"
          >
            <v-text-field
              v-model="form.email"
              label="Correo electrónico"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="At least 8 characters"
              required
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn color="secondary" large block type="submit">
              Iniciar sesión
            </v-btn>
          </v-form>
          <v-form
            class="mx-6 mt-6"
            @submit.prevent="crearCuentaMethod()"
            v-if="this.$store.state.auth == false && crearCuenta == true"
          >
            <v-text-field
              v-model="form2.name"
              label="Nombre de usuario"
              required
            ></v-text-field>
            <v-text-field
              v-model="form2.email"
              label="Correo electrónico"
              required
            ></v-text-field>
            <v-text-field
              v-model="form2.password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="Al menos 8 caracteres"
              required
              @click:append="show2 = !show2"
            ></v-text-field>
            <v-text-field
              v-model="form2.passwordConfirm"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show3 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirmar contraseña"
              hint="Al menos 8 caracteres"
              :rules="[
                (v) =>
                  v == this.form2.password ||
                  'Debe ser igual que la contraseña',
              ]"
              required
              @click:append="show3 = !show3"
            ></v-text-field>
            <v-btn color="secondary" large block type="submit">
              Crear Cuenta
            </v-btn>
          </v-form>
          <v-card-actions
            v-if="this.$store.state.auth == false && crearCuenta == true"
            class="mt-4 pb-4"
          >
          </v-card-actions>
          <v-card-actions
            v-if="this.$store.state.auth == false && crearCuenta == false"
            class="mt-4 pb-4"
          >
            <v-row>
              <v-col cols="12" align="center">
                <a>¿Olvidaste tu contraseña?</a>
              </v-col>
              <v-col cols="12" align="center">
                <v-divider></v-divider>
                <v-btn
                  class="mt-4"
                  color="primary"
                  small
                  @click="goToCrearCuenta"
                >
                  Crear una cuenta</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
          <div class="pt-6 pb-6 px-6" v-if="this.$store.state.auth == true">
            <v-btn color="secondary" block @click="dialog = false"
              >Logout</v-btn
            >
          </div>
        </v-card>
      </v-dialog>-->
    </v-app-bar>

    <!--<v-content
      id="1"
      v-if="
        this.$vuetify.breakpoint.smAndDown == true && this.$store.state.layout
      "
      :style="
        this.$vuetify.breakpoint.smAndDown == true ? 'margin-bottom: -56px' : ''
      "
      ><searchglobal
    /></v-content>-->
    <v-content id="2">
      <searchglobal
        v-if="
          this.$vuetify.breakpoint.smAndDown == true && this.$store.state.layout
        "
      />

      <router-view />
    </v-content>

    <v-footer :padless="true" v-if="this.$store.state.layout">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text class="white--text">
          <strong> Felipe Milla - {{ new Date().getFullYear() }} </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";
import searchglobal from "./Global/SearchGlobal.vue";
//import Echo from "laravel-echo";
import axios from "axios";
import Pusher from "pusher-js";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
//window.Pusher = require("pusher-js");
//Pusher.logToConsole = true;
export default {
  components: {
    searchglobal,
  },
  data() {
    return {
      notifyCount: 0,
      contadorNotificaciones: 0,
      notifications: [],
      crearCuenta: false,
      show1: false,
      show2: false,
      show3: false,
      dialog: false,
      itemss: [],
      items: [
        "Todas",
        "Cauquenes",
        "Chanco",
        "Pelluhue",
        "Curicó",
        "Haulañé",
        "Licantén",
        "Molina",
        "Rauco",
        "Romeral",
        "Sagrada Familia",
        "Teno",
        "Vichuquén",
        "Colbún",
        "Linares",
        "Longaví",
        "Parral",
        "Retiro",
        "San Javier",
        "Villa Alegre",
        "Yerbas Buenas",
        "Constitución",
        "Curepto",
        "Empedrado",
        "Maule",
        "Pelarco",
        "Pencahue",
        "Río Claro",
        "San Clemente",
        "San Rafael",
        "Talca",
      ],
      activeBtn: 0,
      comuna: "",
      producto: "",
      orientacion: "ASC",
      marketPlaces: "ComunidadC+marketmaule+MercadoLibre",
      rangoPrecios: "Todos",
      valoracionProductos: "0",
      pagina: 1,
      form: {
        email: "admin@styde.net",
        password: "secret",
      },
      form2: {
        name: "asd",
        email: "asd@gmail.com",
        password: "asdasdasd",
        passwordConfirm: "asdasdasd",
        rol: "",
      },
    };
  },
  async mounted() {
    /*window.Pusher = require("pusher-js");
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "0c40fe59ad95d8de38f8",
      cluster: "mt1",
      forceTLS: true,
    });
    window.Echo.channel("notificationUser").listen("hola", (e) => {
      console.log(e);
      //this.auxNotificacion(data);
    });*/
    await this.getUser();
    await this.fun();
    await this.obtenerNotificaciones();
  },
  created() {
    //this.getNotifications();
  },

  mutations: {},
  methods: {
    ...mapActions(["SET_RUTAACTUAL", "login", "logout", "register", "getUser"]),
    fun() {
      var pusher = new Pusher("0c40fe59ad95d8de38f8", {
        cluster: "mt1",
      });
      //console.log(pusher);
      var channel = pusher.subscribe("notificationUser");

      /*eslint no-undef: 0*/
      var aux = "App\\Events\\DescuentoUser";
      var handler = function (data) {
        this.auxNotificacion(data);
      };
      var context = this;
      channel.bind(aux, handler, context);
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}/search=${false}`);
    },
    formatPrecio(n) {
      n = n.toString();
      var flag = 0;
      while (flag == 0) {
        var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, "$1.$2$3");
        if (n == n2) {
          flag = 1;
        } else {
          n = n2;
        }
      }
      return n;
    },
    auxNotificacion(data) {
      if (this.$store.state.userId == data.user_id) {
        console.log("es el mismo usuario");
        this.obtenerNotificaciones();
      }
    },
    obtenerNotificaciones() {
      if (
        this.$store.state.auth == true &&
        this.$store.state.userRol == "cliente"
      ) {
        axios
          .get(`/api/private/getNotificationUser/${this.$store.state.userId}`)
          .then((result) => {
            console.log(result.data);
            this.itemss = result.data.data;
            this.contadorNotificaciones = result.data.count;
          })
          .catch((er) => {
            console.log(er);
          });
      }
    },
    async notificacionesLeidas() {
      if (this.contadorNotificaciones > 0) {
        await axios
          .put(`/api/private/markReadNotificacion/${this.$store.state.userId}`)
          .then((result) => {
            console.log(result.data);
            this.contadorNotificaciones = 0;
          })
          .catch((er) => {
            console.log(er);
          });
      }
    },

    async eliminarNotificacion(id) {
      await axios
        .delete(
          `/api/private/deleteNotificacion/${id}/${this.$store.state.userId}`
        )
        .then((result) => {
          console.log(result.data);
          this.contadorNotificaciones = 0;
        })
        .catch((er) => {
          console.log(er);
        });
      await this.obtenerNotificaciones();
    },

    goToCrearCuenta() {
      this.crearCuenta = true;
      this.form2 = {
        name: "asd",
        email: "asd@gmail.com",
        password: "asdasdasd",
        passwordConfirm: "asdasdasd",
        rol: "",
      };
      this.show2 = false;
      this.show3 = false;
    },
    async getNotifications() {
      await axios
        .get(`/api/private/getNotificationUser`)
        .then((result) => {
          console.log(result.data);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    async crearCuentaMethod() {
      if (this.form2.password == this.form2.passwordConfirm) {
        let newUser = {
          name: this.form2.name,
          email: this.form2.email,

          password: this.form2.password,

          rol: this.$store.state.newUser,
        };
        console.log(newUser);
        await this.register(newUser);
        this.dialog = false;
      } else {
        console.log("verificar");
        this.dialog = false;
      }
      this.resetCrearCuenta();
    },
    resetCrearCuenta() {
      this.crearCuenta = false;
      this.form2 = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        rol: "",
      };
      this.show2 = false;
      this.show3 = false;
    },
    goToSearch() {
      if (this.producto != "" && this.producto != undefined) {
        var consulta = "";
        this.producto = this.producto.replace(" ", "%");
        if (this.comuna != "" && this.comuna != undefined) {
          consulta =
            "p=" +
            this.producto +
            "&c=" +
            this.comuna +
            "&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlaces +
            "&rgp=" +
            this.rangoPrecios +
            "&val=" +
            this.valoracionProductos +
            "&pag=" +
            this.pagina;
        } else {
          consulta =
            "p=" +
            this.producto +
            "&c=Todas&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlaces +
            "&rgp=" +
            this.rangoPrecios +
            "&val=" +
            this.valoracionProductos +
            "&pag=" +
            this.pagina;
        }
        const ruta = {
          name: "Search",
          params: {
            consulta: consulta,
          },
        };
        this.$store.commit("SET_RUTAACTUAL", consulta);
        this.producto = "";
        this.comuna = "";
        this.orientacion = "ASC";
        this.$router.push(ruta);
      }
    },
  },
};
</script>

<style scoped>
</style>
