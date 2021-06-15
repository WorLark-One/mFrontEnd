<template>
  <div>
    <v-container class="mb-5">
      <div class="row">
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
            <v-card-title class="pb-0">Por valoraciones</v-card-title>
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
            <v-btn block>APLICAR FILTROS</v-btn>
            <v-divider></v-divider>
          </v-card>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12">
          <v-row dense class="mt-2 mb-1">
            <v-col cols="12" sm="8" class="pl-2 pt-6">
              <small>Mostrando 15 de 100 productos</small>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                class="pa-0"
                v-model="select"
                :items="options"
                style="margin-bottom: -20px"
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <div class="row text-center mt-2">
            <div
              class="col-md-3 col-sm-6 col-xs-12"
              :key="pro.id"
              v-for="pro in products"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="500"
                  height="300"
                >
                  <v-img
                    class="white--text align-self-star"
                    :aspect-ratio="16 / 9"
                    height="200px"
                    :src="pro.imagen"
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
                  <v-card-text class="text--primary">
                    <div>
                      <a
                        @click="goToProduct(pro.id)"
                        style="text-decoration: none"
                        >{{ pro.titulo }}</a
                      >
                    </div>
                    <div>${{ pro.precio }}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
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
export default {
  data: () => ({
    url: "http://127.0.0.1:8000/api/public/getProductos",
    range: [0, 10000],
    select: "Precio: Menor a Mayor",
    options: [
      "Descuento",
      "Tendencia",
      "Precio: Menor a Mayor",
      "Precio: Mayor a Menor",
    ],
    page: 1,
    breadcrums: [
      {
        text: "Home",
        disabled: false,
        href: "breadcrumbs_home",
      },
      {
        text: "Clothing",
        disabled: false,
        href: "breadcrumbs_clothing",
      },
      {
        text: "T-Shirts",
        disabled: true,
        href: "breadcrumbs_shirts",
      },
    ],
    min: 0,
    max: 10000,
    items: [
      {
        id: 2,
        name: "Shoes",
        children: [
          { id: 2, name: "Casuals" },
          { id: 3, name: "Formals" },
          { id: 4, name: "Sneakers" },
        ],
      },
      {
        id: 1,
        name: "Clothing",
        children: [
          { id: 5, name: "Shirts" },
          { id: 6, name: "Tops" },
          { id: 7, name: "Tunics" },
          { id: 8, name: "Bodysuit" },
        ],
      },
    ],
    products: [],
  }),

  beforeMount() {
    this.obtenerProductos();
  },
  methods: {
    obtenerProductos() {
      axios.get(this.url).then((result) => {
        const response = result.data.data;
        this.products = response;
        //for (let index = 0; index < response.length; index++) {
        //const element = response[index];
        //const producto = {}
        //}
      });
    },
    abrir(link) {
      window.open(link, "_blank");
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
