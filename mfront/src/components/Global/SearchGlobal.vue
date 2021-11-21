<template >
  <div class="primary hidden-md-and-up">
    <v-col
      cols="12"
      class="hidden-md-and-up"
      v-if="$store.state.navUsuario == false"
    >
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
        item-text="nombre"
        item-value="nombre"
        label="Comuna"
        dark
        flat
        solo-inverted
        hide-details
        class="hidden-md-and-up pt-1"
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
    </v-col>
    <v-row v-if="$store.state.navUsuario == true">
      <v-col cols="2" sm="1"></v-col>
      <v-col cols="10" sm="11" class="pr-8">
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
          item-text="nombre"
          item-value="nombre"
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
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
    valoracionProductos: "0",
    pagina: 1,
  }),

  async mounted() {
    await this.obtenerComunas();
    await this.setComunas();
  },

  methods: {
    ...mapMutations(["stateFalseAppBarSearch"]),
    ...mapActions(["obtenerComunas"]),
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
            "&val=" +
            this.valoracionProductos +
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
            "&val=" +
            this.valoracionProductos +
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
    setComunas() {
      this.items = this.$store.state.comunas;
    },
  },
};
</script>

<style scoped>
</style>