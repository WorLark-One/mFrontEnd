<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center ml-5">
      <font-awesome-icon icon="shopping-basket" size="2x" />
    </div>
    <v-spacer></v-spacer>
    <v-card
      class="d-flex align-content-center"
      elevation="0"
      v-if="stateSearch"
      light
    >
      <v-row class="mx-6 py-1" align="center">
        <v-col cols="12" sm="6" class="mb-n6">
          <v-text-field label="Producto" dense></v-text-field>
        </v-col>
        <v-col cols="12" sm="5 " class="mb-n6">
          <v-select :items="items" label="Comuna" dense></v-select>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn color="secondary" fab small elevation="0">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-spacer></v-spacer>

    <v-btn outlined rounded class="mr-5">
      <font-awesome-icon icon="user" />
      <span class="ml-2">cuenta</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapState } from "vuex";
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
  }),

  computed: {
    ...mapState(["stateSearch"]),
  },

  methods: {},
};
</script>