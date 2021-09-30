<template>
  <div>
    <v-row>
      <v-col cols="2" sm="2" md="3"><usernavigation /></v-col>
      <v-col cols="10" sm="10" md="9">
        <h1 class="mt-10 medtitt2">Mi lista</h1>
        <v-divider class="primary mt-2 mr-8 mb-5"></v-divider>
        <v-card v-if="miLista.length == 0" height="300" elevation="0">
          <v-card-subtitle class="pl-0 pt-2 pb-1">
            Usted no tiene productos agregado a su lista.
          </v-card-subtitle>
        </v-card>
        <v-card
          :key="pro.id"
          v-for="pro in miLista"
          class="pt-3 mb-2"
          elevation="0"
        >
          <v-row>
            <v-col cols="5" sm="4" md="3" class="ma-0 pt-0">
              <v-img
                position="center center "
                height="200px"
                width="180px"
                contain
                class="rounded-sm"
                :src="pro.imagen"
              >
              </v-img>
            </v-col>
            <v-col cols="7" sm="8" md="9">
              <v-card-text class="text--primary">
                <div>
                  <a
                    @click="goToProduct(pro.id)"
                    style="text-decoration: none; font-size: large"
                    ><span
                      class="d-inline-block text-truncate"
                      style="max-width: 100%"
                      >{{ pro.titulo }}</span
                    ></a
                  >
                </div>
                <v-row class="mt-10 ml-0">
                  <span
                    class="mt-1"
                    style="font-size: 150%"
                    v-if="pro.precio != 0"
                    ><strong>$ {{ formatPrecio(pro.precio) }}</strong></span
                  >
                  <span style="font-size: 100%" v-if="pro.precio == 0"
                    >CONSULTAR PRECIO</span
                  >
                  <v-spacer class="hidden-md-and-down"></v-spacer>
                  <v-rating
                    readonly
                    :value="pro.valoracion"
                    class="hidden-md-and-down"
                    background-color="warning "
                    color="warning"
                    dense
                  >
                  </v-rating>
                  <span class="body-2 mt-1 ml-1 mr-16 hidden-md-and-down"
                    >{{ pro.cantidad_valoraciones }} Valoraciones</span
                  >
                </v-row>
                <v-row class="hidden-md-and-up mt-4 ml-0">
                  <v-rating
                    :value="pro.valoracion"
                    background-color="warning lighten-3"
                    color="warning"
                    dense
                  >
                  </v-rating>
                  <span class="font-weight-thin mt-1 ml-1"
                    >({{ pro.cantidad_valoraciones }})</span
                  >
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
          <v-card-actions
            :class="
              $vuetify.breakpoint.xs == true
                ? 'justify-end mr-8 pt-0'
                : 'justify-end mr-14 pt-0'
            "
          >
            <v-btn
              outlined
              color="danger"
              tile
              v-show="!$vuetify.breakpoint.xs"
              :loading="loadingMiLista"
              @click.prevent="quitarProductoUserList(pro.id)"
              >Quitar de mi lista</v-btn
            >
            <v-btn
              outlined
              color="danger"
              tile
              block
              v-show="$vuetify.breakpoint.xs"
              :loading="loadingMiLista"
              @click.prevent="quitarProductoUserList(pro.id)"
              >Quitar de mi lista</v-btn
            >
          </v-card-actions>
          <v-divider class="pl-0 mr-8"></v-divider>
        </v-card>
        <div class="mb-16"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

import usernavigation from "../components/Global/UserNavigation.vue";
export default {
  components: {
    usernavigation,
  },
  data: () => ({
    miLista: [],
    loadingMiLista: false,
  }),
  beforeCreate() {
    if (this.$store.state.auth == false) {
      this.$router.push("/");
    } else if (this.$store.state.user.roles[0] != "cliente") {
      //this.$router.push("/");
    }
  },
  mounted() {
    this.obtenerMiLista();
  },

  methods: {
    async obtenerMiLista() {
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
      var link = `http://localhost:8080/#/product/${id}`;
      window.open(link, "_blank");
    },

    async quitarProductoUserList(id) {
      this.loadingMiLista = true;
      await axios
        .delete(
          `/api/private/deleteProductMiList/${id}/${this.$store.state.user.user.id}`
        )
        .then((result) => {
          console.log(result.data.message);
          this.loadingMiLista = false;
        })
        .catch((er) => {
          console.log(er);
          this.loadingMiLista = false;
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