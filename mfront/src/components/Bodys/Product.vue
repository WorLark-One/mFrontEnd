<template>
  <div :class="this.$vuetify.breakpoint.smAndDown == true ? 'px-0' : 'px-12'">
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
    <v-breadcrumbs class="ml-2" :items="flagSearch ? items : itemsAux">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card class="mt-4 mx-8 mb-8" elevation="12" v-if="apariencia == false">
      <v-row>
        <v-col cols="12" md="6">
          <div class="px-4">
            <v-card-title class="px-0">{{ product.titulo }}</v-card-title>
            <!--<p class="display-1 mb-0"></p>-->
            <v-img height="300" contain :src="product.imagen" />
            <v-card-actions class="pa-0 mt-4">
              <p class="headline font-weight-light" v-if="product.precio > 1">
                <strong>${{ formatPrecio(product.precio) }}</strong>
              </p>
              <p class="headline font-weight-light" v-if="product.precio == 0">
                <strong>CONSULTAR PRECIO</strong>
              </p>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-card-actions class="pa-0 mt-0">
              <v-rating
                readonly
                background-color="warning"
                color="warning"
                dense
                :value="product.valoracion"
              ></v-rating>
              <span class="body-2 font-weight mr-6"
                >{{ product.cantidadValoraciones }} Valoraciones</span
              >
            </v-card-actions>
            <v-card-subtitle class="pa-0 mt-4" style="font-size: 110%"
              >Comuna: <strong>{{ product.ubicacion }}</strong></v-card-subtitle
            >
            <div class="mt-5 mb-2">
              <v-row>
                <v-col
                  cols="6"
                  v-show="this.$store.state.rolUser != 'cliente'"
                ></v-col>
                <v-col cols="6" class="pr-1">
                  <v-btn
                    class="primary white--text"
                    outlined
                    tile
                    dense
                    block
                    @click="abrir(product.link)"
                    ><v-icon class="mr-4">mdi-cart</v-icon>
                    <span v-if="product.precio > 0">Ir a comprar</span>
                    <span v-if="product.precio == 0"
                      >Ir a consultar</span
                    ></v-btn
                  >
                </v-col>
                <v-col
                  cols="6"
                  class="pl-1"
                  v-show="this.$store.state.rolUser == 'cliente'"
                >
                  <v-btn
                    block
                    tile
                    dark
                    elevation="0"
                    color="cbtn"
                    v-show="!onUserList"
                    :loading="loadingMiLista"
                    @click.prevent="añadirProductoUserList()"
                    >Añadir a mi lista</v-btn
                  >
                  <v-btn
                    block
                    text
                    color="danger"
                    tile
                    v-show="onUserList"
                    :loading="loadingMiLista"
                    @click.prevent="quitarProductoUserList()"
                    >Quitar de mi lista</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-tabs
            class="px-4"
            centered
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            show-arrows
          >
            <v-tab>Descripción </v-tab>
            <v-tab v-if="product.precio > 0">Historial de precios</v-tab>
            <v-tab>Valoraciones</v-tab>
            <v-tab-item>
              <v-card
                v-scroll.self="onScroll"
                class="overflow-y-auto"
                height="500"
                elevation="0"
              >
                <v-card-text
                  class="pt-6 subtitle-1 font-weight"
                  v-html="product.descripcion"
                ></v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item v-if="product.precio > 0">
              <v-card height="500" elevation="0" class="pt-8">
                <!--<line-chart
                  class="px-4"
                  id="line2"
                  :data="data"
                  xkey="fecha"
                  ykeys='["precio"]'
                  labels='["Precio"]'
                  line-colors='[ "#FF6384" ]'
                  grid="true"
                  grid-text-weight="blod"
                  resize="true"
                >
                </line-chart>-->
                <div id="chart">
                  <apexchart
                    type="line"
                    height="400"
                    :options="chartOptions"
                    :series="series"
                  ></apexchart>
                </div>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card height="150" elevation="0" class="pt-2">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-card align="center" elevation="0">
                      <h1>{{ mostrarUnDecimal(detallesValoracion.avg) }}</h1>
                      <v-rating
                        class=""
                        background-color="warning"
                        color="warning"
                        dense
                        readonly
                        :value="product.valoracion"
                      ></v-rating>
                      <v-card-subtitle>
                        Promedio en
                        {{ detallesValoracion.cant }}
                        valoraciones</v-card-subtitle
                      >
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card-subtitle class="ma-0 pa-0">
                      <v-row>
                        <v-col cols="4">
                          <span>5 estrellas</span>
                        </v-col>
                        <v-col cols="4" class="pl-0 pr-0" align-self="center">
                          <v-progress-linear
                            color="secondary"
                            rounded
                            :value="
                              detallesValoracion.cant == 0
                                ? 0
                                : (detallesValoracion.Five /
                                    detallesValoracion.cant) *
                                  100
                            "
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4"> {{ detallesValoracion.Five }}</v-col>
                      </v-row>
                    </v-card-subtitle>
                    <v-card-subtitle class="ma-0 pa-0">
                      <v-row>
                        <v-col cols="4" class="pt-0">
                          <span>4 estrellas</span>
                        </v-col>
                        <v-col
                          cols="4"
                          class="pt-0 pl-0 pr-0"
                          align-self="center"
                        >
                          <v-progress-linear
                            color="secondary"
                            rounded
                            :value="
                              detallesValoracion.cant == 0
                                ? 0
                                : (detallesValoracion.Four /
                                    detallesValoracion.cant) *
                                  100
                            "
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4" class="pt-0" align-self="center">
                          {{ detallesValoracion.Four }}</v-col
                        >
                      </v-row></v-card-subtitle
                    >
                    <v-card-subtitle class="ma-0 pa-0">
                      <v-row>
                        <v-col cols="4" class="pt-0">
                          <span>3 estrellas</span>
                        </v-col>
                        <v-col
                          cols="4"
                          class="pt-0 pl-0 pr-0"
                          align-self="center"
                        >
                          <v-progress-linear
                            color="secondary"
                            rounded
                            :value="
                              detallesValoracion.cant == 0
                                ? 0
                                : (detallesValoracion.Three /
                                    detallesValoracion.cant) *
                                  100
                            "
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4" class="pt-0" align-self="center">
                          {{ detallesValoracion.Three }}</v-col
                        >
                      </v-row></v-card-subtitle
                    >
                    <v-card-subtitle class="ma-0 pa-0">
                      <v-row>
                        <v-col cols="4" class="pt-0">
                          <span>2 estrellas</span>
                        </v-col>
                        <v-col
                          cols="4"
                          class="pt-0 pl-0 pr-0"
                          align-self="center"
                        >
                          <v-progress-linear
                            color="secondary"
                            rounded
                            :value="
                              detallesValoracion.cant == 0
                                ? 0
                                : (detallesValoracion.Two /
                                    detallesValoracion.cant) *
                                  100
                            "
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4" class="pt-0" align-self="center">
                          {{ detallesValoracion.Two }}</v-col
                        >
                      </v-row></v-card-subtitle
                    >
                    <v-card-subtitle class="ma-0 pa-0"
                      ><v-row>
                        <v-col cols="4" class="pt-0">
                          <span>1 estrella</span>
                        </v-col>
                        <v-col
                          cols="4"
                          class="pt-0 pl-0 pr-0"
                          align-self="center"
                        >
                          <v-progress-linear
                            color="secondary"
                            rounded
                            :value="
                              detallesValoracion.cant == 0
                                ? 0
                                : (detallesValoracion.One /
                                    detallesValoracion.cant) *
                                  100
                            "
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4" class="pt-0" align-self="center">
                          {{ detallesValoracion.One }}</v-col
                        >
                      </v-row></v-card-subtitle
                    >
                  </v-col>
                </v-row>
              </v-card>
              <v-card
                v-scroll.self="onScroll"
                class="overflow-y-auto"
                :height="
                  this.$store.state.auth == true &&
                  this.$store.state.user.roles[0] == 'cliente'
                    ? 300
                    : 350
                "
                elevation="0"
              >
                <v-card-subtitle v-if="valoracionesLength == 0"
                  >No existen valoraciones aún</v-card-subtitle
                >

                <v-card
                  v-for="valoracion in detallesValoracion.Valoraciones"
                  :key="valoracion.id"
                  elevation="0"
                >
                  <v-card-subtitle class="pt-2 pb-1">
                    Por <strong>{{ valoracion.nombre_usuario }}</strong>
                  </v-card-subtitle>
                  <v-card-subtitle class="pt-1 pb-2">
                    <v-rating
                      background-color="warning"
                      color="warning"
                      dense
                      readonly
                      :value="valoracion.value"
                    ></v-rating
                  ></v-card-subtitle>
                  <v-card-text class="pb-2">{{
                    valoracion.comentario
                  }}</v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>
              </v-card>
              <v-card
                v-if="
                  this.$store.state.auth == true &&
                  this.$store.state.rolUser == 'cliente'
                "
                height="50"
                elevation="0"
                class=""
              >
                <v-card-title class="pb-0 pt-4 justify-end">
                  <v-btn
                    tile
                    outlined
                    class="cbtn"
                    dark
                    v-if="!isRating"
                    @click="valoracionDialog = true"
                    >Dejar tú valoración</v-btn
                  >
                  <span
                    v-if="isRating"
                    style="
                      font-size: 0.8em;
                      color: #dc3545;
                      font-family: montserrat;
                    "
                    >Usted ya ha valorado este producto</span
                  >
                </v-card-title>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="valoracionDialog"
      transition="dialog-bottom-transition"
      persistent
      max-width="600px"
    >
      <v-card class="white" elevation="0">
        <v-card-title class="justify-center">
          <h1 class="mb-4 mt-6 medtitt2">Deja tú valoración</h1>
        </v-card-title>
        <v-card-subtitle class="text-center">
          E ingresa tus comentarios sobre el producto
        </v-card-subtitle>

        <div class="mx-6 mt-1 pt-1 pb-3">
          <v-card-actions class="justify-center">
            <v-rating
              v-model="valoracionUsuario"
              background-color="warning "
              color="warning"
              large
              dense
            ></v-rating>
          </v-card-actions>
          <v-card-subtitle
            class="text-center pt-1"
            style="color: #ffc107"
            v-if="flagFaltaValoracion"
          >
            Favor ingresar una valoración mayor a 0
          </v-card-subtitle>
          <v-textarea
            ref="comentarios"
            v-model="comentariosValoración"
            counter
            auto-grow
            label="Comentarios"
            :rules="rules"
          ></v-textarea>

          <v-card-actions class="justify-end pt-4">
            <v-btn color="danger" dark tile text @click="cancelarValoración()">
              Cancelar
            </v-btn>
            <v-btn class="cbtn" dark tile outlined @click="valorarProducto()">
              Enviar valoración
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
import apexchart from "vue-apexcharts";
import { mapActions } from "vuex";
export default {
  components: {
    //LineChart,
    apexchart,
  },
  data() {
    return {
      flagAlert: false,
      errorAlert: false,
      textAlert: "",
      flagSearch: true,
      series: [
        {
          name: "Precio",
          data: [
            [new Date("2021/09/01").getTime(), 31.95],
            [new Date("2021/09/02").getTime(), 31.34],
            [new Date("2021/09/03").getTime(), 31.18],
            [new Date("2021/09/04").getTime(), 31.05],
            [new Date("2021/09/05").getTime(), 31.0],
            [new Date("2021/09/06").getTime(), 30.95],
          ],
        },
      ],

      chartOptions: {
        chart: {
          height: 400,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          defaultLocale: "es",
          locales: [
            {
              name: "es",
              options: {
                months: [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Augosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ],
                shortMonths: [
                  "Ene",
                  "Feb",
                  "Mar",
                  "Abr",
                  "May",
                  "Jun",
                  "Jul",
                  "Ago",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dic",
                ],
                days: [
                  "Domingo",
                  "Lunes",
                  "Martes",
                  "Miércoles",
                  "Jueves",
                  "Viernes",
                  "Sábado",
                ],
                shortDays: ["Dom", "Lun", "Mar", "Mir", "Jue", "Vie", "Sab"],
                toolbar: {
                  download: "Descargar SVG",
                  selection: "Selection",
                  selectionZoom: "Selection Zoom",
                  zoomIn: "Zoom In",
                  zoomOut: "Zoom Out",
                  pan: "Panning",
                  reset: "Reset Zoom",
                },
              },
            },
          ],
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "straight",
          dashArray: [0, 8, 5],
        },
        title: {
          text: "Historial últimos 15 días",
          align: "left",
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
        },
        markers: {
          size: 6,
          hover: {
            sizeOffset: 2,
          },
        },
        yaxis: {
          title: {
            text: "Precio",
          },
          labels: {
            minWidth: 40,
          },
        },
        xaxis: {
          /*categories: [
            "01 Jan",
            "02 Jan",
            "03 Jan",
            "04 Jan",
            "05 Jan",
            "06 Jan",
            "07 Jan",
            "08 Jan",
            "09 Jan",
            "10 Jan",
            "11 Jan",
            "12 Jan",
          ],*/
          title: {
            text: "Fecha",
          },
          type: "datetime",

          //min: Date.setDate(Date.getDate() - 14),
          // max: Date.getDate(),
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },

      data: [
        { fecha: "2021-06-21", precio: 10000 },
        { fecha: "2021-06-22", precio: 11000 },

        { fecha: "2021-06-24", precio: 11000 },
        { fecha: "2021-06-25", precio: 10000 },
        { fecha: "2021-06-26", precio: 10000 },
        { fecha: "2021-06-27", precio: 9000 },
        { fecha: "2021-06-28", precio: 9000 },
      ],
      rating: 4.5,
      url: "/api/public/getProducto/",
      urlH: "/api/public/getHistorial/",
      idProducto: 1,
      producto: "",
      product: {
        titulo: " ",
        descripcion: " ",
        precio: 1,
        imagen: " ",
        ubicacion: " ",
        link: " ",
        marketplace: " ",
        cantidadValoraciones: 0,
        valoracion: 0,
      },
      apariencia: false,
      scrollInvoked: 0,
      items: [
        {
          text: "Inicio",
          disabled: false,
          href: "/",
        },
        {
          text: "Búsqueda",
          disabled: false,
          href: "javascript:history.back()",
        },
        {
          text: "Producto",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
      itemsAux: [
        {
          text: "Inicio",
          disabled: false,
          href: "/",
        },
        {
          text: "Producto",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
      flagValoracionUsuario: true,
      valoracionDialog: false,
      rules: [
        (v) => v.length <= 250 || "Max 250 caractéres",
        (v) => !!v || "Los comentarios son requeridos",
      ],
      comentariosValoración: "",
      valoracionUsuario: 0,
      valoraciones: [
        {
          id: 1,
          value: 2,
          nombreUsuario: "Felipe",
          comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
        },
        {
          id: 2,
          value: 2,
          nombreUsuario: "Felipe",
          comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
        },
        {
          id: 3,
          value: 2,
          nombreUsuario: "Felipe",
          comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
        },
        {
          id: 4,
          value: 2,
          nombreUsuario: "Felipe",
          comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
        },
        {
          id: 5,
          value: 2,
          nombreUsuario: "Felipe",
          comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
        },
      ],

      cantidadPorEstrellas: [0, 0, 0, 0, 0],
      detallesValoracion: {
        Valoraciones: [],
        Five: 0,
        Four: 0,
        One: 0,
        Three: 0,
        Two: 0,
        avg: 0,
        cant: 0,
        code: 400,
      },
      isRating: false,
      valoracionesLength: 0,
      flagFaltaValoracion: false,
      onUserList: false,
      loadingMiLista: false,
    };
  },
  created() {
    this.flagSearch = this.$route.params.flag == "false" ? false : true;
    this.obtenerProducto();
  },
  beforeMount() {
    this.obtenerHistorialProducto();
    this.prepararCategoriasHistorial();
    this.obtenerUltimos15Dias();
  },
  async mounted() {
    //this.obtenerIsRating();

    await this.getUser();
    await this.obtenerDetailsRating();
    await this.obtenerIsRating();
    await this.obtenerOnUserList();
  },

  methods: {
    ...mapActions(["getUser"]),
    onScroll() {
      this.scrollInvoked++;
    },
    mostrarUnDecimal(num) {
      var aux = num.toFixed(1);
      return aux;
    },
    prepararCategoriasHistorial() {
      var auxCategorias = [];
      var aux = new Date();
      for (let index = 1; index <= this.obtenerDiasMes(); index++) {
        var mes = aux.getMonth() + 1;
        var nuevaFecha = index + "/" + mes;
        auxCategorias =
          auxCategorias.length == 0
            ? [nuevaFecha]
            : [...auxCategorias, nuevaFecha];
      }
      console.log("hola");
      console.log(auxCategorias);
      //this.chartOptions.xaxis.categories = auxCategorias;
    },
    obtenerDiasMes() {
      var aux = new Date();
      var cantDias = new Date(
        aux.getFullYear(),
        aux.getMonth() + 1,
        0
      ).getDate();
      return cantDias;
    },
    obtenerUltimos15Dias() {
      var date = new Date();
      date.setDate(date.getDate() - 14);
      var split = date.toISOString().split("T");
      //console.log(split[0]);
      return split[0];
    },
    async obtenerIsRating() {
      //await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      await axios
        .get(
          `/api/private/getIsRating/${this.$store.state.user.user.id}/${this.idProducto}`
        )
        .then((result) => {
          //console.log(result);
          this.isRating = result.data.isRating;
        })
        .catch((er) => {
          console.log(er);
        });
    },
    obtenerOnUserList() {
      axios
        .get(
          `/api/private/getOnUserList/${this.$store.state.user.user.id}/${this.idProducto}`
        )
        .then((result) => {
          //console.log(result);
          this.onUserList = result.data.onUserList;
        })
        .catch((er) => {
          console.log(er);
        });
    },
    async añadirProductoUserList() {
      this.loadingMiLista = true;
      let producto = {
        producto_id: parseInt(this.idProducto),
        usuario_id: this.$store.state.user.user.id,
      };

      await axios
        .post(`/api/private/postProductMiList`, producto)
        .then((result) => {
          console.log(result.data.message);
          this.loadingMiLista = false;
          this.flagAlert = true;
          this.errorAlert = false;
          this.textAlert = "Producto añadido correctamente.";
        })
        .catch((er) => {
          this.flagAlert = true;
          this.errorAlert = true;
          this.textAlert =
            "Ha ocurrido un error vuelva a intentarlo más tarde.";
          console.log(er);
          this.loadingMiLista = false;
        });
      await this.obtenerOnUserList();
    },

    async quitarProductoUserList() {
      this.loadingMiLista = true;
      await axios
        .delete(
          `/api/private/deleteProductMiList/${this.idProducto}/${this.$store.state.user.user.id}`
        )
        .then((result) => {
          console.log(result.data.message);
          this.loadingMiLista = false;
          this.flagAlert = true;
          this.errorAlert = false;
          this.textAlert = "Producto quitado correctamente.";
        })
        .catch((er) => {
          this.flagAlert = true;
          this.errorAlert = true;
          this.textAlert =
            "Ha ocurrido un error vuelva a intentarlo más tarde.";
          console.log(er);
          this.loadingMiLista = false;
        });
      await this.obtenerOnUserList();
    },

    async obtenerDetailsRating() {
      await axios
        .get(`/api/public/getDetailsRating/${this.idProducto}`)
        .then((result) => {
          this.detallesValoracion = result.data;
          this.valoracionesLength = result.data.Valoraciones.length;
          console.log(this.valoracionesLength);
          console.log(this.detallesValoracion);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    async obtenerProducto() {
      this.idProducto = this.$route.params.id;
      const ruta = this.url + this.idProducto;
      await axios
        .get(ruta)
        .then((result) => {
          const response = result.data.data;
          this.product.titulo = response.titulo;
          this.product.descripcion = response.descripcion;
          this.product.precio = response.precio;
          this.product.imagen = response.imagen;
          this.product.ubicacion = response.ubicacion;
          this.product.link = response.link;
          this.product.marketplace = response.marketplace;
          this.product.valoracion = response.valoracion;
          this.product.cantidadValoraciones = response.cantidad_valoraciones;
        })
        .catch((er) => {
          console.log(er);
        });
    },
    obtenerHistorialProducto() {
      var fechaAUX = this.obtenerUltimos15Dias();
      const ruta = this.urlH + this.idProducto;
      axios
        .get(ruta)
        .then((result) => {
          console.log(result.data);
          var aux = result.data.data;
          var valor = result.data.data.length;
          console.log(valor);
          var aux2 = [];
          var date = new Date(fechaAUX);
          for (let index = 0; index <= 15; index++) {
            var split = date.toISOString().split("T");
            var flag = false;
            for (let index = 0; index < valor; index++) {
              const element = aux[index];
              if (element.fecha == split[0]) {
                flag = true;
                aux2 =
                  aux2.length == 0
                    ? [[new Date(element.fecha).getTime(), element.precio]]
                    : [
                        ...aux2,
                        [new Date(element.fecha).getTime(), element.precio],
                      ];
                break;
              }
            }
            if (flag) {
              date.setDate(date.getDate() + 1);
            } else {
              aux2 =
                aux2.length == 0
                  ? [[new Date(split[0]).getTime(), null]]
                  : [...aux2, [new Date(split[0]).getTime(), null]];
              date.setDate(date.getDate() + 1);
            }
          }
          this.series[0].data = aux2;
        })
        .catch((er) => {
          console.log(er);
        });
    },

    async valorarProducto() {
      if (this.valoracionUsuario == 0) {
        this.flagFaltaValoracion = true;
      } else {
        if (this.$refs.comentarios.validate()) {
          let newValoracion = {
            value: this.valoracionUsuario,
            comentario: this.comentariosValoración,
            nombre_usuario: this.$store.state.user.user.name,
            nombre_producto: this.product.titulo,
            producto_id: parseInt(this.idProducto),
            usuario_id: this.$store.state.user.user.id,
          };
          console.log(newValoracion);

          await axios
            .post(`/api/private/postRating`, newValoracion)
            .then((result) => {
              console.log(result);
              this.cancelarValoración();
              this.flagAlert = true;
              this.errorAlert = false;
              this.textAlert = "Producto valorado correctamente.";
            })
            .catch((er) => {
              console.log(er);
              this.cancelarValoración();
              this.flagAlert = true;
              this.errorAlert = true;
              this.textAlert =
                "Ha ocurrido un error vuelva a intentarlo más tarde.";
            });
          await this.obtenerProducto();
          await this.obtenerDetailsRating();
          await this.obtenerIsRating();
        }
      }
    },
    cancelarValoración() {
      this.valoracionUsuario = 0;
      this.flagFaltaValoracion = false;
      this.valoracionDialog = false;
      this.$refs.comentarios.reset();
    },

    abrir(link) {
      window.open(link, "_blank");
    },
    goToProduct() {
      this.$router.push("/product");
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
.medtitt2 {
  font-size: 1.3em;
  color: #3d3d3d;
  font-family: montserrat;
  line-height: 1.3;
}
</style>