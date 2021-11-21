<template>
  <div>
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
    <v-row>
      <v-col cols="2" sm="1" md="3" lg="2"><adminNavigation /></v-col>
      <v-col cols="10" sm="11" md="9" lg="10">
        <div
          :class="this.$vuetify.breakpoint.smAndDown == true ? 'mr-4' : 'mr-14'"
        >
          <h1 class="mt-10 medtitt2">Gestionar comunas</h1>
          <v-divider class="primary mt-2 mb-5"></v-divider>
          <!--<div class="mt-8" v-if="cargando">
            <v-progress-linear
              v-if="cargando"
              indeterminate
              rounded
              height="6"
              color="primary"
            ></v-progress-linear>
          </div>-->
          <v-data-table
            :headers="headers2"
            :items="desserts2"
            :search="search2"
            :loading="cargando"
            :footer-props="{
              'items-per-page-text': 'Comunas por página',
            }"
            class="elevation-1 px-8 py-6"
          >
            <template v-slot:top class="">
              <v-toolbar flat>
                <v-text-field
                  v-model="search2"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialogR" max-width="500px" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="cbtn"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Agregar
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Agregar Comuna</span>
                    </v-card-title>
                    <v-card-text>
                      <v-form
                        ref="form"
                        v-model="valid"
                        @submit.prevent="saveComuna"
                      >
                        <v-select
                          v-model="select"
                          :items="regiones"
                          :rules="selectRules"
                          item-text="nombreRegion"
                          item-value="id"
                          label="Region"
                        ></v-select>

                        <v-text-field
                          v-model="editedItemComuna.nombre"
                          :rules="nameRules"
                          label="Nombre"
                        ></v-text-field>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="danger" text @click="close()">
                            Cancelar
                          </v-btn>
                          <v-btn
                            type="submit"
                            :loading="loading"
                            dark
                            color="cbtn"
                          >
                            Guardar
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editarComunaAux(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="eliminarComunaAux(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialogDelete" max-width="500px" persistent>
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

              <v-card-actions class="justify-end pt-4 pb-4">
                <v-btn
                  color="danger"
                  dark
                  tile
                  text
                  @click="resetEliminarComuna()"
                >
                  Cancelar
                </v-btn>
                <v-btn class="cbtn" dark @click="eliminarComuna()">
                  Eliminar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogEdit" max-width="500px" persistent>
            <v-card>
              <v-card-title>
                <span class="text-h5">Editar Región</span>
              </v-card-title>
              <v-card-text>
                <v-form
                  ref="form2"
                  v-model="valid2"
                  @submit.prevent="editarComuna"
                >
                  <v-select
                    v-model="select2"
                    :items="regiones"
                    :rules="selectRules"
                    item-text="nombreRegion"
                    item-value="id"
                    label="Region"
                  ></v-select>
                  <v-text-field
                    v-model="editedItemComunaAux.nombre"
                    :rules="nameRules"
                    label="Nombre"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="danger" text @click="resetEditarComuna()">
                      Cancelar
                    </v-btn>
                    <v-btn type="submit" :loading="loading2" dark color="cbtn">
                      Editar
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <div class="mb-16"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import adminNavigation from "../components/Global/AdminNavigation.vue";
import axios from "axios";
import { mapActions } from "vuex";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default {
  components: {
    adminNavigation,
  },
  data: () => ({
    flagAlert: false,
    errorAlert: false,
    textAlert: "",
    cargando: true,
    miLista: [],
    loadingMiLista: false,
    desserts2: [],
    search2: "",
    headers2: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      {
        text: "Nombre",
        value: "nombre",
        align: "center",
        sortable: false,
      },
      { text: "ID Región", value: "region_id", align: "center" },
      { text: "Nombre Región", value: "nombre_region", align: "center" },
      { text: "Última modificación", value: "updated_at", align: "center" },
      { text: "Acciones", value: "actions", align: "end", sortable: false },
    ],
    editedItemComuna: {
      nombre: "",
      region_id: -1,
      nombre_region: "",
    },
    editedItemComunaAux: {
      nombre: "",
      region_id: -1,
      nombre_region: "",
    },
    dialogR: false,
    valid: true,
    loading: false,
    selectRules: [(v) => !!v || "La región es requerida."],
    nameRules: [
      (v) => !!v || "Nombre es requerido",
      (v) => v.length <= 20 || "El nombre no debe tener más de 20 caracteres",
    ],
    dialogEdit: false,
    dialogDelete: false,
    eliminarComunaVar: "",

    editarComunaVar: "",

    valid2: true,
    loading2: false,
    regiones: [],
    select: "",
    select2: "",
  }),

  async mounted() {
    //this.obtenerRatings();
    this.$store.dispatch("navUsuarioActiva");
    await this.getUser();
    await this.redireccionar();
    await this.obtenerComunas();
    await this.obtenerRegiones();
  },
  methods: {
    ...mapActions(["getUser"]),
    redireccionar() {
      if (this.$store.state.auth == false) {
        this.$router.push("/");
      } else if (this.$store.state.rolUser != "cliente") {
        //this.$router.push("/");
      }
    },
    async obtenerRegiones() {
      await axios
        .get("/api/private/getRegion")
        .then((result) => {
          var aux = result.data.data;
          for (let index = 0; index < aux.length; index++) {
            let region = {
              nombreRegion: aux[index].nombre,
              id: aux[index].id,
            };
            this.regiones =
              this.regiones.length == 0 ? [region] : [...this.regiones, region];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async obtenerComunas() {
      await axios
        .get("/api/private/getComunas")
        .then((result) => {
          var aux = result.data.data;
          for (let index = 0; index < aux.length; index++) {
            aux[index].updated_at = this.splitFecha(aux[index].updated_at);
          }
          this.desserts2 = aux;

          this.cargando = false;
        })
        .catch((error) => {
          console.log(error);
          this.cargando = false;
        });
    },
    async saveComuna() {
      let data = {
        nombre: this.editedItemComuna.nombre,
        region_id: this.select,
      };
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.valid = true;
        await axios
          .post("/api/private/postComuna", data)
          .then(() => {
            this.flagAlert = true;
            this.errorAlert = false;
            this.textAlert = "Comuna agregada correctamente.";
            this.obtenerComunas();
            this.close();
          })
          .catch((error) => {
            if (
              error.response.data.message ==
              "Request not valid for create comune"
            ) {
              this.flagAlert = true;
              this.errorAlert = true;
              this.textAlert = "Favor ingresar datos válidos.";
            } else {
              this.flagAlert = true;
              this.errorAlert = true;
              this.textAlert =
                "Ha ocurrido un error vuelva a intentarlo más tarde.";
            }
            this.close();
          });
        this.loading = false;
      } else {
        this.valid = false;
        this.loading = false;
      }
    },
    close() {
      this.dialogR = false;
      this.editedItemComuna.nombre = "";
      this.editedItemComuna.region_id = -1;
      this.editedItemComuna.nombre_region = "";
      this.select = "";
      this.$refs.form.resetValidation();
    },
    splitFecha(fecha) {
      var aux = fecha.split("T");
      var aux2 = aux[0].split("-");
      var fechaAux = aux2[2] + " / " + aux2[1] + " / " + aux2[0];
      return fechaAux;
    },

    eliminarComunaAux(item) {
      this.dialogDelete = true;
      this.eliminarComunaVar = item;
    },

    async eliminarComuna() {
      await axios
        .delete(`/api/private/deleteComuna/${this.eliminarComunaVar.id}`)
        .then(() => {
          this.flagAlert = true;
          this.errorAlert = false;
          this.textAlert = "Comuna eliminada correctamente.";
          this.obtenerComunas();
          this.resetEliminarComuna();
        })
        .catch((error) => {
          console.log(error);
          this.flagAlert = true;
          this.errorAlert = true;
          this.textAlert =
            "Ha ocurrido un error vuelva a intentarlo más tarde.";
          this.cargando = false;
          this.resetEliminarComuna();
        });
    },

    resetEliminarComuna() {
      this.dialogDelete = false;
      this.eliminarComunaVar = "";
    },

    editarComunaAux(item) {
      this.dialogEdit = true;
      this.editarComunaVar = item.id;
      this.editedItemComunaAux.nombre = item.nombre;
      this.select2 = item.region_id;
    },
    async editarComuna() {
      let data = {
        nombre: this.editedItemComunaAux.nombre,
        region_id: this.select2,
      };
      await axios
        .put(`/api/private/updateComuna/${this.editarComunaVar}`, data)
        .then(() => {
          this.flagAlert = true;
          this.errorAlert = false;
          this.textAlert = "Comuna editada correctamente.";
          this.resetEditarComuna();
          this.obtenerComunas();
        })
        .catch((error) => {
          console.log(error);
          if (
            error.response.data.message == "Request not valid for update comune"
          ) {
            this.flagAlert = true;
            this.errorAlert = true;
            this.textAlert = "Favor ingresar datos válidos.";
          } else {
            this.flagAlert = true;
            this.errorAlert = true;
            this.textAlert =
              "Ha ocurrido un error vuelva a intentarlo más tarde.";
          }
          this.cargando = false;
          this.resetEditarComuna();
        });
    },

    resetEditarComuna() {
      this.dialogEdit = false;
      this.editarComunaVar = "";
      this.editedItemComunaAux.nombre = "";
      this.editedItemComunaAux.region_id = -1;
      this.editedItemComunaAux.nombre_region = "";
      this.select2 = "";
      this.$refs.form2.resetValidation();
    },

    prueba() {
      console.log("test");
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