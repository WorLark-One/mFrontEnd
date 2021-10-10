<template>
  <SearchBody />
</template>

<script>
import { mapActions } from "vuex";
import SearchBody from "../components/Bodys/Shop.vue";

export default {
  name: "search",

  components: {
    SearchBody,
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
