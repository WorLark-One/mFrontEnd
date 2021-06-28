<template >
  <v-container style="background-color: #ffffff">
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
    <v-carousel hide-delimiters>
      <v-carousel-item
        src="https://comunidadc.cl/repoimg/default//2021/02/1612294088284620/1612820667912950-full.jpeg"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
            <strong>40% DE DESCUENTO</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item
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
        src="https://comunidadc.cl/repoimg/default//2021/02/1612402513126467/1612923231834849-full.jpeg"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
            <strong>40% DE DESCUENTO</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-divider></v-divider>
    <section class="mt-2 mb-5">
      <div class="pt-12 d-flex flex-row">
        <font-awesome-icon icon="fire" size="2x" />
        <h1 class="ml-2 mb-6">Tendencias</h1>
      </div>
      <div class="pl-4 pr-4 row">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <v-card>
            <v-img
              src="https://comunidadc.cl/repoimg/default//2021/02/1612294088284620/1612820317266484-full.jpeg"
              class="white--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <h1 class="text-center font-size">MAXIMA AMARILLO</h1>
              <div class="text-center">
                <v-btn href="/" class="white--text" outlined
                  >COMPRAR AHORA</v-btn
                >
              </div>

              <!--            <v-expand-transition>-->
              <!--              <div-->
              <!--                v-if="hover"-->
              <!--                class="d-flex transition-fast-in-fast-out orange darken-2 v-card&#45;&#45;reveal display-3 white&#45;&#45;text"-->
              <!--                style="height: 100%;"-->
              <!--              >-->

              <!--                <h3>Top Picks</h3><br/>-->
              <!--                <h3>sdfs</h3>-->
              <!--              </div>-->
              <!--            </v-expand-transition>-->
            </v-img>
          </v-card>
          <!--        </v-hover>-->
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <v-card>
            <v-img
              src="https://comunidadc.cl/repoimg/default//2021/02/1612294088284620/1612821978703376-full.jpeg"
              class="white--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <h1 class="text-center font-size">FUSION TURQUESA</h1>
              <div class="text-center">
                <v-btn href="/" class="white--text" outlined
                  >COMPRAR AHORA</v-btn
                >
              </div>
            </v-img>
          </v-card>
        </div>
      </div>
      <div class="pl-4 pr-4 row">
        <div class="col-md-4 col-sm-4 col-xs-12">
          <v-card outlined>
            <v-img
              src="https://comunidadc.cl/repoimg/default//2021/02/1612402513126467/1612922736479716-full.jpeg"
              class="white--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
            >
              <h1 class="text-center font-size">VESTIDO</h1>
              <div class="text-center mt-2">
                <v-btn class="white--text caption" href="/" text
                  >COMPRAR AHORA
                  <v-icon class="white--text caption"
                    >mdi-arrow-right</v-icon
                  ></v-btn
                >
              </div>
            </v-img>
          </v-card>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-12">
          <v-card outlined>
            <v-img
              src="https://comunidadc.cl/repoimg/default//2021/02/1612294088284620/1612821281152012-full.jpeg"
              class="white--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
            >
              <h1 class="text-center font-size">LINEA COLORES</h1>
              <div class="text-center mt-2">
                <v-btn class="white--text caption" href="/shop" text
                  >COMPRAR AHORA
                  <v-icon class="white--text caption"
                    >mdi-arrow-right</v-icon
                  ></v-btn
                >
              </div>
            </v-img>
          </v-card>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-12">
          <v-card outlined>
            <v-img
              src="https://comunidadc.cl/repoimg/default//2020/06/1592577160126937/1592598118938379-full.png"
              class="white--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
            >
              <h1 class="text-center font-size">
                Plan semanal básico Æ Consultor
              </h1>
              <div class="text-center mt-2">
                <v-btn class="white--text caption" href="/shop" text
                  >COMPRAR AHORA
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
</template>

<script>
import { mapMutations } from "vuex";
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
  }),

  created() {
    this.goToHome();
  },
  methods: {
    ...mapMutations(["stateFalseAppBarSearch"]),
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
  },
};
</script>

<style>
</style>