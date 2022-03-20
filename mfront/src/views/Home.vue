<template>
  <HomeBody />
</template>

<script>
import { mapActions } from "vuex";
import HomeBody from "../components/Bodys/HomeBody";

export default {
  name: "Home",

  created() {
    this.$store.dispatch("navUsuarioDesactivada");
    this.$store.dispatch("colocarLayout");
  },
  async mounted() {
    await this.getUser();
  },
  components: {
    HomeBody,
  },
  methods: {
    ...mapActions(["getUser"]),
  },
};
</script>
