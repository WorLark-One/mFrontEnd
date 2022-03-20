<template >
  <div class="paco">
    <div class="primary">
      <v-container>
        <!--<v-col cols="12" class="hidden-md-and-up">
          <v-text-field
            v-model="producto"
            flat
            dark
            solo-inverted
            hide-details
            label="Buscar producto"
            class="hidden-md-and-up"
          />
          <v-select
            v-model="comuna"
            :items="items"
            label="Comuna"
            dark
            flat
            solo-inverted
            hide-details
            class="hidden-md-and-up mt-1"
          ></v-select>
          <v-btn
            color="hidden-md-and-up cbtn mt-1"
            solo-inverted
            dark
            block
            elevation="0"
            @click="goToSearch()"
          >
            BUSCAR
            <v-icon class="ml-2">mdi-magnify</v-icon>
          </v-btn>
        </v-col>-->
        <section class="mb-5">
          <v-carousel cycle hide-delimiters height="400" class="mt-4">
            <v-carousel-item
              :key="pro.id"
              v-for="pro in productosDescuento"
              contain
              :src="pro.imagen"
              :to="{ path: `/product/${pro.id}/search=${false}` }"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
                v-if="pro.descuento > 0"
              >
                <div
                  class="pl-5 pr-5 cbtn rounded"
                  style="
                    font-size: 3.5em;
                    color: #ffff;
                    font-family: montserrat;
                  "
                >
                  <strong>-{{ pro.descuento }}% </strong>
                </div>
                <br />
              </v-row>
            </v-carousel-item>
            <!--<v-carousel-item
              contain
              src="https://comunidadc.cl/repoimg/default//2021/02/1612294088284620/1612820317266484-full.jpeg"
            >
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
                  <strong>40% DE DESCUENTO</strong>
                </div>
                <br />
              </v-row>
            </v-carousel-item>
            <v-carousel-item
              contain
              src="https://comunidadc.cl/repoimg/default//2021/02/1612402513126467/1612923231834849-full.jpeg"
            >
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
                  <strong>40% DE DESCUENTO</strong>
                </div>
                <br />
              </v-row>
            </v-carousel-item>-->
          </v-carousel>
        </section>
      </v-container>
    </div>
    <!--<v-card class="mx-auto mt-5">
      <v-card-title class="ml-2" color="secondary">
        Busca tus productos en Pymes locales
      </v-card-title>
      <v-card-subtitle class="ml-2"> Al menor costo posible </v-card-subtitle>
      <v-card class="mx-auto" elevation="0">
        <v-row class="mt-2 mx-6">
          <v-col cols="12" sm="6">
            <v-text-field label="Producto"></v-text-field>
          </v-col>
          <v-col cols="12" sm="5">
            <v-select
              :items="items"
              label="Comuna"
              color="secondary"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn color="secondary" fab elevation="0" @click="goToSearch()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
    -->
    <v-container class="mt-6">
      <section class="mb-5">
        <div class="mt-4 d-flex flex-row">
          <font-awesome-icon icon="fire" size="2x" style="color: #0bce96" />
          <h1 class="ml-2 mb-6 medtitt">Productos en tendencias</h1>
        </div>
        <v-divider class="primary"></v-divider>
        <div class="mt-2 row">
          <div
            class="col-md-6 col-sm-6 col-xs-12"
            v-for="pro in productosTendencia1"
            :key="pro.id"
          >
            <v-card>
              <v-img
                contain
                :src="pro.imagen"
                class="white--text align-center"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="400px"
              >
                <h1 class="text-center font-size">{{ pro.titulo }}</h1>
                <h3 class="text-center">${{ formatPrecio(pro.precio) }}</h3>
                <div class="text-center">
                  <v-btn
                    @click="goToProduct(pro.id)"
                    class="white--text"
                    outlined
                    >VER PRODUCTO</v-btn
                  >
                </div>
              </v-img>
            </v-card>
          </div>
        </div>
        <div class="row">
          <div
            class="col-md-4 col-sm-4 col-xs-12"
            v-for="pro in productosTendencia2"
            :key="pro.id"
          >
            <v-card outlined>
              <v-img
                contain
                :src="pro.imagen"
                class="white--text align-center"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <h1 class="text-center font-size">{{ pro.titulo }}</h1>
                <h3 class="text-center">${{ formatPrecio(pro.precio) }}</h3>
                <div class="text-center mt-2">
                  <v-btn
                    class="white--text caption"
                    @click="goToProduct(pro.id)"
                    text
                    >VER PRODUCTO
                    <v-icon class="white--text caption"
                      >mdi-arrow-right</v-icon
                    ></v-btn
                  >
                </div>
              </v-img>
            </v-card>
          </div>
        </div>
        <!--<v-row class="mt-12">
        <v-col cols="12">
          <v-row>
            <v-col cols="3" v-for="(item, i) in product" :key="`item-${i}`">
              <v-card class="mx-auto my-4" max-width="374">
                <template slot="progress">
                  <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>

                <v-img
                  height="100"
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>

                <v-card-title>Pasteles </v-card-title>

                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">4.5 (413)</div>
                  </v-row>

                  <div class="my-4 subtitle-1">$15000</div>

                  <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit
                  </div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-actions>
                  <v-btn color="deep-purple lighten-2" text>
                    Ir a comprar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>-->
      </section>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default {
  data: () => ({
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
    comuna: "",
    producto: "",
    orientacion: "ASC",
    marketPlaces: "ComunidadC+marketmaule+MercadoLibre",
    rangoPrecios: "Todos",
    pagina: 1,
    productosTendencia1: [],
    productosTendencia2: [],
    productosDescuento: [],
  }),
  async mounted() {
    //this.obtenerRatings();
    await this.obtenerHomeProductos();
  },
  created() {
    this.goToHome();
  },
  methods: {
    ...mapMutations(["stateFalseAppBarSearch"]),
    async obtenerHomeProductos() {
      await axios
        .get(`/api/public/getHomeProductos`)
        .then((result) => {
          this.productosDescuento = result.data.data_descuento;
          var index = 0;
          for (const iterator of result.data.data_tendencia) {
            if (index <= 1) {
              this.productosTendencia1 =
                this.productosTendencia1.length > 0
                  ? [...this.productosTendencia1, iterator]
                  : [iterator];
            } else {
              this.productosTendencia2 =
                this.productosTendencia2.length > 0
                  ? [...this.productosTendencia2, iterator]
                  : [iterator];
            }
            index = index + 1;
          }
        })
        .catch((er) => {
          console.log(er);
        });
    },
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

    goToHome() {
      this.stateFalseAppBarSearch();
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}/search=${false}`);
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
  },
};
</script>

<style scoped>
.paco {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
}
.medtitt {
  font-size: 1.9em;
  color: #3d3d3d;
  font-family: montserrat;
  line-height: 1.3;
}
</style>