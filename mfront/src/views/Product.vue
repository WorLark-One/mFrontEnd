<template>
  <ProductBody />
</template>

<script>
import { mapActions } from "vuex";
import ProductBody from "../components/Bodys/Product";

export default {
  name: "Product",

  components: {
    ProductBody,
  },
  created() {
    this.$store.dispatch("colocarLayout");
  },
  async mounted() {
    await this.getUser();
  },
  methods: {
    ...mapActions(["getUser"]),
  },
};
</script>