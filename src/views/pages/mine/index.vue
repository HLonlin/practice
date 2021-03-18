<template>
  <div class="container">
    <div class="info_panel">
      <router-link
        class="info_panelContainer"
        :to="{ path: 'selfinfo', query: { cardid: userData.cardid } }"
      >
        <div class="info_head">
          <img
            class="info_headImg"
            :src="
              userData.logo
                ? userData.logo
                : require('@/assets/images/default.png')
            "
            style="object-fit: cover;"
          />
        </div>
        <div class="info_name">
          {{ userData.isTeacher ? userData.name : userData.userName }}
        </div>
      </router-link>
    </div>
    <div class="middle_panel" v-if="userData.isTeacher">
      <div class="cell_panel" @click="linkTo('absenteeism')">
        <i class="iconItem icon_queqinmingdantubiao icon_left"></i>
        <div class="middle_title">
          缺勤名单<span v-show="absenteeismNum != 0"
            >(<span style="color:#0090d8;">{{ absenteeismNum }}</span
            >)</span
          >
        </div>
      </div>
      <div class="cell_panel" @click="linkTo('noContact')">
        <i class="iconItem icon_weilianximingdantubiao icon_left"></i>
        <div class="middle_title">
          未联系名单<span v-show="noContactNum != 0"
            >(<span style="color:#0090d8;">{{ noContactNum }}</span
            >)</span
          >
        </div>
      </div>
      <div class="cell_panel" @click="linkTo('audit')">
        <i class="iconItem icon_daishenhemingdantubiao icon_left"></i>
        <div class="middle_title">
          待审核名单
          <span v-show="auditNum != 0"
            >(<span style="color:#0090d8;">{{ auditNum }}</span
            >)</span
          >
        </div>
      </div>
      <div class="cell_panel" @click="linkTo('evaluate')">
        <i class="iconItem icon_daishenhemingdantubiao icon_left"></i>
        <div class="middle_title">
          学生月度操行评定
          <span v-show="behaviorCount != 0"
            >(<span style="color:#0090d8;">{{ behaviorCount }}</span
            >)</span
          >
        </div>
      </div>
    </div>
    <div class="middle_panel" v-else>
      <router-link :to="{ path: 'monthlylist' }" class="cell_panel">
        <i class="iconItem icon_yuejitubiao icon_left"></i>
        <div class="middle_title">月记</div>
      </router-link>
      <router-link :to="{ path: 'updaterecord' }" class="cell_panel">
        <i class="iconItem icon_meiriyixuetubiao icon_left"></i>
        <div class="middle_title">个人信息修改记录</div>
      </router-link>
      <!-- <router-link :to="{ path: 'dailystudy' }" class="cell_panel">
        <i class="iconItem icon_meiriyixuetubiao icon_left"></i>
        <div class="middle_title">每日一学</div>
      </router-link> -->
      <!-- <router-link :to="{ path: 'library' }" class="cell_panel">
        <i class="iconItem icon_jiaoxuewendangkutubiao icon_left"></i>
        <div class="middle_title">教学文档库</div>
      </router-link> -->
      <router-link :to="{ path: 'mySignin' }" class="cell_panel">
        <i class="iconItem icon_wodeqiandaotubiao icon_left"></i>
        <div class="middle_title">我的签到</div>
      </router-link>
    </div>
    <div class="bottom_panel" v-if="userData.isTeacher">
      <router-link :to="{ path: 'classmonthly' }" class="cell_panel">
        <i class="iconItem icon_yuejitubiao icon_left"></i>
        <div class="middle_title">班级月记</div>
      </router-link>
      <router-link :to="{ path: 'evaluateList' }" class="cell_panel">
        <i class="iconItem icon_xueshengpingjia icon_left"></i>
        <div class="middle_title">学生评价</div>
      </router-link>
      <router-link :to="{ path: 'contactList' }" class="cell_panel">
        <i class="iconItem icon_tongxunlutubiaobeifen icon_left"></i>
        <div class="middle_title">通讯录</div>
      </router-link>
    </div>
    <div class="bottom_panel" v-else>
      <div class="cell_panel" @click="routerTo">
        <i class="iconItem icon_xueshengpingjia icon_left"></i>
        <div class="middle_title">班主任评价</div>
      </div>
      <router-link :to="{ path: 'contactList' }" class="cell_panel">
        <i class="iconItem icon_tongxunlutubiaobeifen icon_left"></i>
        <div class="middle_title">通讯录</div>
      </router-link>
      <router-link :to="{ path: 'about' }" class="cell_panel">
        <i class="iconItem icon_guanyutubiao icon_left"></i>
        <div class="middle_title">关于</div>
      </router-link>
    </div>
    <div class="bottom_panel">
      <div class="cell_panel" @click="logout">
        <i class="iconItem icon_wotubiao icon_left"></i>
        <div class="middle_title">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 我的
 */
