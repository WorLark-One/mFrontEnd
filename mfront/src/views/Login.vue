<template>
  <div class="text-center mt-4">
    <div>El usuario autenticado es:</div>
    <v-btn @click="logout">Logout</v-btn>

    <form @submit.prevent="login(form)">
      <input v-model="form.email" type="email" placeholder="Email..." />
      <br />
      <input
        v-model="form.password"
        type="password"
        placeholder="Password..."
      />
      <br />
      <button color="secondary">Login</button>
    </form>
    <div v-if="this.auth">logeado ctm: {{ this.user.name }}</div>
    <div v-else>no esta logeado</div>
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
    form: {
      email: "felipe.milla.calquin@gmail.com",
      password: "1234567890",
    },
  }),
  computed: {
    ...mapState(["auth", "user"]),
  },
  created() {
    ///
  },
  methods: {
    ...mapActions(["login", "logout"]),
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

<style>
</style>