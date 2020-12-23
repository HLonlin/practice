<template>
  <div class="topBar_container">
    <div class="topBar_titleText">{{ titleText }}</div>
  </div>
</template>

<script>
export default {
  name: "topBar",
  // 接受父组件的值
  props: {
    titleText: String, //在这里对传过来的进行接收
    required: true
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
.topBar_container {
  position: relative;
  width: 100%;
  height: 46px;
  background-color: #0090d7;
}
.topBar_container:before {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: rotate(45deg) translateY(-50%);
  width: 10px;
  height: 10px;
  content: "";
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
.topBar_titleText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #fff;
}
</style>
