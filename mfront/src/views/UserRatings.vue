<template>
  <div>
    <v-row>
      <v-col cols="2" sm="2" md="3"><usernavigation /></v-col>
      <v-col cols="10" sm="10" md="9">
        <h1 class="mt-10 medtitt2">Mis valoraciones</h1>
        <v-divider class="primary mt-2 mr-8"></v-divider>

        <v-card
          v-for="valoracion in valoraciones"
          :key="valoracion.id"
          elevation="0"
          class="mt-2 mb-2"
        >
          <v-card-subtitle class="pl-0 pt-2 pb-1">
            Producto <strong>{{ valoracion.nombreProducto }}</strong>
          </v-card-subtitle>
          <v-card-subtitle class="pl-0 pt-1 pb-1">
            Realizada el <strong>{{ valoracion.fecha }}</strong>
          </v-card-subtitle>
          <v-card-subtitle class="pl-0 pt-2 pb-2">
            <v-rating
              background-color="warning lighten-3"
              color="warning"
              dense
              readonly
              :value="valoracion.value"
            ></v-rating
          ></v-card-subtitle>
          <v-card-text class="pl-0 pb-2">{{
            valoracion.comentarios
          }}</v-card-text>
          <v-card-actions class="justify-end pb-2 mr-8">
            <v-btn
              text
              dark
              color="danger"
              @click="eliminarValoracion(valoracion)"
            >
              Eliminar</v-btn
            >
            <v-btn
              dark
              color="cbtn"
              @click="rellenarEditarValoracion(valoracion)"
            >
              Editar
            </v-btn>
          </v-card-actions>

          <v-divider class="pl-0 mr-8"></v-divider>
        </v-card>
        <div class="mb-8"></div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="valoracionDialog"
      transition="dialog-bottom-transition"
      persistent
      max-width="600px"
    >
      <v-card class="white" elevation="0">
        <v-card-title class="justify-center">
          <h1 class="mb-4 mt-6 medtitt2">Edita tú valoración</h1>
        </v-card-title>
        <v-card-subtitle class="text-center">
          y/o tus comentarios sobre el producto
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
              @click="resetEditarValoracion()"
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
              Editar valoración
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="valoracionDialogEliminar"
      transition="dialog-bottom-transition"
      persistent
      max-width="600px"
    >
      <v-card class="white" elevation="0">
        <v-card-title class="justify-center">
          <h1
            :class="
              this.$vuetify.breakpoint.xs
                ? 'mb-4 mt-6 medtitt5'
                : 'mb-4 mt-6 medtitt4'
            "
          >
            Estas seguro que la deseas eliminar?
          </h1>
        </v-card-title>

        <v-card-actions class="justify-end pt-4">
          <v-btn
            color="danger"
            dark
            tile
            text
            @click="valoracionDialogEliminar = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="cbtn"
            dark
            tile
            outlined
            @click="eliminarValoracionAux()"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import usernavigation from "../components/Global/UserNavigation.vue";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default {
  components: {
    usernavigation,
  },
  data: () => ({
    items: [
      { title: "Perfil", icon: "mdi-view-dashboard" },
      { title: "Mi lista", icon: "mdi-image" },
      { title: "Mis valoraciones", icon: "mdi-help-box" },
    ],
    right: null,
    rating: 5,
    valoraciones: [
      {
        id: 1,
        value: 2,
        fecha: "2021-09-19",
        nombreProducto: "Felipe",
        comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
      },
      {
        id: 2,
        value: 2,
        fecha: "2021-09-19",
        nombreProducto: "Felipe",
        comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
      },
      {
        id: 3,
        value: 2,
        fecha: "2021-09-19",
        nombreProducto: "Felipe",
        comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
      },
      {
        id: 4,
        value: 2,
        fecha: "2021-09-19",
        nombreProducto: "Felipe",
        comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
      },
      {
        id: 5,
        value: 2,
        fecha: "2021-09-19",
        nombreProducto: "Felipe",
        comentarios: "lorem asdjkaslkdjkasksadjfioian ashdkashfka",
      },
    ],
    valoracionDialog: false,
    rules: [(v) => v.length <= 250 || "Max 250 caractéres"],
    comentariosValoración: "",
    valoracionUsuario: 0,
    valoracionDialogEliminar: false,
    valoracionEliminar: -1,
  }),
  beforeCreate() {
    if (this.$store.state.auth == false) {
      this.$router.push("/");
    } else if (this.$store.state.user.roles[0] != "cliente") {
      //this.$router.push("/");
    }
  },

  methods: {
    rellenarEditarValoracion(valoracion) {
      this.valoracionDialog = true;
      this.comentariosValoración = valoracion.comentarios;
      this.valoracionUsuario = valoracion.value;
    },
    resetEditarValoracion() {
      this.valoracionDialog = false;
      this.comentariosValoración = "";
      this.valoracionUsuario = 0;
    },
    eliminarValoracion(valoracion) {
      this.valoracionEliminar = valoracion.id;
      this.valoracionDialogEliminar = true;
    },
    eliminarValoracionAux() {
      console.log("valoracion eliminada: " + this.valoracionEliminar);
      this.valoracionDialogEliminar = false;
    },
  },
};
</script>

<style scoped>
.medtitt2 {
  font-size: 1.5em;
  color: #3d3d3d;
  font-family: montserrat;
  line-height: 1.3;
}
.medtitt4 {
  font-size: 0.8em;
  color: #3d3d3d;
  font-family: montserrat;
  line-height: 1.3;
}
.medtitt5 {
  font-size: 0.6em;
  color: #3d3d3d;
  font-family: montserrat;
  line-height: 1.3;
}
</style>