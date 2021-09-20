<template>
  <div :class="this.$vuetify.breakpoint.smAndDown == true ? 'px-0' : 'px-12'">
    <v-breadcrumbs class="ml-2" :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <!--<v-card class="mt-4 mx-8 mb-8" elevation="2" v-if="apariencia == true">
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-img height="500" contain :src="product.imagen" />
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12 mt-4">
          <div class="pl-6">
            <p class="display-1 mb-0">{{ product.titulo }}</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">
                <strong>${{ formatPrecio(product.precio) }}</strong>
              </p>
              <v-spacer></v-spacer>
              <v-rating
                v-model="rating"
                readonly
                background-color="warning lighten-3"
                color="warning"
                dense
              ></v-rating>
              <span class="body-2 font-weight mr-6">5 Valoraciones</span>
            </v-card-actions>
            <v-card-subtitle style="font-size: 110%" class="mt-2 mb-0"
              >Descripción</v-card-subtitle
            >
            <v-card
              v-scroll.self="onScroll"
              class="overflow-y-auto mt-0"
              height="300"
              elevation="0"
            >
              <v-card-text
                class="subtitle-1 font-weight"
                v-html="product.descripcion"
              ></v-card-text>
            </v-card>
            <v-card-subtitle style="font-size: 110%"
              >Comuna: <strong>{{ product.ubicacion }}</strong></v-card-subtitle
            >
            <div class="mt-5">
              <v-btn
                class="primary white--text"
                outlined
                tile
                dense
                @click="abrir(product.link)"
                ><v-icon class="mr-4">mdi-cart</v-icon> Ir a comprar</v-btn
              >
              <v-btn class="ml-4" outlined tile>Añadir a mi lista</v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-4">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>Historial de precios</v-tab>
            <v-tab>Valoraciones</v-tab>
            <v-tab-item>
              <line-chart
                id="line2"
                :data="data"
                xkey="fecha"
                ykeys='["precio"]'
                line-colors='[ "#FF6384" ]'
                grid="true"
                grid-text-weight="blod"
                resize="true"
              >
              </line-chart>
            </v-tab-item>

            <v-tab-item>
              <v-list three-line="true" avatar="true" disabled>
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item inactive="true">
                    <v-list-item-avatar>
                      <v-img
                        src="https://www.pngfind.com/pngs/m/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Roberto</v-list-item-title
                      ><v-rating
                        v-model="rating"
                        class=""
                        background-color="warning lighten-3"
                        color="warning"
                        dense
                      ></v-rating>
                      <v-list-item-subtitle>
                        buen producto</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item inactive>
                    <v-list-item-avatar>
                      <v-img
                        src="https://www.pngfind.com/pngs/m/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Felipe</v-list-item-title
                      ><v-rating
                        v-model="rating"
                        class=""
                        background-color="warning lighten-3"
                        color="warning"
                        dense
                      ></v-rating>
                      <v-list-item-subtitle>
                        Buen producto</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
        </div>
      </div>
    </v-card>-->
    <v-card class="mt-4 mx-8 mb-8" elevation="12" v-if="apariencia == false">
      <v-row>
        <v-col cols="12" md="6">
          <div class="px-4">
            <v-card-title class="px-0">{{ product.titulo }}</v-card-title>
            <!--<p class="display-1 mb-0"></p>-->
            <v-img height="300" contain :src="product.imagen" />
            <v-card-actions class="pa-0 mt-4">
              <p class="headline font-weight-light">
                <strong>${{ formatPrecio(product.precio) }}</strong>
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
                <v-col cols="6" class="pr-1">
                  <v-btn
                    class="primary white--text"
                    outlined
                    tile
                    dense
                    block
                    @click="abrir(product.link)"
                    ><v-icon class="mr-4">mdi-cart</v-icon> Ir a comprar</v-btn
                  >
                </v-col>
                <v-col cols="6" class="pl-1">
                  <v-btn block outlined tile>Añadir a mi lista</v-btn>
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
            <v-tab>Historial de precios</v-tab>
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
            <v-tab-item>
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
                      <h1>{{ product.valoracion }}</h1>
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
                        {{ product.cantidadValoraciones }}
                        valoraciones</v-card-subtitle
                      >
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card-subtitle class="ma-0 pa-0">
                      <v-row>
                        <v-col cols="4" align-self="left">
                          <span>5 estrellas</span>
                        </v-col>
                        <v-col cols="4" class="pl-0 pr-0" align-self="center">
                          <v-progress-linear
                            color="secondary"
                            rounded
                            value="25"
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4"> 1</v-col>
                      </v-row>
                    </v-card-subtitle>
                    <v-card-subtitle class="ma-0 pa-0">
                      <v-row>
                        <v-col cols="4" class="pt-0" align-self="center">
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
                            value="75"
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4" class="pt-0" align-self="center">
                          3</v-col
                        >
                      </v-row></v-card-subtitle
                    >
                    <v-card-subtitle class="ma-0 pa-0">
                      <v-row>
                        <v-col cols="4" class="pt-0" align-self="center">
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
                            value="0"
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4" class="pt-0" align-self="center">
                          0</v-col
                        >
                      </v-row></v-card-subtitle
                    >
                    <v-card-subtitle class="ma-0 pa-0">
                      <v-row>
                        <v-col cols="4" class="pt-0" align-self="center">
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
                            value="0"
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4" class="pt-0" align-self="center">
                          0</v-col
                        >
                      </v-row></v-card-subtitle
                    >
                    <v-card-subtitle class="ma-0 pa-0"
                      ><v-row>
                        <v-col cols="4" class="pt-0" align-self="center">
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
                            value="0"
                          ></v-progress-linear
                        ></v-col>
                        <v-col cols="4" class="pt-0" align-self="center">
                          0</v-col
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
                <v-card
                  v-for="valoracion in valoraciones"
                  :key="valoracion.id"
                  elevation="0"
                >
                  <v-card-subtitle class="pt-2 pb-1">
                    Por <strong>{{ valoracion.nombreUsuario }}</strong>
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
                    valoracion.comentarios
                  }}</v-card-text>
                  <v-divider class="mx-4"></v-divider>
                </v-card>
              </v-card>
              <v-card
                v-if="
                  this.$store.state.auth == true &&
                  this.$store.state.user.roles[0] == 'cliente'
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
                    v-if="flagValoracionUsuario"
                    @click="valoracionDialog = true"
                    >Dejar tú valoración</v-btn
                  >
                  <span
                    v-if="!flagValoracionUsuario"
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
              class=""
              background-color="warning lighten-3"
              color="warning"
              large
              dense
            ></v-rating>
          </v-card-actions>
          <v-textarea
            counter
            auto-grow
            label="Comentarios"
            :rules="rules"
            :value="comentariosValoración"
          ></v-textarea>

          <v-card-actions class="justify-end pt-4">
            <v-btn
              color="danger"
              dark
              tile
              text
              @click="valoracionDialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              class="cbtn"
              dark
              tile
              outlined
              @click="valoracionDialog = false"
            >
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
//import { LineChart } from "vue-morris";
import apexchart from "vue-apexcharts";
export default {
  components: {
    //LineChart,
    apexchart,
  },
  data() {
    return {
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
      url: "http://localhost:8000/api/public/getProducto/",
      urlH: "http://localhost:8000/api/public/getHistorial/",
      idProducto: 1,
      producto: "",
      product: {
        titulo: " ",
        descripcion: " ",
        precio: " ",
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
      flagValoracionUsuario: true,
      valoracionDialog: false,
      rules: [(v) => v.length <= 250 || "Max 250 caractéres"],
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
    };
  },
  beforeMount() {
    this.obtenerProducto();
    this.obtenerHistorialProducto();
    this.prepararCategoriasHistorial();
    this.obtenerUltimos15Dias();
    //apexchart.chart = {

    //}
  },
  methods: {
    onScroll() {
      this.scrollInvoked++;
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
    obtenerProducto() {
      this.idProducto = this.$route.params.id;
      const ruta = this.url + this.idProducto;
      axios
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