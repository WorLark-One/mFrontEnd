<template>
  <div>
    <v-container class="mb-6 mt-6">
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-img
            max-height="500"
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
                ${{ formatPrecio(product.precio) }}
              </p>
              <v-spacer></v-spacer>
              <v-rating
                v-model="rating"
                class=""
                background-color="warning lighten-3"
                color="warning"
                dense
              ></v-rating>
              <span class="body-2 font-weight-thin">5 Valoraciones</span>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              <span
                class="subtitle-1 font-weight-thin"
                v-html="product.descripcion"
              ></span>
            </p>
            <div></div>
            <h4>Comuna: {{ product.ubicacion }}</h4>
            <div class="mt-5">
              <v-btn
                class="primary white--text"
                outlined
                tile
                dense
                @click="abrir(product.link)"
                ><v-icon class="mr-4">mdi-cart</v-icon> Ir a compar</v-btn
              >
              <v-btn class="ml-4" outlined tile>Añadir a mi lista</v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>Historial de precios</v-tab>
            <v-tab>Valoraciones</v-tab>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ultricies mi eget mauris pharetra et. Vel pretium lectus quam id
                leo in vitae turpis massa. Orci dapibus ultrices in iaculis
                nunc. At auctor urna nunc id cursus metus. Integer feugiat
                scelerisque varius morbi enim nunc. Aliquam sem et tortor
                consequat id porta nibh venenatis cras. Pellentesque pulvinar
                pellentesque habitant morbi tristique senectus et netus.
                Malesuada nunc vel risus commodo viverra maecenas. Neque
                volutpat ac tincidunt vitae semper quisss.
              </p>
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
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
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
    };
  },
  beforeMount() {
    this.obtenerProducto();
  },
  methods: {
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
