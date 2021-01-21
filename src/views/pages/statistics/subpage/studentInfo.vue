<template>
  <div class="studentInfo_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="学生信息"
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
  name: "studentInfo",
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
.studentInfo_container .van-nav-bar {
  background-color: #0090d8;
}
.studentInfo_container .van-nav-bar__placeholder,
.studentInfo_container .van-nav-bar__content {
  height: 44px !important;
}
.studentInfo_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.studentInfo_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
