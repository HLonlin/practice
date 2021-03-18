<template>
  <div class="updaterecord_wrapper">
    <div class="topbar_panel">
      <van-nav-bar
        title="修改记录"
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
  name: "updaterecord",
  data: function() {
    return {};
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    }
  },
  watch: {},
  computed: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
<!-- You need to override the style of the frame -->
<style>
.updaterecord_wrapper .van-nav-bar {
  background-color: #0090d8;
}
.updaterecord_wrapper .van-nav-bar__placeholder,
.updaterecord_wrapper .van-nav-bar__content {
  height: 44px !important;
}
.updaterecord_wrapper .van-nav-bar .van-icon {
  color: #ffffff;
}
.updaterecord_wrapper .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
