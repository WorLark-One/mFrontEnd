<template>
  <div>
    <v-row>
      <v-col cols="2" sm="2" md="3"><usernavigation /></v-col>
      <v-col cols="10" sm="10" md="9">
        <h1 class="mt-10 medtitt2">Perfil de usuario</h1>
        <v-divider class="primary mt-2 mr-8"></v-divider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import usernavigation from "../components/Global/UserNavigation.vue";
export default {
  components: {
    usernavigation,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("navUsuarioDesactivada");
    if (this.$store.state.auth == false) {
      this.$router.push("/");
    } else if (this.$store.state.user.roles[0] != "cliente") {
      console.log(this.$store.state.user.roles[0]);
      //this.$router.push("/");
    }
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