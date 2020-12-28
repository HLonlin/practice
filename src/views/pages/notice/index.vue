<template>
  <div class="container">
    <div class="search_panel">
      <search sourceOf="notice"></search>
    </div>
    <div class="noticeList_panel"></div>
  </div>
</template>

<script>
import search from "../../compoents/search";
export default {
  name: "notice",
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
<style scoped>
.noticeList_panel {
  box-sizing: border-box;
  padding: 0px 1rem;
}
</style>
