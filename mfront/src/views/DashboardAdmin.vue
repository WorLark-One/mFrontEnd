<template>
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
      <v-tab-item key="2">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :footer-props="{
            'items-per-page-text': 'Comunas por página',
          }"
          class="elevation-1 px-8 py-6"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title><strong>Comunas</strong></v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Agregar comuna
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form @submit.prevent="save">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.region"
                        label="Región"
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
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span style="font-size: 80%"
                      >¿Está seguro de que quiere eliminar esta comuna?</span
                    ></v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="primary" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-tab-item>
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
              <v-toolbar-title><strong>Regiones</strong></v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search2"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>

              <v-btn color="primary" dark class="mb-2"> Agregar región </v-btn>
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
</template>

<script>
//import { mapState } from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default {
  data: () => ({
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
      { text: "Número", value: "numero", align: "center", sortable: false },
      { text: "Nombre", value: "nombre", align: "center" },
      { text: "Última modificación", value: "updated_at", align: "center" },
      { text: "Acciones", value: "actions", align: "end", sortable: false },
    ],
    desserts2: [
      {
        id: 0,
        numero: "XV",
        nombre: "Arica y Parinacota",
        updated_at: "2021-07-15",
      },
      {
        id: 1,
        numero: "I",
        nombre: "Tarapacá",
        updated_at: "2021-07-15",
      },
      {
        id: 2,
        numero: "II",
        nombre: "Antofagasta",
        updated_at: "2021-07-15",
      },
      {
        id: 3,
        numero: "III",
        nombre: "Atacama",
        updated_at: "2021-07-15",
      },
      {
        id: 4,
        numero: "IV",
        nombre: "Coquimbo",
        updated_at: "2021-07-15",
      },
      {
        id: 5,
        numero: "V",
        nombre: "Valparaíso",
        updated_at: "2021-07-15",
      },
      {
        id: 6,
        numero: "RM",
        nombre: "Metropolitana",
        updated_at: "2021-07-15",
      },
      {
        id: 7,
        numero: "VI",
        nombre: "O'Higgins",
        updated_at: "2021-07-15",
      },
      {
        id: 8,
        numero: "VII",
        nombre: "Maule",
        updated_at: "2021-07-15",
      },
      {
        id: 9,
        numero: "VIII",
        nombre: "Bío Bío",
        updated_at: "2021-07-15",
      },
      {
        id: 10,
        numero: "IX",
        nombre: "Araucanía",
        updated_at: "2021-07-15",
      },
      {
        id: 11,
        numero: "XIV",
        nombre: "Los Ríos",
        updated_at: "2021-07-15",
      },
      {
        id: 12,
        numero: "X",
        nombre: "Los Lagos",
        updated_at: "2021-07-15",
      },
      {
        id: 13,
        numero: "XI",
        nombre: "Aysén",
        updated_at: "2021-07-15",
      },
      {
        id: 14,
        numero: "XII",
        nombre: "Magallanes",
        updated_at: "2021-07-15",
      },
    ],
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
  created() {
    //this.initialize();
    this.obtenerComunas();
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
    },

    closeDelete() {
      this.dialogDelete = false;
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
  },
};
</script>

<style>
</style>