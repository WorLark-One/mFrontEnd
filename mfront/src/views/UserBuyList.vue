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
      <v-col cols="2" sm="1" md="3" lg="2"><usernavigation /></v-col>
      <v-col cols="10" sm="11" md="9" lg="10">
        <div
          :class="this.$vuetify.breakpoint.smAndDown == true ? 'mr-4' : 'mr-14'"
        >
          <h1 class="mt-10 medtitt2">Mis compras</h1>
          <v-divider class="primary mt-2 mb-5"></v-divider>
          <div class="mt-8" v-if="cargando">
            <v-progress-linear
              v-if="cargando"
              indeterminate
              rounded
              height="6"
              color="primary"
            ></v-progress-linear>
          </div>

          <v-card
            v-if="miLista.length == 0 && cargando == false"
            height="300"
            elevation="0"
            class="mt-8"
          >
            <v-card-subtitle class="pl-0 pt-0">
              Usted no tiene compras realizadas.
            </v-card-subtitle>
          </v-card>

          <v-card
            v-for="pro in miLista"
            :key="pro.id"
            elevation="0"
            class="mt-2 mb-2"
          >
            <v-card-subtitle class="pl-0 pt-2 pb-1">
              Producto
              <a @click="goToProduct(pro.id)"
                ><strong>{{ pro.titulo }}</strong></a
              >
            </v-card-subtitle>
            <v-card-subtitle class="pl-0 pt-1 pb-1">
              Lo puedes encontrar en
              <strong>{{ pro.ubicacion }}</strong>
            </v-card-subtitle>
            <v-card-subtitle class="pl-0 pt-2 pb-2">
              <v-row class="pl-2 mt-1">
                <v-rating
                  background-color="warning "
                  color="warning"
                  dense
                  readonly
                  :value="pro.valoracion"
                ></v-rating>
                <span class="ml-1 pt-1">({{ pro.cantidad_valoraciones }})</span>
              </v-row>
            </v-card-subtitle>

            <v-card-actions class="justify-end pb-2">
              <v-btn
                color="danger"
                text
                tile
                :loading="loadingMiLista"
                @click.prevent="quitarProductoUserList(pro.id)"
                >Quitar
              </v-btn>
              <v-btn
                class="ml-4"
                tile
                dark
                color="cbtn"
                @click="goToProduct(pro.id)"
              >
                Ver detalles
                <v-icon class="ml-1">mdi-open-in-new</v-icon>
              </v-btn>
            </v-card-actions>

            <v-divider class="pl-0"></v-divider>
          </v-card>
          <div class="mb-16"></div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

import usernavigation from "../components/Global/UserNavigation.vue";
export default {
  components: {
    usernavigation,
  },
  data: () => ({
    flagAlert: false,
    errorAlert: false,
    textAlert: "",
    cargando: true,
    miLista: [],
    loadingMiLista: false,
  }),

  async mounted() {
    //this.obtenerRatings();
    this.$store.dispatch("navUsuarioActiva");
    await this.getUser();
    await this.obtenerMiLista();
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
    async obtenerMiLista() {
      this.cargando = true;
      await axios
        .get(`/api/private/getUserList/${this.$store.state.user.user.id}`)
        .then((result) => {
          console.log(result.data.data);
          this.miLista = result.data.data;
          //this.valoraciones = result.data.data;
        })
        .catch((er) => {
          console.log(er);
        });
      this.cargando = false;
    },
    formatPrecio(n) {
      n = n.toString();
      var flag = 0;
      while (flag == 0) {
        var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, "$1.$2$3");
        if (n == n2) {
          flag = 1;
        } else {
          n = n2;
        }
      }
      return n;
    },
    goToProduct(id) {
      var link =
        process.env.VUE_APP_WEB_URL + `#/product/${id}/search=${false}`;
      window.open(link, "_blank");
    },

    async quitarProductoUserList(id) {
      //this.loadingMiLista = true;
      await axios
        .delete(
          `/api/private/deleteProductMiList/${id}/${this.$store.state.user.user.id}`
        )
        .then((result) => {
          console.log(result.data.message);
          //this.loadingMiLista = false;
          this.flagAlert = true;
          this.errorAlert = false;
          this.textAlert = "Producto quitado correctamente.";
        })
        .catch((er) => {
          console.log(er);
          //this.loadingMiLista = false;
          this.flagAlert = true;
          this.errorAlert = true;
          this.textAlert =
            "Ha ocurrido un error vuelva a intentarlo más tarde.";
        });
      await this.obtenerMiLista();
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