export default {
  name: "mine",
  data() {
    return {
      userData: Object,
      headImg: require("@/assets/images/default.png"),
      userName: "",
      auditNum: 0,
      absenteeismNum: 0,
      noContactNum: 0,
      behaviorCount: 0
    };
  },
  beforeCreate() {},
  created() {
    this.getUserData();
    this.getCountNum();
  },
  beforeMount() {},
  mounted() {
    this.resetContainerH();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    logout: function() {
      let that = this;
      that.$dialog.confirm({
        title: "温馨提示",
        message: "您确定要退出登录吗？",
        beforeClose
      });
      function beforeClose(action, done) {
        if (action === "confirm") {
          done();
          that.$axios.post(that.$api.logout).then(res => {
            that.$tool.removeLocal("userData");
            that.$tool.removeLocal("token");
            that.$router.push({ path: "/login" });
          });
        } else {
          done();
        }
      }
    },
    resetContainerH: function() {
      let windowHight = document.documentElement.clientHeight;
      let container = document.getElementsByClassName("container")[0];
      container.style.height = windowHight - 44 + "px";
    },
    getUserData: function() {
      let userData = this.$tool.getLocal("userData");
      if (userData) {
        this.userData = userData;
      }
    },
    // 获取统计数
    getCountNum: function() {
      if (this.userData.isTeacher) {
        let that = this;
        that.$axios.post(that.$api.getCountNum, {}).then(res => {
          that.absenteeismNum = res.data.absenteeismCount;
          that.noContactNum = res.data.noContactCount;
          that.auditNum = res.data.auditCount;
          that.behaviorCount = res.data.behaviorCount;
        });
      }
    },
    linkTo: function(type) {
      this.$router.push({ path: "/todoList", query: { type: type } });
    },
    routerTo: function() {
      let that = this;
      that.$axios.post(that.$api.getBanZhuRenPingJiaMsg).then(res => {
        if (res.data.temp) {
          // 当月已经评论
          this.$router.push({
            path: "/evaluateList"
          });
        } else {
          let currentMonth = new Date().getMonth() + 1;
          for (let j = 0, jmax = res.data.month.length; j < jmax; j++) {
            if (currentMonth == res.data.month[j].value) {
              // 当月未评论且当月需评论
              this.$router.push({
                path: "/evaluateTeacher",
                query: {
                  username: that.userData.banzhuren
                }
              });
              return;
            } else {
              // 当月未评论但当月无需评论
              this.$router.push({
                path: "/evaluateList"
              });
            }
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-color: #f6f6f6;
}
.info_panel {
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 10px;
}
.info_panelContainer {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px 1rem;
}
.info_panelContainer::after {
  content: "";
  position: absolute;
  right: 1.875rem;
  top: 50%;
  transform: rotate(45deg) translateY(-50%);
  width: 0.875rem;
  height: 0.875rem;
  border-right: 1px solid#999999;
  border-top: 1px solid #999999;
}
.info_head {
  vertical-align: middle;
  display: inline-block;
  width: 2.8125rem;
  height: 2.8125rem;
  border-radius: 50%;
  background-color: #f6f6f6;
  overflow: hidden;
}
.info_headImg {
  width: inherit;
  height: inherit;
}
.info_name {
  vertical-align: middle;
  display: inline-block;
  box-sizing: border-box;
  padding: 0px 0px 0px 1.25rem;
  font-size: 1.125rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.middle_panel {
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0px 1rem;
  margin-bottom: 10px;
}
.bottom_panel {
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0px 1rem;
  margin-bottom: 10px;
}
.cell_panel {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #eeeeee;
}
.cell_panel::after {
  content: "";
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: rotate(45deg) translateY(-50%);
  width: 0.75rem;
  height: 0.75rem;
  border-right: 1px solid #999999;
  border-top: 1px solid #999999;
}
.cell_panel:last-child {
  border: none;
}
.icon_left {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.625rem;
  color: #0090d7;
}
.middle_title {
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
</style>
