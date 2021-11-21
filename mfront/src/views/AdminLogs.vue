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
          <h1 class="mt-10 medtitt2">Logs</h1>
          <v-divider class="primary mt-2 mb-5"></v-divider>
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