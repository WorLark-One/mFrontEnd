<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <v-toolbar-title>
        <a href="/" class="white--text" style="text-decoration: none"
          ><font-awesome-icon icon="shopping-basket" size="2x" />&nbsp;
          Kmaule</a
        >
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="producto"
        flat
        solo-inverted
        hide-details
        label="Buscar producto"
        class="hidden-sm-and-down"
      />
      <v-select
        v-model="comuna"
        style="width: 25px"
        :items="items"
        label="Comuna"
        flat
        solo-inverted
        hide-details
        class="hidden-sm-and-down pl-2"
      ></v-select>
      <v-btn
        class="ml-1"
        color="hidden-sm-and-down secondary"
        solo-inverted
        fab
        small
        elevation="0"
        @click="goToSearch()"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon>
        <v-badge content="1" color="green" overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Privacy Policy
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer :padless="true">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-home</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-email</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-calendar</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-delete</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      items: [
        "Todas",
        "Cauquenes",
        "Chanco",
        "Pelluhue",
        "Curicó",
        "Haulañé",
        "Licantén",
        "Molina",
        "Rauco",
        "Romeral",
        "Sagrada Familia",
        "Teno",
        "Vichuquén",
        "Colbún",
        "Linares",
        "Longaví",
        "Parral",
        "Retiro",
        "San Javier",
        "Villa Alegre",
        "Yerbas Buenas",
        "Constitución",
        "Curepto",
        "Empedrado",
        "Maule",
        "Pelarco",
        "Pencahue",
        "Río Claro",
        "San Clemente",
        "San Rafael",
        "Talca",
      ],
      activeBtn: 1,
      comuna: "",
      producto: "",
      orientacion: "ASC",
      marketPlaces: "ComunidadC+marketmaule+MercadoLibre",
      rangoPrecios: "Todos",
      pagina: 1,
    };
  },
  mutations: {},
  methods: {
    ...mapActions(["SET_RUTAACTUAL"]),
    goToSearch() {
      if (this.producto != "" && this.producto != undefined) {
        var consulta = "";
        this.producto = this.producto.replace(" ", "%");
        if (this.comuna != "" && this.comuna != undefined) {
          consulta =
            "p=" +
            this.producto +
            "&c=" +
            this.comuna +
            "&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlaces +
            "&rgp=" +
            this.rangoPrecios +
            "&pag=" +
            this.pagina;
        } else {
          consulta =
            "p=" +
            this.producto +
            "&c=Todas&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlaces +
            "&rgp=" +
            this.rangoPrecios +
            "&pag=" +
            this.pagina;
        }
        const ruta = {
          name: "Search",
          params: {
            consulta: consulta,
          },
        };
        this.$store.commit("SET_RUTAACTUAL", consulta);
        this.producto = "";
        this.comuna = "";
        this.orientacion = "ASC";
        this.$router.push(ruta);
      }
    },
  },
};
</script>
