<template>
  <div class="topBar_container">
    <div class="topBar_backBtn"></div>
    <div class="topBar_titleText">统计</div>
  </div>
</template>

<script>
export default {
  name: "topBar",
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
.topBar_container {
  width: 100%;
  height: 64px;
  background-color: #0090d7;
  position: relative;
}
.topBar_backBtn {
  width: 14px;
  height: 26px;
  background-color: #fff;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.topBar_titleText {
  font-size: 16px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
