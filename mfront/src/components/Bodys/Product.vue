<template>
  <div>
    <v-btn small elevation="0" @click="apariencia = !apariencia"
      >apariencia</v-btn
    >
    <v-card class="mt-4 mx-8 mb-8" v-if="apariencia == true">
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-img
            height="500"
            contain
            :src="
              product.marketplace == `marketmaule`
                ? `https://descubreelmaule.cl/wp-content/uploads/2020/11/Market-Maule.png`
                : product.imagen
            "
          />
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
    </v-card>
    <v-card class="mt-4 mx-8 mb-8" v-if="apariencia == false">
      <v-row>
        <v-col cols="12" md="6">
          <div class="px-4">
            <v-card-title class="px-0">{{ product.titulo }}</v-card-title>
            <!--<p class="display-1 mb-0"></p>-->
            <v-img
              height="300"
              contain
              :src="
                product.marketplace == `marketmaule`
                  ? `https://descubreelmaule.cl/wp-content/uploads/2020/11/Market-Maule.png`
                  : product.imagen
              "
            />
            <v-card-actions class="pa-0 mt-4">
              <p class="headline font-weight-light">
                <strong>${{ formatPrecio(product.precio) }}</strong>
              </p>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-card-actions class="pa-0 mt-0">
              <v-rating
                v-model="rating"
                readonly
                background-color="warning lighten-3"
                color="warning"
                dense
              ></v-rating>
              <span class="body-2 font-weight mr-6">4 Valoraciones</span>
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
          <v-tabs class="px-4">
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
              <line-chart
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
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import { LineChart } from "vue-morris";
export default {
  components: {
    LineChart,
  },
  data() {
    return {
      data: [
        { fecha: "2021-06-21", precio: 10000 },
        { fecha: "2021-06-22", precio: 11000 },
        { fecha: "2021-06-23", precio: 11000 },
        { fecha: "2021-06-24", precio: 11000 },
        { fecha: "2021-06-25", precio: 10000 },
        { fecha: "2021-06-26", precio: 10000 },
        { fecha: "2021-06-27", precio: 9000 },
        { fecha: "2021-06-28", precio: 9000 },
      ],
      rating: 4.5,
      url: "http://127.0.0.1:8000/api/public/getProducto/",
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
      },
      apariencia: false,
      scrollInvoked: 0,
    };
  },
  beforeMount() {
    this.obtenerProducto();
  },
  methods: {
    onScroll() {
      this.scrollInvoked++;
    },
    obtenerProducto() {
      this.idProducto = this.$route.params.id;
      axios.get(this.url + this.idProducto).then((result) => {
        const response = result.data.data;
        this.product.titulo = response.titulo;
        this.product.descripcion = response.descripcion;
        this.product.precio = response.precio;
        this.product.imagen = response.imagen;
        this.product.ubicacion = response.ubicacion;
        this.product.link = response.link;
        this.product.marketplace = response.marketplace;
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
