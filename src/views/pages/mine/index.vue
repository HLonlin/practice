<template>
  <div class="container">
    <div class="info_panel">
      <router-link class="info_panelContainer" :to="{ path: 'selfinfo' }">
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
        <div class="info_name" v-if="userData.isTeacher">
          {{ userData.name }}
        </div>
        <div class="info_name" v-else>{{ userData.userName }}</div>
      </router-link>
    </div>
    <div class="middle_panel" v-if="userData.isTeacher">
      <router-link :to="{ path: 'dailystudy' }" class="cell_panel">
        <i class="iconItem icon_queqinmingdantubiao icon_left"></i>
        <div class="middle_title">缺勤名单</div>
      </router-link>
      <router-link :to="{ path: 'library' }" class="cell_panel">
        <i class="iconItem icon_weilianximingdantubiao icon_left"></i>
        <div class="middle_title">未联系名单</div>
      </router-link>
      <router-link :to="{ path: 'mySignin' }" class="cell_panel">
        <i class="iconItem icon_daishenhemingdantubiao icon_left"></i>
        <div class="middle_title">待审核名单</div>
      </router-link>
    </div>
    <div class="middle_panel" v-else>
      <router-link :to="{ path: 'monthlylist' }" class="cell_panel">
        <i class="iconItem icon_yuejitubiao icon_left"></i>
        <div class="middle_title">月记</div>
      </router-link>
      <router-link :to="{ path: 'dailystudy' }" class="cell_panel">
        <i class="iconItem icon_meiriyixuetubiao icon_left"></i>
        <div class="middle_title">每日一学</div>
      </router-link>
      <router-link :to="{ path: 'library' }" class="cell_panel">
        <i class="iconItem icon_jiaoxuewendangkutubiao icon_left"></i>
        <div class="middle_title">教学文档库</div>
      </router-link>
      <router-link :to="{ path: 'mySignin' }" class="cell_panel">
        <i class="iconItem icon_wodeqiandaotubiao icon_left"></i>
        <div class="middle_title">我的签到</div>
      </router-link>
    </div>
    <div class="bottom_panel" v-if="userData.isTeacher">
      <router-link :to="{ path: 'monthlylist' }" class="cell_panel">
        <i class="iconItem icon_yuejitubiao icon_left"></i>
        <div class="middle_title">班级月记</div>
      </router-link>
      <router-link :to="{ path: 'contactList' }" class="cell_panel">
        <i class="iconItem icon_tongxunlutubiaobeifen icon_left"></i>
        <div class="middle_title">通讯录</div>
      </router-link>
    </div>
    <div class="bottom_panel" v-else>
      <router-link :to="{ path: 'contactList' }" class="cell_panel">
        <i class="iconItem icon_tongxunlutubiaobeifen icon_left"></i>
        <div class="middle_title">通讯录</div>
      </router-link>
      <router-link :to="{ path: 'about' }" class="cell_panel">
        <i class="iconItem icon_guanyutubiao icon_left"></i>
        <div class="middle_title">关于</div>
      </router-link>
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
      userName: ""
    };
  },
  beforeCreate() {},
  created() {
    this.getUserData();
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
    resetContainerH: function() {
      let windowHight = window.screen.height;
      let container = document.getElementsByClassName("container")[0];
      container.style.height = windowHight - 44 + "px";
    },
    getUserData: function() {
      let userData = this.$tool.getLocal("userData");
      if (userData) {
        this.userData = userData;
      }
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
  height: 120px;
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
  padding: 30px 1rem;
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
  width: 3.75rem;
  height: 3.75rem;
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
