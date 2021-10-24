<template>
  <div :class="this.$vuetify.breakpoint.smAndDown == true ? 'px-0' : 'px-12'">
    <v-breadcrumbs class="ml-2" :items="itemsB">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-container class="mb-6 mt-0 pt-0">
      <div class="row">
        <!--<v-col cols="12" class="hidden-md-and-up">
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
            color="hidden-md-and-up cbtn mt-1"
            solo-inverted
            block
            dark
            elevation="0"
            @click="goToSearch()"
          >
            BUSCAR
            <v-icon class="ml-2">mdi-magnify</v-icon>
          </v-btn>
        </v-col>-->
        <div class="col-md-3 col-sm-12 col-xs-12">
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
              <!--<v-checkbox
                append-icon="mdi-star"
                label="4 o más"
                hide-details
                dense
              ></v-checkbox>-->

              <v-radio-group v-model="filtroValoracion" column>
                <v-radio label="4 estrellas o más" value="4"> </v-radio>
                <v-radio label="3 estrellas o más" value="3"> </v-radio>
                <v-radio label="2 estrellas o más" value="2"> </v-radio>
                <v-radio label="1 estrellas o más" value="1"> </v-radio>
                <v-radio label="0 estrellas o más" value="0"> </v-radio>
              </v-radio-group>
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
            <v-btn block color="cbtn" dark @click="setFilters()"
              >APLICAR FILTROS</v-btn
            >
          </v-card>
        </div>
        <div class="col-md-9 col-sm-12 col-xs-12">
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
                <font-awesome-icon
                  icon="th-list"
                  :color="cuadricula == false ? '#0bce96' : 'gray'"
                  size="2x"
                />
              </v-btn>
              <v-btn
                elevation="0"
                icon
                color="white"
                @click="cuadricula = true"
              >
                <font-awesome-icon
                  icon="th-large"
                  :color="cuadricula == true ? '#0bce96' : 'gray'"
                  size="2x"
                />
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="primary"></v-divider>

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
              :key="pro.id + 100000"
              v-for="pro in products"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="fondo lighten-4"
                  elevation="8"
                  height="425px"
                >
                  <v-img
                    class="white--text align-self-star"
                    contain
                    height="300px"
                    :src="pro.imagen"
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
                    <span v-if="pro.precio != 0" class="ml-1"
                      ><strong>$ {{ formatPrecio(pro.precio) }}</strong></span
                    >
                    <span
                      style="font-size: 90%"
                      class="ml-1"
                      v-if="pro.precio == 0"
                      >CONSULTAR PRECIO</span
                    >
                    <v-spacer></v-spacer>
                    <span class="ml-1"
                      >({{ mostrarUnDecimal(pro.valoracion) }})</span
                    >
                    <v-rating
                      readonly
                      value="1"
                      length="1"
                      background-color="warning lighten-3"
                      color="warning"
                      class="mr-1"
                      dense
                    >
                    </v-rating>
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
                <v-card
                  class="mx-auto"
                  color="fondo lighten-4"
                  elevation="4"
                  height="200"
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
                            ><strong
                              >$ {{ formatPrecio(pro.precio) }}</strong
                            ></span
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
                          <span
                            class="body-2 mt-1 ml-1 mr-16 hidden-md-and-down"
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
                </v-card>
              </v-hover>
            </v-col>
          </div>
          <div v-if="this.totalProductos == 0 && cargando == false">
            <v-card class="mt-4 text-center">
              <v-container>
                <div class="my-4">
                  <v-img
                    height="150"
                    contain
                    class=""
                    src="@/assets/bag.png"
                  ></v-img>
                  <v-card-subtitle style="font-size: 100%" class="mt-2">
                    No se encontraron productos asociados a la búsqueda.
                  </v-card-subtitle>
                </div>
              </v-container>
            </v-card>
          </div>
          <div class="text-center mt-12">
            <v-pagination
              v-if="this.totalProductos > 0"
              v-model.number="page"
              :length="cantidadPaginas"
            ></v-pagination>
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
.truncate {
  width: 10%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
<script>
import axios from "axios";
import { mapActions } from "vuex";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default {
  data: () => ({
    url: "/api/public/getSearch/",
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
    valoracionProductosFinal: "",
    paginaFinal: "",
    //paginacion
    cantidadPaginas: 1,
    cantidadPaginasAux: "1",
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
    itemsB: [
      {
        text: "Inicio",
        disabled: false,
        href: "/",
      },
      {
        text: "Búsqueda",
        disabled: true,
        href: "javascript:history.back()",
      },
    ],
    filtroValoracion: "0",
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
    page: function () {
      this.setNavigation();
    },
  },
  methods: {
    ...mapActions(["SET_RUTAACTUAL"]),
    mostrarUnDecimal(num) {
      var aux = num.toFixed(1);
      return aux;
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
            "&ori=ASC&mp=ComunidadC+marketmaule+MercadoLibre&rgp=Todos&pag=1";
        } else {
          consulta =
            "p=" +
            this.producto +
            "&c=Todas&ori=ASC&mp=ComunidadC+marketmaule+MercadoLibre&rgp=Todos&pag=1";
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
      console.log(this.consulta);
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
          this.filtroValoracion = elementSplit;
          this.valoracionProductosFinal = parseInt(elementSplit);
          //this.page = elementSplit;
        } else if (index == 6) {
          this.paginaFinal = parseInt(elementSplit);
        }
      }
      this.setMarketPlaces();
      this.orientacion = this.orientacionFinal;
      const urlSearch =
        this.url +
        `p=${this.productoFinal}/` +
        `c=${this.comunaFinal}/` +
        `ori=${this.orientacionFinal}/` +
        `mp=${this.marketPlacesFinal}/` +
        `rgp=${this.rangoPrecioFinal}/` +
        `val=${this.valoracionProductosFinal}/` +
        `pag=${this.paginaFinal}`;
      console.log(urlSearch);
      axios.get(urlSearch).then((result) => {
        console.log(result);
        //const response = result.data.data;
        //this.products = response;
        this.products = [];
        this.page = parseInt(this.paginaFinal);
        this.cantidadPaginas = 0;
        this.totalProductos = result.data.totalProductos;
        if (this.totalProductos % 12 == 0) {
          this.cantidadPaginas = this.totalProductos / 12;
        } else {
          this.cantidadPaginas = 1 + this.totalProductos / 12;
        }
        //console.log(result.data.data);
        //console.log(this.totalProductos);
        //this.cantidadPaginasAux = this.cantidadPaginas.toString();
        this.range = [];
        if (this.page >= 1 && this.page <= this.cantidadPaginas) {
          if (this.rangoPrecioFinal == "Todos") {
            this.range[1] = result.data.precioMaxRango;
            this.range[0] = result.data.precioMinRango;
            this.max = result.data.precioMaximo;
            this.min = 0;
          } else {
            this.range[1] = result.data.precioMaxRango;
            this.range[0] = result.data.precioMinRango;
            this.max = result.data.precioMaximo;
            this.min = 0;
          }
          var productosPorPagina =
            this.page * 12 > this.totalProductos
              ? this.totalProductos
              : this.page * 12;
          let inicioProducto = (this.page - 1) * 12;
          for (
            let index = inicioProducto;
            index < productosPorPagina;
            index++
          ) {
            const element = result.data.data[index];
            //console.log(element);
            this.products =
              this.products.length > 0
                ? [...this.products, element]
                : [element];
          }
        }
        this.cargando = false;
      });
    },
    abrir(link) {
      window.open(link, "_blank");
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}/search=${true}`);
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
            "&val=" +
            this.valoracionProductosFinal +
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
            "&val=" +
            this.valoracionProductosFinal +
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
        this.marketMauleCheckBox = true;
        this.comunidadCCheckBox = true;
        this.mercadoLibreCheckBox = true;
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
        if (this.totalProductos == 0) {
          this.rangoPrecioFinal = "Todos";
        } else {
          this.rangoPrecioFinal = this.range[0] + "to" + this.range[1];
        }
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
      this.valoracionProductosFinal = this.filtroValoracion;
      this.paginaFinal = 1;
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
    setNavigation() {
      if (this.page <= this.cantidadPaginas) {
        this.paginaFinal = this.page;
        console.log(this.page);
        this.goToNewRute();
      }
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
.radioAC {
  background-color: red;
  color: white;
}
</style>