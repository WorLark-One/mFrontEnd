<template>
  <div>
    <v-snackbar
      absolute
      bottom
      right
      class="mb-4"
      :color="errorAlert == true ? 'danger' : 'cbtn'"
      timeout="5000"
      v-model="flagAlert"
    >
      <font-awesome-icon
        :icon="errorAlert == true ? 'exclamation-circle' : 'check-circle'"
        size="1x"
      />&nbsp;
      {{ textAlert }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          small
          icon
          v-bind="attrs"
          @click="flagAlert = false"
        >
          <font-awesome-icon icon="times" size="1x" />
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col cols="2" sm="1" md="3" lg="2"><adminNavigation /></v-col>
      <v-col cols="10" sm="11" md="9" lg="10">
        <div
          :class="this.$vuetify.breakpoint.smAndDown == true ? 'mr-4' : 'mr-14'"
        >
          <h1 class="mt-10 medtitt2">Notificaciones</h1>
          <v-divider class="primary mt-2 mb-5"></v-divider>
          <v-card elevation="3" class="mt-6 mb-6">
            <v-form
              ref="form"
              class="mx-5 py-5"
              v-model="valid"
              @submit.prevent="enviarNotificacion"
            >
              <v-text-field
                v-model="id_producto"
                label="ID Producto"
                type="number"
                :rules="idRules"
              ></v-text-field>
              <v-select
                v-model="descuento"
                :items="descuentos"
                item-text="porcentaje"
                item-value="value"
                label="Descuento %"
                :rules="selectRules"
              ></v-select>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="danger" text @click="reset()"> Reset </v-btn>
                <v-btn type="submit" :loading="loading" dark color="cbtn">
                  Enviar
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </div>
        <div class="mb-16"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import adminNavigation from "../components/Global/AdminNavigation.vue";
import axios from "axios";
import { mapActions } from "vuex";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default {
  components: {
    adminNavigation,
  },
  data: () => ({
    flagAlert: false,
    errorAlert: false,
    textAlert: "",
    valid: false,
    descuento: "",
    id_producto: "",
    loading: false,
    descuentos: [
      {
        porcentaje: "5%",
        value: 5,
      },
      {
        porcentaje: "10%",
        value: 10,
      },
      {
        porcentaje: "15%",
        value: 15,
      },
      {
        porcentaje: "20%",
        value: 20,
      },
      {
        porcentaje: "25%",
        value: 25,
      },
      {
        porcentaje: "30%",
        value: 30,
      },
      {
        porcentaje: "35%",
        value: 35,
      },
      {
        porcentaje: "40%",
        value: 40,
      },
      {
        porcentaje: "45%",
        value: 45,
      },
      {
        porcentaje: "50%",
        value: 50,
      },
    ],
    selectRules: [(v) => !!v || "El descuento es requerido."],
    idRules: [
      (v) => !!v || "ID Producto es requerido",
      (v) => v > 0 || "ID Producto debe ser mayor a cero",
    ],
  }),

  async mounted() {
    //this.obtenerRatings();
    this.$store.dispatch("navUsuarioActiva");
    await this.getUser();
    await this.redireccionar();
  },
  methods: {
    ...mapActions(["getUser"]),
    redireccionar() {
      if (this.$store.state.auth == false) {
        this.$router.push("/");
      } else if (this.$store.state.rolUser != "cliente") {
        //this.$router.push("/");
      }
    },
    async enviarNotificacion() {
      if (this.$refs.form.validate()) {
        await axios
          .get(
            `/api/private/enviarNotificacion/${this.id_producto}/${this.descuento}`
          )
          .then((result) => {
            console.log(result);
            this.loading = false;
            this.flagAlert = true;
            this.errorAlert = false;
            this.textAlert = "Notificación enviada correctamente.";
            this.reset();
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.flagAlert = true;
            this.errorAlert = true;
            this.textAlert =
              "Ha ocurrido un error vuelva a intentarlo más tarde.";
            this.reset();
          });
      } else {
        this.valid = false;
        this.loading = false;
      }
    },
    reset() {
      this.descuento = "";
      this.id_producto = "";
      this.loading = false;
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style scoped>
.medtitt2 {
  font-size: 1.5em;
  color: #3d3d3d;
  font-family: montserrat;
  line-height: 1.3;
}
.medtitt4 {
  font-size: 0.8em;
  color: #3d3d3d;
  font-family: montserrat;
  line-height: 1.3;
}
.medtitt5 {
  font-size: 0.6em;
  color: #3d3d3d;
  font-family: montserrat;
  line-height: 1.3;
}
</style>