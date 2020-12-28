<template>
  <div class="container">
    <div class="search_panel">
      <search sourceOf="news"></search>
    </div>
  </div>
</template>

<script>
import search from "../../compoents/search";
export default {
  name: "news",
  components: {
    search
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
