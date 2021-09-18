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
          ><font-awesome-icon icon="shopping-basket" size="2x" />&nbsp;
          KMaule</a
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
      <v-btn icon v-if="this.$store.state.auth == true">
        <v-badge content="1" color="green" overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn
        rounded
        text
        elevation="0"
        to="/login"
        v-if="this.$store.state.auth == false"
      >
        <span>Iniciar sesión</span>
        <v-icon class="ml-1">mdi-account-circle</v-icon>
      </v-btn>
      <v-menu
        open-on-hover
        bottom
        offset-y
        rounded
        v-if="
          this.$store.state.auth == true &&
          this.$store.state.user.roles[0] == 'cliente'
        "
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded text elevation="0" v-bind="attrs" v-on="on">
            <span>{{ $store.state.user.user.name }}</span>
            <v-icon class="ml-1">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item key="1" link>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item key="2" link @click="logout()">
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
        open-on-hover
        bottom
        offset-y
        rounded
        v-if="
          this.$store.state.auth == true &&
          this.$store.state.user.roles[0] != 'cliente'
        "
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded text elevation="0" v-bind="attrs" v-on="on">
            <span>{{ $store.state.user.user.name }}</span>
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

    <v-content>
      <router-view />
    </v-content>

    <v-footer :padless="true" v-if="this.$store.state.layout">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-home</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-email</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-calendar</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-delete</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      crearCuenta: false,
      show1: false,
      show2: false,
      show3: false,
      dialog: false,
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
      activeBtn: 1,
      comuna: "",
      producto: "",
      orientacion: "ASC",
      marketPlaces: "ComunidadC+marketmaule+MercadoLibre",
      rangoPrecios: "Todos",
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
  mutations: {},
  methods: {
    ...mapActions(["SET_RUTAACTUAL", "login", "logout", "register"]),
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
