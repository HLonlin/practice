<template>
  <div class="topBar_container">
    <van-nav-bar
      :title="titleText"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
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
  methods: {
    onClickLeft: function() {
      console.log("ClickLeft");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.topBar_container .van-nav-bar {
  background-color: #0090d8;
}
.topBar_container .van-nav-bar__placeholder,
.topBar_container .van-nav-bar__content {
  height: 44px !important;
}
.topBar_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.topBar_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
