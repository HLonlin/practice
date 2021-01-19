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
    <div v-if="!islogin">
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
              :placeholder="
                usertype == '1' ? '请输入密码' : '请输入身份证后6位'
              "
              class="login_input"
            />
          </div>
          <div class="login_button" @click="login">登录</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="login_headImgPanel">
        <img
          class="login_headImg"
          :src="
            userData.logo
              ? userData.logo
              : require('@/assets/images/default.png')
          "
        />
        <p class="login_userName">{{ userData.username }}</p>
      </div>
      <div class="entSelect_panel">
        <div
          class="entSelect_banzhurenBtn"
          @click="routerTo('statistics')"
          v-show="userData.banzurenPermission"
        >
          班主任入口
        </div>
        <div
          class="entSelect_xibuBtn"
          @click="routerTo('sdept')"
          v-show="userData.xibuPermission"
        >
          系部入口
        </div>
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
      userData: Object,
      islogin: false,
      usertype: "1", // 账号类型，必填 1=教师，2=学生
      userid: "lyy",
      passwd: "0513LyyL"
      // userid: "admin", // 登录号，必填，教师：oa账号，学生：手机号
      // passwd: "gz020slitsXX", // 登录密码，必填，教师：oa密码，学生：身份证号后6位
      // userid: "440105200012210933", // 登录号，必填，教师：oa账号，学生：手机号
      // passwd: "210933" // 登录密码，必填，教师：oa密码，学生：身份证号后6位
    };
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
    onClickLeft: function() {},
    login: function() {
      let that = this;
      this.$toast.loading({
        message: "登录中..."
      });
      that.$axios
        .post(that.$api.login, {
          usertype: that.usertype,
          userid: that.userid,
          passwd: that.passwd
        })
        .then(res => {
          if (res.status !== 200) {
            return;
          }
          that.userData = res.data;
          if (that.usertype == "1") {
            that.$axios.post(that.$api.getuserInfo_teacher, {}).then(res => {
              //班主任、系部入口
              that.islogin = true;
              that.userData["isTeacher"] = true;
              for (let key in res.data) {
                that.userData[key] = res.data[key];
              }
              this.$tool.setLocal("userData", that.userData);
            });
          } else {
            // 学生
            that.userData["isTeacher"] = false;
            this.$tool.setLocal("userData", that.userData);
            this.$router.replace({ path: "/signin" });
          }
          this.$toast.clear();
          this.$tool.setLocal("token", res.data.tokenid);
        });
    },
    routerTo: function(path, params) {
      this.$router.replace({ path: path });
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
.login_headImgPanel {
  box-sizing: border-box;
  padding: 90px 0px 60px 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.login_headImg {
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  display: flex;
  align-self: center;
}
.login_userName {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
  box-sizing: border-box;
  padding: 8px 0px 0px 0px;
}
.entSelect_panel {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.entSelect_banzhurenBtn,
.entSelect_xibuBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18.75rem;
  height: 47px;
  background-color: #0090d8;
  border-radius: 1.5rem;
  box-sizing: border-box;
  margin: 0px 0px 20px 0px;
  font-size: 1.125rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
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
