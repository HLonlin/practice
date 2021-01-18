<template>
  <div class="chatrecordlist_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="聊天记录"
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
// 所有历史消息列表
export default {
  name: "chatrecordlist",
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
.chatrecordlist_container .van-nav-bar {
  background-color: #0090d8;
}
.chatrecordlist_container .van-nav-bar__placeholder,
.chatrecordlist_container .van-nav-bar__content {
  height: 44px !important;
}
.chatrecordlist_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.chatrecordlist_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
