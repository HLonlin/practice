<template>
  <div class="login_container">
    <van-nav-bar
      title="登录"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      :left-arrow="usertype == '3'"
      @click-left="onClickLeft"
    />
    <div v-if="!islogin">
      <div class="logo_panel">
        <img class="logo" src="../../../assets/images/logo.png" />
      </div>
      <div class="login_panel">
        <div class="login_bgPanel"></div>
        <div class="login_itemBox" v-show="usertype != '3'">
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
              :placeholder="usertype == '1' ? '请输入账号' : '请输入身份证号码'"
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
          <div class="login_bind" v-if="false" @click="usertype = '3'">
            <!-- <div
            class="login_bind"
            v-if="usertype == '2'"
            @click="usertype = '3'"
          > -->
            绑定公众号
          </div>
        </div>
        <div class="login_itemBox" v-show="usertype == '3'">
          <div class="login_account">
            <i class="iconItem icon_denglu-zhanghaotubiao loginIcon"></i>
            <van-field
              v-model="bindid"
              :placeholder="'请输入身份证号码'"
              class="login_input"
              :formatter="bindidFormatter"
              format-trigger="onBlur"
            />
          </div>
          <div class="login_password">
            <i class="iconItem icon_shoujihaotubiao loginIcon"></i>
            <van-field
              v-model="bindphone"
              :placeholder="'请输入手机号码'"
              class="login_input"
              :formatter="bindphoneFormatter"
              format-trigger="onBlur"
            />
          </div>
          <div class="login_password">
            <i class="iconItem icon_yanzhengmatubiao loginIcon"></i>
            <van-field
              v-model="bindcode"
              :placeholder="'请输入验证码'"
              class="login_input"
            >
              <template #button>
                <van-button
                  color="#0090d8"
                  class="send_code"
                  :disabled="loading"
                  :loading="loading"
                  round
                  @click="sendvcode"
                  :loading-text="loadingText"
                  >发送验证码</van-button
                >
                <!-- <div class="send_code" @click="sendvcode">发送验证码</div> -->
              </template>
            </van-field>
          </div>
          <div class="login_button" @click="bindUser">确认</div>
          <div
            class="login_bind"
            v-show="usertype == '2'"
            @click="usertype = '3'"
          >
            绑定公众号
          </div>
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
      userid: "",
      passwd: "",
      bindid: "", // 绑定身份证
      bindphone: "", // 绑定手机号
      bindcode: "", // 验证码
      rcode: "", // 安全识别注册码
      loading: false,
      loadingText: "60",
      vcodeTimer: ""
      // userid: "lyy",
      // passwd: "0513LyyL"
      // userid: "admin", // 登录号，必填，教师：oa账号，学生：身份证号
      // passwd: "gz020slitsXX" // 登录密码，必填，教师：oa密码，学生：身份证号后6位
      // userid: "440181200004075715", // 登录号，必填，教师：oa账号，学生：身份证号
      // passwd: "075715" // 登录密码，必填，教师：oa密码，学生：身份证号后6位
    };
  },
  beforeCreate() {},
  created() {
    if (this.$route.query.openid) {
      this.usertype = 3;
    }
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    clearInterval(this.vcodeTimer);
  },
  destroyed() {},
  methods: {
    onClickLeft: function() {
      this.usertype = "2";
    },
    sendvcode: function() {
      let that = this;
      if (!that.bindphone) {
        that.$toast({
          message: "请输入手机号"
        });
        return;
      } else if (!/^1[3|4|5|7|8|9]\d{9}$/.test(that.bindphone)) {
        that.$toast({
          message: "手机号码格式错误，请重新输入"
        });
      } else {
        that.$axios
          .post(that.$api.sendvcode, { phonenum: that.bindphone })
          .then(res => {
            that.loading = true;
            that.vcodeTimer = setInterval(function() {
              that.loadingText = that.loadingText - 1 + "";
              if (that.loadingText == 0) {
                that.loading = false;
                that.loadingText = "60";
                clearInterval(that.vcodeTimer);
              }
            }, 1000);
            if (res.data.rcode) {
              that.rcode = res.data.rcode;
            }
          });
      }
    },
    bindphoneFormatter: function(value) {
      if (!value) {
        return value;
      }
      if (!/^1[3|4|5|7|8|9]\d{9}$/.test(value)) {
        this.$toast({
          message: "手机号码格式错误，请重新输入"
        });
      }
      return value;
    },
    bindidFormatter: function(value) {
      let id = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
      if (!value) {
        return value;
      }
      if (!id.test(value)) {
        this.$toast({
          message: "身份证号码格式错误，请重新输入"
        });
      }
      return value;
    },
    getopenid: function() {},
    bindUser: function() {
      let that = this;
      let id = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
      if (!that.bindid) {
        that.$toast({
          message: "请输入身份证号"
        });
        return;
      } else if (!id.test(that.bindid)) {
        that.$toast({
          message: "身份证号码格式错误，请重新输入"
        });
        return;
      }
      if (!that.bindphone) {
        that.$toast({
          message: "请输入手机号"
        });
        return;
      } else if (!/^1[3|4|5|7|8|9]\d{9}$/.test(that.bindphone)) {
        that.$toast({
          message: "手机号码格式错误，请重新输入"
        });
        return;
      }
      if (!that.bindcode) {
        that.$toast({
          message: "请输入验证码"
        });
        return;
      }
      that.$axios
        .post(that.$api.bindCardid, {
          openid: that.$route.query.openid,
          cardid: that.bindid,
          phonenum: that.bindphone,
          rcode: that.rcode,
          vcode: that.bindcode
        })
        .then(res => {
          Toast({
            message: "成功绑定公众号"
          });
        });
    },
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
          that.userData = res.data;
          that.$axios.defaults.headers.common["Access-Token"] =
            res.data.tokenid;
          that.$tool.setLocal("token", res.data.tokenid);
          if (that.usertype == "1") {
            that.$axios.post(that.$api.getuserInfo_teacher, {}).then(res => {
              that.userData["isTeacher"] = true;
              for (let key in res.data) {
                that.userData[key] = res.data[key];
              }
              that.$tool.setLocal("userData", that.userData);
              that.$tool.setLocal("evaluateRemind_teacher", false);
              //班主任、系部入口
              if (
                that.userData.banzurenPermission &&
                that.userData.xibuPermission
              ) {
                that.islogin = true;
              } else if (that.userData.banzurenPermission) {
                that.routerTo("statistics");
              } else if (that.userData.xibuPermission) {
                that.routerTo("sdept");
              }
            });
          } else {
            // 学生
            that.userData["isTeacher"] = false;
            this.$tool.setLocal("updateRemind", false);
            that.$tool.setLocal("evaluateRemind", false);
            this.$tool.setLocal("userData", that.userData);
            this.$tool.setLocal("identity", "student");
            this.$router.push({ path: "/signin" });
          }
          this.$toast.clear();
        });
    },
    routerTo: function(path, params) {
      if (path == "sdept") {
        this.$tool.setLocal("identity", "sdept");
      } else {
        this.$tool.setLocal("identity", "headmaster");
      }
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
  padding: 30px 0px 10px 0px;
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
.login_bind {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0090d8;
}
.send_code {
  height: 24px;
  background-color: #0090d8;
  border-radius: 12px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
