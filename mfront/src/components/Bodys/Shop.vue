<template>
  <div>
    <v-container class="mb-6 mt-6">
      <div class="row">
        <v-col cols="12" class="hidden-md-and-up">
          <v-text-field
            v-model="producto"
            flat
            solo-inverted
            hide-details
            color="white"
            label="Buscar producto"
            class="hidden-md-and-up"
          />
          <v-select
            v-model="comuna"
            :items="items"
            label="Comuna"
            flat
            solo-inverted
            hide-details
            class="hidden-md-and-up mt-1"
          ></v-select>
          <v-btn
            color="hidden-md-and-up secondary mt-1"
            solo-inverted
            block
            elevation="0"
            @click="goToSearch()"
          >
            BUSCAR
            <v-icon class="ml-2">mdi-magnify</v-icon>
          </v-btn>
        </v-col>
        <div class="col-md-3 col-sm-3 col-xs-12">
          <v-card outlined>
            <v-card-title>Filtros</v-card-title>
            <v-divider></v-divider>
            <v-card-title>Precio</v-card-title>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">A</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-title class="pb-0">Valoración</v-card-title>
            <v-container class="pt-0" fluid>
              <v-checkbox
                append-icon="mdi-star"
                label="4 o más"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                append-icon="mdi-star"
                label="3 o más"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                append-icon="mdi-star"
                label="2 o más"
                hide-details
                dense
              ></v-checkbox>
              <v-checkbox
                append-icon="mdi-star"
                label="1 o más"
                hide-details
                dense
              ></v-checkbox>
            </v-container>
            <v-divider></v-divider>
            <v-card-title>Market Place</v-card-title>
            <v-container class="pt-0" fluid>
              <v-checkbox
                v-model="marketMauleCheckBox"
                label="MarketMaule"
                hide-details
                dense
                @change="changeMarketPlace()"
              ></v-checkbox>
              <v-checkbox
                v-model="comunidadCCheckBox"
                label="ComunidadC"
                hide-details
                dense
                @change="changeMarketPlace()"
              ></v-checkbox>
              <v-checkbox
                v-model="mercadoLibreCheckBox"
                label="MercadoLibre"
                hide-details
                dense
                @change="changeMarketPlace()"
              ></v-checkbox>
            </v-container>
            <v-divider></v-divider>
            <v-btn block @click="setFilters()">APLICAR FILTROS</v-btn>
            <v-divider></v-divider>
          </v-card>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12">
          <v-row dense class="mt-2 mb-1">
            <v-col cols="12" sm="6" class="pl-2 pt-6">
              <small>{{ this.totalProductos }} productos encontrados.</small>
            </v-col>
            <v-col cols="8" sm="4">
              <div>
                <v-select
                  class="pa-0"
                  v-model="select"
                  @change="changeOrientation()"
                  :items="options"
                  style="margin-bottom: -20px"
                  outlined
                  dense
                ></v-select>
              </div>
            </v-col>
            <v-col cols="4" sm="2" class="d-flex flex-row-reverse">
              <v-btn
                color="white"
                icon
                elevation="0"
                @click="cuadricula = false"
              >
                <font-awesome-icon icon="th-list" color="gray" size="2x" />
              </v-btn>
              <v-btn
                elevation="0"
                icon
                color="white"
                @click="cuadricula = true"
              >
                <font-awesome-icon icon="th-large" color="gray" size="2x" />
              </v-btn>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <div class="row mt-2" v-if="cuadricula">
            <v-progress-linear
              v-if="cargando"
              indeterminate
              rounded
              class="mt-2 mx-4"
              height="6"
              color="primary"
            ></v-progress-linear>
            <div
              class="col-md-4 col-sm-6 col-xs-12"
              :key="pro.id"
              v-for="pro in products"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="fondo lighten-4"
                  max-width="350px"
                  height="425px"
                >
                  <v-img
                    class="white--text align-self-star"
                    :aspect-ratio="16 / 9"
                    contain
                    height="300px"
                    :src="
                      pro.marketplace == `marketmaule`
                        ? `https://descubreelmaule.cl/wp-content/uploads/2020/11/Market-Maule.png`
                        : pro.imagen
                    "
                  >
                    <div
                      class="
                        d-flex
                        align-self-start
                        black--text
                        flex-row-reverse
                      "
                    >
                      <v-icon>mdi-star</v-icon>
                      <span>(4,5) </span>
                    </div>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="
                          d-flex
                          transition-fast-in-fast-out
                          white
                          darken-2
                          v-card--reveal
                          display-3
                          white--text
                        "
                        style="height: 100%"
                      >
                        <v-btn
                          v-if="hover"
                          @click="goToProduct(pro.id)"
                          class=""
                          outlined
                          >Ver producto</v-btn
                        >
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-subtitle class="text--primary" style="height: 80px">
                    <div>
                      <a
                        @click="goToProduct(pro.id)"
                        style="text-decoration: none"
                        ><span style="font-size: 100%">{{
                          pro.titulo
                        }}</span></a
                      >
                    </div>
                  </v-card-subtitle>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions class="justify-center align-content-end">
                    <span style=""
                      ><strong>${{ pro.precio }}</strong></span
                    >
                  </v-card-actions>
                </v-card>
              </v-hover>
            </div>
          </div>

          <div class="row mt-2" v-if="!cuadricula">
            <v-progress-linear
              v-if="cargando"
              indeterminate
              rounded
              class="mt-2 mx-4"
              height="6"
              color="primary"
            ></v-progress-linear>
            <v-col cols="12" :key="pro.id" v-for="pro in products">
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto" color="fondo lighten-4" height="200">
                  <v-row>
                    <v-col cols="5" sm="4" md="3" class="ma-0 pt-0">
                      <v-img
                        position="center center "
                        height="200px"
                        width="180px"
                        contain
                        class="rounded-sm"
                        :src="
                          pro.marketplace == `marketmaule`
                            ? `https://descubreelmaule.cl/wp-content/uploads/2020/11/Market-Maule.png`
                            : pro.imagen
                        "
                      >
                        <v-expand-transition>
                          <div
                            v-if="hover"
                            class="
                              d-flex
                              transition-fast-in-fast-out
                              white
                              darken-2
                              v-card--reveal
                              display-3
                              white--text
                            "
                            style="height: 100%"
                          >
                            <v-btn
                              v-if="hover"
                              @click="goToProduct(pro.id)"
                              class=""
                              outlined
                              >Ver producto</v-btn
                            >
                          </div>
                        </v-expand-transition>
                      </v-img>
                    </v-col>
                    <v-col cols="7" sm="8" md="9">
                      <v-card-text class="text--primary">
                        <div>
                          <a
                            @click="goToProduct(pro.id)"
                            style="text-decoration: none; font-size: large"
                            >{{ pro.titulo }}</a
                          >
                        </div>
                        <v-row class="mt-10 ml-0">
                          <span class="mt-1" style="font-size: 150%"
                            ><strong>${{ pro.precio }}</strong></span
                          >
                          <v-spacer></v-spacer>
                          <v-rating
                            value="3"
                            class=""
                            background-color="warning lighten-3"
                            color="warning"
                            dense
                          >
                          </v-rating>
                          <span class="body-2 font-weight-thin mt-1 ml-1 mr-16"
                            >5 Valoraciones</span
                          >
                        </v-row>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </v-col>
          </div>
          <div class="text-center mt-12">
            <v-pagination v-model="page" :length="6"></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data: () => ({
    url: "http://127.0.0.1:8000/api/public/getSearch/",
    range: [0, 1000000],
    select: "Precio: Menor a Mayor",
    options: [
      "Descuento",
      "Tendencia",
      "Precio: Menor a Mayor",
      "Precio: Mayor a Menor",
    ],
    page: 1,
    min: 0,
    max: 1000000,
    products: [],
    totalProductos: 0,
    consulta: "",
    //consultas parametros
    productoFinal: "",
    comunaFinal: "",
    orientacionFinal: "",
    rangoPrecioFinal: "",
    marketPlacesFinal: "",
    paginaFinal: "",
    cuadricula: false,
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
    orientacion: "",
    cargando: true,
    selectMarketPlace: [],
    marketPlace: ["marketmaule", "ComunidadC", "MercadoLibre"],
    //checkboxes marketPlace
    //allMarketPlacesCheckBox: false,
    marketMauleCheckBox: false,
    comunidadCCheckBox: false,
    mercadoLibreCheckBox: false,
  }),

  beforeMount() {
    //console.log(this.$store.state.rutaActual);
    this.obtenerProductos();
    this.setOrientation();
  },

  watch: {
    "$store.state.rutaActual": function () {
      //console.log(this.$store.state.rutaActual);
      this.obtenerProductos();
    },
    /**allMarketPlacesCheckBox: function () {
      if (this.allMarketPlacesCheckBox == true) {
        this.marketMauleCheckBox = false;
        this.comunidadCCheckBox = false;
        this.mercadoLibreCheckBox = false;
        console.log(this.comunidadCCheckBox);
      }
    },
    marketMauleCheckBox: function () {
      if (this.marketMauleCheckBox != false) {
        if (
          this.marketMauleCheckBox == true &&
          this.comunidadCCheckBox == true &&
          this.mercadoLibreCheckBox == true
        ) {
          this.allMarketPlacesCheckBox = true;
        } else {
          this.marketMauleCheckBox = true;
          this.allMarketPlacesCheckBox = false;
        }
      }
    },
    comunidadCCheckBox: function () {
      if (this.comunidadCCheckBox != false) {
        if (
          this.marketMauleCheckBox == true &&
          this.comunidadCCheckBox == true &&
          this.mercadoLibreCheckBox == true
        ) {
          this.allMarketPlacesCheckBox = true;
          console.log("hola2");
        } else {
          this.comunidadCCheckBox = true;
          this.allMarketPlacesCheckBox = false;
          console.log("hola");
        }
      }
    },
    mercadoLibreCheckBox: function () {
      if (this.mercadoLibreCheckBox != false) {
        if (
          this.marketMauleCheckBox == true &&
          this.comunidadCCheckBox == true &&
          this.mercadoLibreCheckBox == true
        ) {
          this.allMarketPlacesCheckBox = true;
        } else {
          this.mercadoLibreCheckBox = true;
          this.allMarketPlacesCheckBox = false;
        }
      }
    },*/
  },
  methods: {
    ...mapActions(["SET_RUTAACTUAL"]),
    goToSearch() {
      if (this.producto != "" && this.producto != undefined) {
        var consulta = "";
        if (this.comuna != "" && this.comuna != undefined) {
          consulta =
            "p=" +
            this.producto +
            "&c=" +
            this.comuna +
            "&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlacesFinal +
            "&rgp=" +
            this.rangoPrecioFinal +
            "&pag=" +
            this.paginaFinal;
        } else {
          consulta =
            "p=" +
            this.producto +
            "&c=Todas&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlacesFinal +
            "&rgp=" +
            this.rangoPrecioFinal +
            "&pag=" +
            this.paginaFinal;
        }
        const ruta = {
          name: "Search",
          params: {
            consulta: consulta,
          },
        };
        if (this.$route.params.consulta != consulta) {
          this.$store.commit("SET_RUTAACTUAL", consulta);
          this.producto = "";
          this.comuna = "";
          this.$router.push(ruta);
        }
      }
    },
    obtenerProductos() {
      this.consulta = this.$route.params.consulta;
      var consultaArray = this.consulta.split("&");
      for (let index = 0; index < consultaArray.length; index++) {
        var element = consultaArray[index].split("=");
        var elementSplit = element[1];
        if (index == 0) {
          this.productoFinal = elementSplit;
        } else if (index == 1) {
          this.comunaFinal = elementSplit;
        } else if (index == 2) {
          this.orientacionFinal = elementSplit;
        } else if (index == 3) {
          this.marketPlacesFinal = elementSplit;
        } else if (index == 4) {
          this.rangoPrecioFinal = elementSplit;
        } else if (index == 5) {
          this.paginaFinal = parseInt(elementSplit);
        }
      }
      this.setMarketPlaces();
      this.orientacion = this.orientacionFinal;
      const urlSearch =
        this.url +
        `p=${this.productoFinal}/` +
        `c=${this.comunaFinal}/` +
        `pag=${this.orientacionFinal}`;
      axios.get(urlSearch).then((result) => {
        const response = result.data.data;
        this.products = response;
        this.totalProductos = this.products.length;
        this.cargando = false;
        console.log(response);
      });
    },
    abrir(link) {
      window.open(link, "_blank");
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    goToNewRute() {
      if (this.productoFinal != "" && this.productoFinal != undefined) {
        var consulta = "";
        if (this.comunaFinal != "" && this.comunaFinal != undefined) {
          consulta =
            "p=" +
            this.productoFinal +
            "&c=" +
            this.comunaFinal +
            "&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlacesFinal +
            "&rgp=" +
            this.rangoPrecioFinal +
            "&pag=" +
            this.paginaFinal;
        } else {
          consulta =
            "p=" +
            this.productoFinal +
            "&c=Todas&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlacesFinal +
            "&rgp=" +
            this.rangoPrecioFinal +
            "&pag=" +
            this.paginaFinal;
        }
        const ruta = {
          name: "Search",
          params: {
            consulta: consulta,
          },
        };
        if (this.$route.params.consulta != consulta) {
          this.$store.commit("SET_RUTAACTUAL", consulta);
          this.producto = "";
          this.comuna = "";
          this.$router.push(ruta);
        }
      }
    },
    changeOrientation() {
      if (
        this.select == "Precio: Mayor a Menor" &&
        this.orientacion != "DESC"
      ) {
        this.orientacion = "DESC";
      } else if (
        this.select == "Precio: Menor a Mayor" &&
        this.orientacion != "ASC"
      ) {
        this.orientacion = "ASC";
      }
      console.log(this.select);
      console.log(this.orientacion);
      this.goToNewRute();
    },
    setOrientation() {
      if (this.orientacionFinal == "DESC") {
        this.select = "Precio: Mayor a Menor";
      } else if (this.orientacionFinal == "ASC") {
        this.select = "Precio: Menor a Mayor";
      }
    },
    setMarketPlaces() {
      if (this.marketPlacesFinal == "ComunidadC+marketmaule+MercadoLibre") {
        this.allMarketPlacesCheckBox = true;
      } else {
        var auxMP = this.marketPlacesFinal.split("+");
        if (auxMP.length > 0) {
          for (let index = 0; index < auxMP.length; index++) {
            const element = auxMP[index];
            if (element == "marketmaule") {
              this.marketMauleCheckBox = true;
            } else if (element == "ComunidadC") {
              this.comunidadCCheckBox = true;
            } else if (element == "MercadoLibre") {
              this.mercadoLibreCheckBox = true;
            }
          }
        } else if (this.marketPlacesFinal == "marketmaule") {
          this.marketMauleCheckBox = true;
        } else if (this.marketPlacesFinal == "ComunidadC") {
          this.comunidadCCheckBox = true;
        } else if (this.marketPlacesFinal == "MercadoLibre") {
          this.mercadoLibreCheckBox = true;
        }
      }
    },
    setFilters() {
      if (this.range[0] == this.min && this.range[1] == this.max) {
        this.rangoPrecioFinal = "Todos";
      } else {
        this.rangoPrecioFinal = this.range[0] + "to" + this.range[1];
      }
      if (
        this.comunidadCCheckBox == true &&
        this.marketMauleCheckBox == true &&
        this.mercadoLibreCheckBox == true
      ) {
        this.marketPlacesFinal = "ComunidadC+marketmaule+MercadoLibre";
      } else {
        var auxMarketPLacesFinal = [];
        if (this.comunidadCCheckBox == true) {
          auxMarketPLacesFinal =
            auxMarketPLacesFinal.length > 0
              ? [...auxMarketPLacesFinal, "ComunidadC"]
              : ["ComunidadC"];
        }
        if (this.marketMauleCheckBox == true) {
          auxMarketPLacesFinal =
            auxMarketPLacesFinal.length > 0
              ? [...auxMarketPLacesFinal, "marketmaule"]
              : ["marketmaule"];
        }
        if (this.mercadoLibreCheckBox == true) {
          auxMarketPLacesFinal =
            auxMarketPLacesFinal.length > 0
              ? [...auxMarketPLacesFinal, "MercadoLibre"]
              : ["MercadoLibre"];
        }
        if (auxMarketPLacesFinal.length > 0) {
          for (let index = 0; index < auxMarketPLacesFinal.length; index++) {
            const element = auxMarketPLacesFinal[index];
            this.marketPlacesFinal =
              index == 0 ? element : this.marketPlacesFinal + "+" + element;
          }
        } else {
          this.marketPlacesFinal = "ComunidadC+marketmaule+MercadoLibre";
          this.allMarketPlacesCheckBox = true;
        }
      }
      this.goToNewRute();
    },
    changeMarketPlace() {
      //if (
      //this.marketMauleCheckBox == true &&
      //this.comunidadCCheckBox == true &&
      //this.mercadoLibreCheckBox == true
      //) {
      //this.allMarketPlacesCheckBox = true;
      //console.log("wena");
      //}
    },
  },
};
</script>
