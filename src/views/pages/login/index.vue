<template>
  <div class="login_container">
    <van-nav-bar
      title="登录"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="logo_panel">
      <img class="logo" src="../../../assets/images/logo.png" />
    </div>
    <div class="login_panel"></div>
  </div>
</template>

<script>
/**
 * 登录页
 */
export default {
  name: "login",
  data() {
    return {
      logotype: "teacher" // teacher、student、department
    };
  },
  beforeCreate() {},
  created() {
    let that = this;
    // setTimeout(() => {
    //   let url = that.$route.query.redirect || "/";
    //   this.$store.commit("addState", {
    //     key: "tokenid",
    //     val: url
    //   });
    //   that.$router.replace(url);
    // }, 1000);
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo_panel {
  width: 100%;
  height: 130px;
  background-color: #0090d8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 5rem;
  height: 5rem;
  border-radius: 0.9375rem;
  background-color: #ffffff;
}
</style>
<style>
.login_container .van-nav-bar {
  background-color: #0090d8;
}
.login_container .van-nav-bar__placeholder,
.login_container .van-nav-bar__content {
  height: 44px !important;
}
.login_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.login_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
