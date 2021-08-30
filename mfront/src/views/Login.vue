<template>
  <div class="fdo">
    <v-container class="mt-6">
      <v-snackbar
        top
        right
        color="danger"
        timeout="-1"
        v-model="$store.state.alertaLogin"
      >
        <font-awesome-icon icon="exclamation-circle" size="1x" />&nbsp; Las
        credenciales no son válidas
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            small
            icon
            v-bind="attrs"
            @click="alertaLoginQuitar"
          >
            <font-awesome-icon icon="times" size="1x" />
          </v-btn>
        </template>
      </v-snackbar>
      <v-row align="center" justify="center" style="height: 92vh">
        <v-col cols="12" sm="12" md="8">
          <v-card class="primary" elevation="0" style="height: 92vh">
            <v-card-title class="justify-center">
              <a href="/" class="white--text" style="text-decoration: none">
                <v-row>
                  <font-awesome-icon icon="shopping-basket" size="4x" />&nbsp;
                  <h1 class="ml-2 pt-5 medtitt">KMaule</h1>
                </v-row>
              </a>
            </v-card-title>
            <v-img
              height="70%"
              contain
              class="mt-2"
              src="@/assets/pngwing.com.png"
            ></v-img>
            <v-card-subtitle class="text-center white--text">
              <p class="mt-2 medtitt3">
                Tú solución para encontrar productos locales
              </p>
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="">
          <v-card class="white" elevation="0">
            <v-card-title class="justify-center">
              <h1 class="mb-4 mt-6 medtitt2">Inicio de sesión</h1>
            </v-card-title>
            <v-card-subtitle class="text-center">
              Ingrese sus credenciales para continuar
            </v-card-subtitle>

            <v-form class="mx-6 mt-2 pt-4" @submit.prevent="login(form)">
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
                required
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-btn color="cbtn" dark large rounded block type="submit">
                Continuar
              </v-btn>
            </v-form>
            <v-card-actions>
              <v-card-subtitle>
                ¿Aún no tienes una cuenta?
                <a
                  href="/#/register"
                  class="blue--text ml-1"
                  style="text-decoration: none"
                >
                  Registrarse</a
                >
              </v-card-subtitle>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import axios from "axios";
//axios.defaults.withCredentials = true;
//axios.defaults.baseURL = "http://localhost:8000/";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    //user: {},
    //userAuth: {},
    show1: false,
    form: {
      email: "felipe.milla.calquin@gmail.com",
      password: "1234567890",
    },
  }),
  computed: {
    ...mapState(["auth", "user"]),
  },
  beforeCreate() {
    this.$store.dispatch("quitarLayout");
    if (this.$store.state.auth == true) {
      this.$router.push("/");
    }
  },

  methods: {
    ...mapActions(["login", "alertaLoginQuitar"]),
    //alertaLoginAux() {
    //var aux = false;
    //this.alertaLogin(aux);
    //this.$store.dispatch("alertaLogin", aux);
    //},
    //logout() {
    //axios.post("/logout").then(() => {
    //this.userAuth = {};
    //});
    //},
    //async login2() {
    //this.$store.dispatch("login", this.form);
    //},
  },
};
</script>

<style scoped>
.fdo {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  vertical-align: baseline;
  background: #007bff;
}
.medtitt {
  font-size: 1.9em;
  color: #ffffff;
  font-family: montserrat;
  line-height: 1.3;
}

.medtitt2 {
  font-size: 1.3em;
  color: #3d3d3d;
  font-family: montserrat;
  line-height: 1.3;
}

.medtitt3 {
  font-size: 1.3em;
  color: #ffffff;
  font-family: montserrat;
  line-height: 1.3;
}
</style>