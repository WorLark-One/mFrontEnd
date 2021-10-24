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

          <v-card-actions class="justify-end pb-2 mr-8">
            <v-btn
              color="danger"
              text
              tile
              :loading="loadingMiLista"
              @click.prevent="quitarProductoUserList(pro.id)"
              >Quitar de mi lista</v-btn
            >
            <v-btn tile dark color="cbtn" @click="goToProduct(pro.id)">
              Ver detalles
              <v-icon class="ml-1">mdi-open-in-new</v-icon>
            </v-btn>
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
import { mapActions } from "vuex";
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

  async mounted() {
    //this.obtenerRatings();
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
      var link =
        process.env.VUE_APP_WEB_URL + `#/product/${id}/search=${false}`;
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