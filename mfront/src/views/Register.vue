<template>
  <div class="fdo">
    <v-container class="mt-6">
      <v-snackbar
        top
        right
        color="danger"
        timeout="-1"
        v-model="$store.state.alertaRegister"
      >
        <font-awesome-icon icon="exclamation-circle" size="1x" />&nbsp; El
        correo ingresado ya se encuentra registrado
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            small
            icon
            v-bind="attrs"
            @click="alertaRegisterQuitar"
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
              <h1 class="mb-4 mt-6 medtitt2">Registro</h1>
            </v-card-title>
            <v-card-subtitle class="text-center">
              Completa los siguientes datos
            </v-card-subtitle>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="mx-6 mt-6"
              @submit.prevent="crearCuentaMethod()"
            >
              <v-text-field
                v-model="form2.name"
                label="Nombre de usuario"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="form2.email"
                label="Correo electrónico"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="form2.password"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                hint="Al menos 8 caracteres"
                :rules="passwordRules"
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
                  (v) => !!v || 'Confirmación de contraseña requerida',
                  (v) =>
                    v == this.form2.password ||
                    'Debe ser igual que la contraseña',
                ]"
                required
                @click:append="show3 = !show3"
              ></v-text-field>
              <v-btn color="cbtn" rounded dark large block type="submit">
                Registrarse
              </v-btn>
            </v-form>
            <v-card-actions>
              <v-card-subtitle>
                ¿Ya tienes una cuenta?
                <a
                  href="/#/Login"
                  class="blue--text ml-1"
                  style="text-decoration: none"
                >
                  Ingresar</a
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
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    //user: {},
    //userAuth: {},
    valid: true,
    show2: false,
    show3: false,
    form2: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      rol: "",
    },
    nameRules: [
      (v) => !!v || "Nombre es requerido",
      (v) => v.length <= 10 || "El nombre debe tener menos de 10 caracteres",
    ],
    emailRules: [
      (v) => !!v || "El correo electrónico es requerido",
      (v) => /.+@.+/.test(v) || "El correo electrónico debe ser válido",
    ],
    passwordRules: [
      (v) => !!v || "Contraseña es requerida",
      (v) => v.length >= 8 || "La contraseña debe tener al menos 8 caracteres",
      (v) =>
        v.length <= 16 || "La contraseña debe tener menos de 16 caracteres",
    ],
  }),
  beforeCreate() {
    this.$store.dispatch("quitarLayout");
    if (this.$store.state.auth == true) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(["auth", "user"]),
  },
  methods: {
    ...mapActions(["register", "alertaRegisterQuitar"]),
    async crearCuentaMethod() {
      if (this.form2.password == this.form2.passwordConfirm) {
        let newUser = {
          name: this.form2.name,
          email: this.form2.email,
          password: this.form2.password,
          rol: this.$store.state.newUser,
        };
        this.show2 = false;
        this.show3 = false;
        //this.$refs.form.validate();
        if (this.$refs.form.validate()) {
          this.valid = true;
          await this.register(newUser);
        } else {
          this.valid = false;
        }
      }
    },
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