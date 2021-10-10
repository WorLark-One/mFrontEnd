<template>
  <div>
    <v-row>
      <v-col cols="2" sm="2" md="3"><usernavigation /></v-col>
      <v-col cols="10" sm="10" md="9">
        <h1 class="mt-10 medtitt2">Perfil de usuario</h1>
        <v-divider class="primary mt-2 mr-8"></v-divider>
        <v-card elevation="3" class="mt-6 mb-6 mr-8">
          <v-card-subtitle
            >Nombre:
            <strong>{{
              this.$store.state.user.user.name
            }}</strong></v-card-subtitle
          >
          <v-card-subtitle
            >Correo electrónico:
            <strong
              >{{ this.$store.state.user.user.email }}
            </strong></v-card-subtitle
          >
          <v-card-subtitle
            >Rol:
            <strong>{{
              this.$store.state.user.roles[0]
            }}</strong></v-card-subtitle
          >
          <v-card-subtitle
            >Cuenta creada:
            <strong>{{
              splitFecha(this.$store.state.user.user.created_at)
            }}</strong></v-card-subtitle
          >
        </v-card>
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
      return aux[0];
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