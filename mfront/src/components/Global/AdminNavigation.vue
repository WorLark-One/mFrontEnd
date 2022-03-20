<template>
  <div>
    <v-navigation-drawer
      permanent
      absolute
      color="primary"
      dark
      :mini-variant="
        this.$vuetify.breakpoint.smAndDown ? (drawer ? false : true) : false
      "
      :hide-overlay="!drawer"
    >
      <v-list-item
        v-if="this.$vuetify.breakpoint.smAndDown == true ? false : true"
      >
        <v-list-item-icon>
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-h6" style="font-family: montserrat">
            MI CUENTA
          </v-list-item-title>
          <v-list-item-subtitle>
            Hola {{ $store.state.userName }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="this.$vuetify.breakpoint.smAndDown == true ? true : false"
        @click.stop="drawer = !drawer"
      >
        <v-list-item-icon>
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> MI CUENTA </v-list-item-title>
          <v-list-item-subtitle>
            Hola {{ $store.state.userName }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group>
          <v-list-item :to="{ path: '/adminProfile' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/manageComune' }">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Gestionar comunas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/manageRegion' }">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Gestionar regiones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/manageNotifications' }">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Notificaciones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/manageLogs' }">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logs</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Perfil", icon: "mdi-account" },
      { title: "Logs", icon: "mdi-star" },
      { title: "Gestionar comunas", icon: "mdi-format-list-bulleted-square" },
      { title: "Gestionar regiones", icon: "mdi-star" },
      { title: "Notificaciones", icon: "mdi-star" },
    ],
    right: null,
    rating: 5,
    drawer: null,
  }),
  //beforeCreate() {
  //this.script();
  //},
  methods: {
    test() {
      console.log("click");
    },
  },
};
</script>

<style>
</style>