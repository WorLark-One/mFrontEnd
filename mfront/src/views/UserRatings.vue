<template>
  <div>
    <v-row>
      <v-col cols="2" sm="2" md="3"><usernavigation /></v-col>
      <v-col cols="10" sm="10" md="9">
        <h1 class="mt-10 medtitt2">Mis valoraciones</h1>
        <v-divider class="primary mt-2 mr-8"></v-divider>
        <v-card v-if="valoraciones.length == 0" height="300" elevation="0">
          <v-card-subtitle class="pl-0 pt-2 pb-1">
            Usted no tiene valoraciones registradas.
          </v-card-subtitle>
        </v-card>

        <v-card
          v-for="valoracion in valoraciones"
          :key="valoracion.id"
          elevation="0"
          class="mt-2 mb-2"
        >
          <v-card-subtitle class="pl-0 pt-2 pb-1">
            Producto
            <a @click="goToProduct(valoracion.producto_id)"
              ><strong>{{ valoracion.nombre_producto }}</strong></a
            >
          </v-card-subtitle>
          <v-card-subtitle class="pl-0 pt-1 pb-1">
            Realizada el
            <strong>{{ formatoFecha(valoracion.updated_at) }}</strong>
          </v-card-subtitle>
          <v-card-subtitle class="pl-0 pt-2 pb-2">
            <v-rating
              background-color="warning "
              color="warning"
              dense
              readonly
              :value="valoracion.value"
            ></v-rating
          ></v-card-subtitle>
          <v-card-text class="pl-0 pb-2">{{
            valoracion.comentario
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
            ref="comentarios"
            counter
            v-model="comentariosValoración"
            auto-grow
            label="Comentarios"
            :rules="rules"
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
            <v-btn class="cbtn" dark tile outlined @click="updateValoración()">
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
            @click="resetEliminarValoracion()"
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
import { mapActions } from "vuex";
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
    valoraciones: [],
    valoracionDialog: false,
    rules: [
      (v) => v.length <= 250 || "Max 250 caractéres",
      (v) => !!v || "Los comentarios son requeridos",
    ],

    valoracionDialogEliminar: false,
    valoracionEliminar: -1,
    idUsuarioEliminar: 0,
    //importante
    idValoracion: -1,
    valoracionUsuario: 0,
    comentariosValoración: "",
    nombre_usuario: "",
    nombre_producto: "",
    producto_id: -1,
    usuario_id: -1,
  }),
  beforeCreate() {
    if (this.$store.state.auth == false) {
      this.$router.push("/");
    } else if (this.$store.state.user.roles[0] != "cliente") {
      //this.$router.push("/");
    }
  },
  mounted() {
    this.obtenerRatings();
  },

  methods: {
    ...mapActions(["getUser"]),
    redireccionar() {},
    rellenarEditarValoracion(valoracion) {
      this.valoracionDialog = true;
      this.idValoracion = valoracion.id;
      //importante
      this.valoracionUsuario = valoracion.value;
      this.comentariosValoración = valoracion.comentario;
      this.nombre_usuario = this.$store.state.user.user.name;
      this.nombre_producto = valoracion.nombre_producto;
      this.producto_id = valoracion.producto_id;
      this.usuario_id = this.$store.state.user.user.id;
    },
    resetEditarValoracion() {
      this.valoracionDialog = false;
      this.idValoracion = -1;
      //importante
      this.valoracionUsuario = 0;
      this.comentariosValoración = "";
      this.nombre_usuario = "";
      this.nombre_producto = "";
      this.producto_id = -1;
      this.usuario_id = -1;
    },
    eliminarValoracion(valoracion) {
      this.valoracionEliminar = valoracion.id;
      this.idUsuarioEliminar = this.$store.state.user.user.id;
      this.valoracionDialogEliminar = true;
    },
    resetEliminarValoracion() {
      this.valoracionEliminar = -1;
      this.idUsuarioEliminar = 0;
      this.valoracionDialogEliminar = false;
    },
    async eliminarValoracionAux() {
      await axios
        .delete(
          `/api/private/deleteRating/${this.valoracionEliminar}/${this.idUsuarioEliminar}`
        )
        .then((result) => {
          console.log(result);
          this.resetEliminarValoracion();
        })
        .catch((er) => {
          console.log(er);
        });
      await this.obtenerRatings();
    },
    async obtenerRatings() {
      //await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      await axios
        .get(`/api/private/getRatingUser/${this.$store.state.user.user.id}`)
        .then((result) => {
          console.log(result);
          this.valoraciones = result.data.data;
        })
        .catch((er) => {
          console.log(er);
        });
    },

    async updateValoración() {
      if (this.$refs.comentarios.validate()) {
        let newValoracion = {
          value: this.valoracionUsuario,
          comentario: this.comentariosValoración,
          nombre_usuario: this.nombre_usuario,
          nombre_producto: this.nombre_producto,
          producto_id: this.producto_id,
          usuario_id: this.usuario_id,
        };
        console.log("aaaaaaaa");
        console.log(newValoracion);
        await axios
          .put(`/api/private/updateRating/${this.idValoracion}`, newValoracion)
          .then((result) => {
            console.log(result);
            this.resetEditarValoracion();
          })
          .catch((er) => {
            console.log(er);
          });
        await this.obtenerRatings();
      }
    },

    formatoFecha(fecha) {
      var aux = fecha.split("T");
      return aux[0];
    },
    goToProduct(id) {
      var link = `http://localhost:8080/#/product/${id}`;
      window.open(link, "_blank");
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