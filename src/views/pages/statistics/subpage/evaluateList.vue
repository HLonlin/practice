<template>
  <div class="evaluateList_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="评价列表"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="list_panel">
      <div
        class="listItem_panel"
        v-for="(item, i) in list"
        :key="i"
        @click="linkTo(item)"
      >
        <div class="headImg_panel" v-show="userData.isTeacher">
          <img
            class="headImg_logo"
            :src="
              item.logo ? item.logo : require('@/assets/images/default.png')
            "
          />
        </div>
        <div class="label_panel">
          <div class="label_title" v-show="!userData.isTeacher">
            {{ item.username }}
          </div>
          <div class="label_signin">
            <span>评价总分：{{ item.totalNum ? item.totalNum : "" }}分</span
            ><span>评价时间：{{ item.year + "-" + item.month }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="noMore_panel">
      没有更多了
    </div>
  </div>
</template>

<script>
export default {
  name: "evaluateList",
  data() {
    return {
      list: [],
      userData: Object
    };
  },
  beforeCreate() {},
  created() {
    this.getUserData();
    this.getEvaluateList();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getUserData: function() {
      let userData = this.$tool.getLocal("userData");
      if (userData) {
        this.userData = userData;
      }
    },
    onClickLeft: function() {
      this.$router.go(-1);
    },
    getEvaluateList: function() {
      let that = this;
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.banZhuRenPingJiaList_teacher
            : that.$api.banZhuRenPingJiaList_student
        )
        .then(res => {
          that.list = res.data;
        });
    },
    linkTo: function(item) {
      let data = {
        id: item.id,
        finish: true,
        from: "teacher"
      };
      this.$router.push({
        path: "/evaluateTeacher",
        query: {
          id: item.id,
          finish: true
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list_panel {
  box-sizing: border-box;
  padding: 0px 1rem 20px 1rem;
}
.topList_panel {
  padding: 0px 1rem 0px 1rem;
}
.noMore_panel {
  box-sizing: border-box;
  padding: 20px 0px;
  text-align: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bbbbbb;
}
.listItem_panel {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 0px;
  border-bottom: 1px solid #eeeeee;
}
.isToday::before {
  position: absolute;
  content: "";
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: #ffffff;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background: url("../../../../../static/images/todayLose.png") no-repeat center
    center;
  background-size: cover;
}
.listItem_panel::after {
  position: absolute;
  content: "";
  top: 50%;
  right: 0.5rem;
  transform: rotate(45deg) translateY(-50%);
  width: 0.75rem;
  height: 0.75rem;
  border-right: 1px solid#999999;
  border-top: 1px solid #999999;
}
.headImg_panel {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
}
.headImg_logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
.label_panel {
  position: relative;
  box-sizing: border-box;
  padding: 0px 0.625rem;
}
.evaluateStatus {
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  font-size: 0.625rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.label_title {
  box-sizing: border-box;
  padding: 0px 0px 0.5rem 0px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.label_signin {
  display: flex;
  justify-content: space-between;
  width: 16.875rem;
  box-sizing: border-box;
  padding: 0px 1rem 0px 0px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.label_phone {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
</style>
<style>
.evaluateList_container .van-nav-bar {
  background-color: #0090d8;
}
.evaluateList_container .van-nav-bar__placeholder,
.evaluateList_container .van-nav-bar__content {
  height: 44px !important;
}
.evaluateList_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.evaluateList_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
