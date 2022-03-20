<template>
  <div>
    <v-row>
      <v-col cols="2" sm="1" md="3" lg="2"><adminNavigation /></v-col>
      <v-col cols="10" sm="11" md="9" lg="10">
        <div
          :class="this.$vuetify.breakpoint.smAndDown == true ? 'mr-4' : 'mr-14'"
        >
          <v-container class="px-12">
            <v-tabs fixed-tabs class="mt-2">
              <v-tab> Logs </v-tab>
              <v-tab> Comunas </v-tab>
              <v-tab> Regiones </v-tab>
              <v-tab> Otros </v-tab>
              <v-tab-item key="1">
                <v-card height="600px">
                  <v-card-title>Logs</v-card-title>
                </v-card>
              </v-tab-item>
              <v-tab-item key="2"> </v-tab-item>
              <v-tab-item key="3">
                <v-data-table
                  :headers="headers2"
                  :items="desserts2"
                  :search="search2"
                  :footer-props="{
                    'items-per-page-text': 'Regiones por página',
                  }"
                  class="elevation-1 px-8 py-6"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title
                        ><strong>Regiones</strong></v-toolbar-title
                      >
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-text-field
                        v-model="search2"
                        append-icon="mdi-magnify"
                        label="Buscar"
                        single-line
                        hide-details
                      ></v-text-field>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialogR" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Agregar región
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">Agregar Región</span>
                          </v-card-title>
                          <v-card-text>
                            <v-form @submit.prevent="saveRegion">
                              <v-text-field
                                v-model="editedItemRegion.identificadorRomano"
                                label="Número romano o equivalente"
                              ></v-text-field>

                              <v-text-field
                                v-model="editedItemRegion.nombre"
                                label="Nombre"
                              ></v-text-field>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="warning" text @click="close">
                                  Cancelar
                                </v-btn>
                                <v-btn type="submit" text color="primary">
                                  Guardar
                                </v-btn>
                              </v-card-actions>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-tab-item>
              <v-tab-item key="4">
                <v-card height="600px">
                  <v-card-title>Otros</v-card-title>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
//import { mapState } from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
import adminNavigation from "../components/Global/AdminNavigation.vue";
export default {
  components: {
    adminNavigation,
  },
  data: () => ({
    dialogR: false,
    dialog: false,
    search: "",
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "Nombre", value: "nombre", align: "center" },
      { text: "Región", value: "region", align: "center" },
      { text: "Última modificación", value: "updated_at", align: "center" },
      { text: "Acciones", value: "actions", align: "end", sortable: false },
    ],
    desserts: [],
    search2: "",
    headers2: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      {
        text: "Identificador Romano",
        value: "identificadorRomano",
        align: "center",
        sortable: false,
      },
      { text: "Nombre", value: "nombre", align: "center" },
      { text: "Última modificación", value: "updated_at", align: "center" },
      { text: "Acciones", value: "actions", align: "end", sortable: false },
    ],
    desserts2: [],
    editedIndex: -1,
    editedItem: {
      id: -1,
      nombre: "",
      region: "",
    },
    defaultItem: {
      id: -1,
      nombre: "",
      region: "",
    },
    editedItemRegion: {
      identificadorRomano: "",
      nombre: "",
    },
  }),

  computed: {
    //...mapState(["auth"]),

    formTitle() {
      return this.editedIndex === -1 ? "Nueva Comuna" : "Editar Comuna";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  beforeCreate() {
    if (
      this.$store.state.auth == false ||
      this.$store.state.user.roles[0] != "Administrator"
    ) {
      this.$router.push("/");
    }
  },
  mounted() {
    this.$store.dispatch("navUsuarioActiva");
  },
  created() {
    //this.initialize();
    //this.obtenerComunas();
    this.$store.dispatch("navUsuarioActiva");
    this.obtenerRegiones();
    //this.$store.dispatch("navUsuarioDesactivada");
    this.$store.dispatch("colocarLayout");
  },

  methods: {
    click() {
      console.log("click");
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem.id = item.id;
      this.editedItem.nombre = item.nombre;
      this.editedItem.region = item.region;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem.id = item.id;
      this.editedItem.nombre = item.nombre;
      this.editedItem.region = item.region;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete(`/api/private/deleteComuna/${this.editedItem.id}`)
        .then((result) => {
          console.log(result.data);
          this.obtenerComunas();
        })
        .catch((er) => {
          console.log(er.response.data);
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.dialogR = false;
      this.editedItemRegion = {
        identificadorRomano: "",
        nombre: "",
      };
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    saveRegion() {
      let data = {
        identificadorRomano: this.editedItemRegion.identificadorRomano,
        nombre: this.editedItemRegion.nombre,
      };
      axios
        .post("/api/private/postRegion", data)
        .then((result) => {
          console.log(result);
          this.obtenerRegiones();
        })
        .catch((error) => {
          console.log(error);
          this.close();
        });
      this.close();
    },

    save() {
      if (this.editedIndex > -1) {
        let data = {
          nombre: this.editedItem.nombre,
          region: this.editedItem.region,
        };
        axios
          .put(`/api/private/updateComuna/${this.editedItem.id}`, data)
          .then((result) => {
            console.log(result.data);
            this.obtenerComunas();
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      } else {
        let data = {
          nombre: this.editedItem.nombre,
          region: this.editedItem.region,
        };
        axios
          .post("/api/private/postComuna", data)
          .then((result) => {
            console.log(result.data);
            this.obtenerComunas();
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }

      this.close();
    },
    obtenerRegiones() {
      axios
        .get("/api/private/getRegion")
        .then((result) => {
          var aux = result.data.data;
          for (let index = 0; index < aux.length; index++) {
            aux[index].updated_at = this.splitFecha(aux[index].updated_at);
          }
          this.desserts2 = aux;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    obtenerComunas() {
      axios
        .get("/api/private/getComunas")
        .then((result) => {
          console.log(result.data.data);
          this.desserts = result.data.data;
          this.resetEdit();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    resetEdit() {
      this.editedIndex = -1;
      this.editedItem = {
        id: -1,
        nombre: "",
        region: "",
      };
    },
    splitFecha(fecha) {
      var aux = fecha.split("T");
      var aux2 = aux[0].split("-");
      var fechaAux = aux2[2] + " / " + aux2[1] + " / " + aux2[0];
      return fechaAux;
    },
  },
};
</script>

<style>
</style>