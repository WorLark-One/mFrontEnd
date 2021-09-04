<template>
  <div>
    <v-row>
      <v-col cols="2" sm="2" md="3">
        <v-navigation-drawer
          absolute
          permanent
          :mini-variant="this.$vuetify.breakpoint.smAndDown"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6"> MI CUENTA </v-list-item-title>
              <v-list-item-subtitle>
                Hola {{ $store.state.user.user.name }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="10" sm="10" md="9">
        <v-list three-line="true" avatar="true" disabled>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item inactive="true">
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
                <v-list-item-title>Roberto</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis repellendus, ex nesciunt sequi veritatis culpa
                  neque incidunt optio adipisci ratione. Repellendus, recusandae
                  necessitatibus ut et eum molestiae eius qui illo?
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item inactive>
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
                <v-list-item-title>Felipe</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
                  maiores in, magnam ut quae tempora ipsa debitis eum! Rem
                  laboriosam explicabo atque, delectus adipisci placeat modi
                  distinctio optio repellendus velit.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item inactive>
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
                <v-list-item-title>Felipe</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
                  maiores in, magnam ut quae tempora ipsa debitis eum! Rem
                  laboriosam explicabo atque, delectus adipisci placeat modi
                  distinctio optio repellendus velit.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item inactive>
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
                <v-list-item-title>Felipe</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
                  maiores in, magnam ut quae tempora ipsa debitis eum! Rem
                  laboriosam explicabo atque, delectus adipisci placeat modi
                  distinctio optio repellendus velit.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item inactive>
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
                <v-list-item-title>Felipe</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
                  maiores in, magnam ut quae tempora ipsa debitis eum! Rem
                  laboriosam explicabo atque, delectus adipisci placeat modi
                  distinctio optio repellendus velit.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item inactive>
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
                <v-list-item-title>Felipe</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
                  maiores in, magnam ut quae tempora ipsa debitis eum! Rem
                  laboriosam explicabo atque, delectus adipisci placeat modi
                  distinctio optio repellendus velit.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item inactive>
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
                <v-list-item-title>Felipe</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
                  maiores in, magnam ut quae tempora ipsa debitis eum! Rem
                  laboriosam explicabo atque, delectus adipisci placeat modi
                  distinctio optio repellendus velit.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item inactive>
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
                <v-list-item-title>Felipe</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
                  maiores in, magnam ut quae tempora ipsa debitis eum! Rem
                  laboriosam explicabo atque, delectus adipisci placeat modi
                  distinctio optio repellendus velit.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item inactive>
              <v-list-item-content>
                <v-rating
                  v-model="rating"
                  class=""
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                ></v-rating>
                <v-list-item-title>Felipe</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
                  maiores in, magnam ut quae tempora ipsa debitis eum! Rem
                  laboriosam explicabo atque, delectus adipisci placeat modi
                  distinctio optio repellendus velit.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default {
  data: () => ({
    items: [
      { title: "Perfil", icon: "mdi-view-dashboard" },
      { title: "Mi lista", icon: "mdi-image" },
      { title: "Mis valoraciones", icon: "mdi-help-box" },
    ],
    right: null,
    rating: 5,
  }),
  beforeCreate() {
    if (
      this.$store.state.auth == false ||
      this.$store.state.user.roles[0] != "cliente"
    ) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
</style>