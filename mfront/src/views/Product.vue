<template>
  <ProductBody />
</template>

<script>
import ProductBody from "../components/Bodys/Product";

export default {
  name: "Product",

  components: {
    ProductBody,
  },
  created() {
    this.$store.dispatch("colocarLayout");
  },
};
</script>