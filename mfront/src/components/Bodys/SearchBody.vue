<template>
  <v-container>
    <v-row class="mt-6">
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
                src="data:image/jpeg;base64,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"
              ></v-img>

              <v-card-title>Audifonos </v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="3.2"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <div class="grey--text ml-4">3.2 (413)</div>
                </v-row>

                <div class="my-4 subtitle-1">$25000</div>

                <div>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit
                </div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-btn color="deep-purple lighten-2" text> Ir a comprar </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <input type="file" id="files" name="files[]" @change="handleFileSelect" />
    <div id="contenido-archivo">lista</div>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
//document.getElementById("file").addEventListener("change", readFile, false);

export default {
  data: () => ({
    product: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
    ],
    texto: "C:/Users/WorLark/PycharmProjects/Scrapingdata/lista_prueba.csv",
  }),
  created() {
    this.goToSearch();
  },
  methods: {
    ...mapMutations(["stateTrueAppBarSearch"]),
    goToSearch() {
      this.stateTrueAppBarSearch();
    },
    leerCsv() {
      //let reader = new FileReader();
    },
    handleFileSelect(event) {
      var file = event.target.files[0]; // FileList object
      // files is a FileList of File objects. List some properties.
      var lector = new FileReader();
      lector.onload = function (e) {
        var contenido = e.target.result;

        var aux = contenido.split("\n");
        for (let index = 1; index < aux.length; index++) {
          const element = aux[index];
          var aux2 = element.split("https");
          //console.log(element);
          //console.log(aux2);
          //var elemento = document.getElementById("contenido-archivo");
          var div = document.createElement("div");
          div.id = index;
          div.innerHTML =
            "<h1>" +
            aux2[0] +
            "</h1><a href=https" +
            aux2[1] +
            ">link producto</a>";
          //elemento.appendChild = div;
          document.body.appendChild(div);
        }
      };
      lector.readAsText(file);
    },
  },
};
</script>

<style>
</style>