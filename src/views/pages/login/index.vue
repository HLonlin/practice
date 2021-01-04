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
    <div class="login_panel">
      <div class="login_bgPanel"></div>
      <div class="login_itemBox">
        <div class="login_tabbar">
          <div
            class="login_tabbarItem"
            :class="{ login_tabbarActive: usertype == '1' }"
            @click="usertype = '1'"
          >
            教师
          </div>
          <div
            class="login_tabbarItem"
            :class="{ login_tabbarActive: usertype == '2' }"
            @click="usertype = '2'"
          >
            学生
          </div>
        </div>
        <div class="login_account">
          <i class="iconItem icon_denglu-zhanghaotubiao loginIcon"></i>
          <van-field
            v-model="userid"
            :placeholder="usertype == '1' ? '请输入账号' : '请输入手机号码'"
            class="login_input"
          />
        </div>
        <div class="login_password">
          <i class="iconItem icon_denglu-mimatubiao loginIcon"></i>
          <van-field
            v-model="passwd"
            type="password"
            :placeholder="usertype == '1' ? '请输入密码' : '请输入身份证后6位'"
            class="login_input"
          />
        </div>
        <div class="login_button" @click="login">登录</div>
      </div>
    </div>
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
      usertype: "1", // 账号类型，必填 1=教师，2=学生
      userid: "", // 登录号，必填，教师：oa账号，学生：手机号
      passwd: "" // 登录密码，必填，教师：oa密码，学生：身份证号后6位
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
    onClickLeft: function() {},
    login: function() {
      let that = this;
      that.$axios({
        methods: "post",
        url: that.$api.login,
        data: { userid: that.userid, passwd: that.passwd }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
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
.login_panel {
  position: relative;
  width: 100%;
  height: 350px;
  box-sizing: border-box;
  padding: 0px 1rem;
  background-color: #ffffff;
  overflow: hidden;
}
.login_bgPanel {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 110%;
  height: 200px;
  background-color: #0090d8;
  border-radius: 50%;
}
.login_itemBox {
  position: relative;
  z-index: 1;
  width: 100%;
  background: #ffffff;
  border-radius: 0.625rem;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 0px 1.375rem 20px 1.375rem;
}
.login_tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.25rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
}
.login_tabbarItem {
  position: relative;
  width: 50%;
  text-align: center;
  box-sizing: border-box;
  padding: 40px 0px 5px 0px;
}
.login_tabbarActive {
  color: #0090d8;
}
.login_tabbarActive::after {
  position: absolute;
  content: "";
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 2.5rem;
  height: 2px;
  background-color: #0090d8;
}
.login_account,
.login_password {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 32px 0px 10px 0px;
  border-bottom: 1px solid #eeeeee;
}
.loginIcon {
  width: 20px;
  color: #0090d8;
  font-size: 19px;
}
.login_button {
  margin-top: 50px;
  margin-bottom: 20px;
  width: 100%;
  height: 47px;
  border-radius: 1.5rem;
  text-align: center;
  font-size: 1.125rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  background-color: #0090d8;
  line-height: 47px;
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
.login_container .van-field {
  padding: 0px 0px 0px 0.75rem;
}
</style>
