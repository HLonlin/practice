<template>
  <div class="evaluateStudent_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="学生月度操行评定"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "evaluateStudent",
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
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
<style>
.evaluateStudent_container .van-nav-bar {
  background-color: #0090d8;
}
.evaluateStudent_container .van-nav-bar__placeholder,
.evaluateStudent_container .van-nav-bar__content {
  height: 44px !important;
}
.evaluateStudent_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.evaluateStudent_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
