<template>
  <div>
    <v-row>
      <v-col cols="2" sm="1" md="3" lg="2"><usernavigation /></v-col>
      <v-col cols="10" sm="11" md="9" lg="10">
        <div
          :class="this.$vuetify.breakpoint.smAndDown == true ? 'mr-4' : 'mr-14'"
        >
          <h1 class="mt-10 medtitt2">Perfil de usuario</h1>
          <v-divider class="primary mt-2"></v-divider>
          <v-card elevation="3" class="mt-6 mb-6">
            <v-card-subtitle
              >Nombre:
              <strong>{{ $store.state.userName }}</strong></v-card-subtitle
            >
            <v-card-subtitle
              >Correo electrónico:
              <strong>{{ $store.state.userEmail }} </strong></v-card-subtitle
            >
            <v-card-subtitle
              >Tipo de usuario:
              <strong>{{ $store.state.userRol }}</strong></v-card-subtitle
            >
            <v-card-subtitle
              >Cuenta creada:
              <strong>{{
                splitFecha($store.state.userCreacion)
              }}</strong></v-card-subtitle
            >
          </v-card>
          <div class="mb-16"></div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import usernavigation from "../components/Global/UserNavigation.vue";
export default {
  components: {
    usernavigation,
  },
  data() {
    return {};
  },

  async mounted() {
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
    splitFecha(fecha) {
      var aux = fecha.split("T");
      var aux2 = aux[0].split("-");
      var fechaAux = aux2[2] + " / " + aux2[1] + " / " + aux2[0];
      return fechaAux;
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
</style>