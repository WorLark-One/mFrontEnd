<template>
  <HomeBody />
</template>

<script>
import HomeBody from "../components/Bodys/HomeBody";

export default {
  name: "Home",

  created() {
    this.$store.dispatch("colocarLayout");
  },
  components: {
    HomeBody,
  },
};
</script>
