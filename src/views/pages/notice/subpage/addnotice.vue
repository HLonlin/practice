<template>
  <div class="addnotice_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="新增公告"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "addnotice",
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
      let that = this;
      that.$dialog.confirm({
        title: "温馨提示",
        message: "内容尚未保存，是否放弃？",
        beforeClose: (action, done) => {
          if (action === "confirm") {
            done();
            this.$router.go(-1);
          } else {
            done();
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
<style>
.addnotice_container .van-nav-bar {
  background-color: #0090d8;
}
.addnotice_container .van-nav-bar__placeholder,
.addnotice_container .van-nav-bar__content {
  height: 44px !important;
}
.addnotice_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.addnotice_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
