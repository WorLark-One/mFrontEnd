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
          <v-list-item :to="{ path: '/userProfile' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/userList' }">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Mi lista</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/userRatings' }">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Mis valoraciones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/userPurchases' }">
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Mis Compras</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!--<v-navigation-drawer v-model="drawer" temporary absolute>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> MI CUENTA </v-list-item-title>
          <v-list-item-subtitle>
            Hola {{ $store.state.user.user.name }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group color="primary">
          <v-list-item :to="{ path: '/' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/' }">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Mi lista</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/userRatings' }">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Mis valoraciones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>-->
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Perfil", icon: "mdi-account" },
      { title: "Mi lista", icon: "mdi-format-list-bulleted-square" },
      { title: "Mis valoraciones", icon: "mdi-star" },
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