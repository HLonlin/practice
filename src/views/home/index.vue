<template>
  <div class="app-wrapper">
    <topBar :titleText="toptitle"></topBar>
    <router-view class="router_container"></router-view>
    <tapList v-on:tap="tap"></tapList>
  </div>
</template>

<script>
import topBar from "../compoents/topBar";
import tapList from "../compoents/tapList";
export default {
  name: "layout",
  components: {
    topBar,
    tapList
  },
  data() {
    return {
      toptitle: "实习小匠"
    };
  },
  beforeCreate() {},
  created() {
    this.toptitle = this.$router.currentRoute.meta.title;
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    tap: function(val) {
      this.toptitle = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router_container {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 0px 51px 0px;
}
</style>
