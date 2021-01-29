<template>
  <div class="statistics_container">
    <div class="topbar_panel">
      <div class="topbar">实习率：{{ employRate }}%</div>
    </div>
    <div class="list_panel">
      <div
        class="listItem_panel"
        v-for="(item, i) in list"
        :key="i"
        @click="linkTo(item)"
      >
        <div class="headImg_panel">
          <img
            class="headImg_logo"
            :src="
              item.logo ? item.logo : require('@/assets/images/default.png')
            "
          />
        </div>
        <div class="label_panel">
          <div class="label_title">
            <span>{{ item.username }}</span>
            <span
              >健康状况：
              <span
                :style="{
                  color:
                    item.jiankangstatus == '健康'
                      ? '#00C110'
                      : item.jiankangstatus == '异常'
                      ? '#FF2A2A'
                      : '#666666'
                }"
              >
                <span>
                  {{ item.jiankangstatus ? item.jiankangstatus : "未上报" }}
                </span>
              </span>
            </span>
          </div>
          <div class="label_signin">
            <span>学号：{{ item.cardid }}</span>
            <span>签到次数：{{ item.qiandaonum }}</span>
          </div>
          <div class="label_phone">
            电话:
            <span style="color:#0090d8;">{{ item.phone }}</span>
          </div>
        </div>
      </div>
      <div class="noMore_panel" v-if="list.length == 0">没有更多了</div>
    </div>
    <van-popup
      v-model="popups.evaluate"
      :get-container="getContainer"
      @close="closeEvaluate_popup"
    >
      <div class="evaluate_popup">
        <div class="evaluate_popupLabel">
          {{ evaluateText }}
        </div>
        <div class="evaluate_popupBottomBtn">
          <div class="evaluate_leftBtn" @click="routerTo">
            去评定
          </div>
          <div class="evaluate_rightBtn" @click="popups.evaluate = false">
            知道了，稍后处理
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "statistics",
  data() {
    return {
      popups: {
        evaluate: false
      },
      userData: Object,
      list: [],
      employRate: "",
      evaluateText: ""
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.getUserListByBanji();
    this.getConductEvaluationMsg();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    // 加载学生列表
    getUserListByBanji: function() {
      let that = this;
      that.$axios.post(that.$api.tongjiList).then(res => {
        if (res.data.userList) {
          that.list = res.data.userList;
        }
        that.employRate = res.data.employRate;
      });
    },
    getConductEvaluationMsg: function() {
      if (this.$tool.getLocal("closeEvaluate")) return;
      let that = this;
      let date = new Date();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + date.getMonth() + 1
          : date.getMonth() + 1;
      that.$axios
        .post(that.$api.getConductEvaluationMsg, {
          year: date.getFullYear(),
          month: month
        })
        .then(res => {
          if (res.data) {
            that.evaluateText = res.data;
            that.popups.evaluate = true;
          }
        });
    },
    getContainer() {
      return document.querySelector(".statistics_container");
    },
    linkTo: function(item) {
      this.$router.push({
        path: "/studentInfo",
        query: {
          cardid: JSON.stringify(item.cardid),
          isFrom: JSON.stringify("statistics")
        }
      });
    },
    routerTo: function() {
      this.closeEvaluate_popup();
      this.$router.push({
        path: "/todoList",
        query: { type: "evaluate" }
      });
    },
    closeEvaluate_popup: function() {
      this.$tool.setLocal("closeEvaluate", true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topbar_panel {
  width: 100%;
  height: 56px;
  background-color: #f6f6f6;
  box-sizing: border-box;
  padding: 0px 0px 10px 0px;
}
.topbar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  background-color: #ffffff;
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
}
.list_panel {
  box-sizing: border-box;
  padding: 0px 1rem 0px 1rem;
}
.listItem_panel {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 0px;
  border-bottom: 1px solid #eeeeee;
}
.list_panel .listItem_panel:last-child {
  border: none;
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
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1.5rem 0px 0.625rem;
}
.label_title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 0px 0.5rem 0px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.label_title span {
  box-sizing: border-box;
  padding: 0px 0.9375rem 0px 0px;
}
.label_title span:last-child {
  padding: 0px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  /* color: #666666; */
}
.label_signin {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 0px 0.3125rem 0px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.label_signin span {
  box-sizing: border-box;
  padding: 0px 0.9375rem 0px 0px;
}
.label_signin span:last-child {
  padding: 0px;
}
.label_phone {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.evaluate_popup {
  width: 18.125rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 30px 1.25rem;
}
.evaluate_popupLabel {
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.evaluate_popupBottomBtn {
  box-sizing: border-box;
  padding: 20px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.evaluate_leftBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  background-color: #0090d8;
  border-radius: 2px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.evaluate_rightBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 30px;
  border-radius: 2px;
  background-color: #ffffff;
  border: 1px solid #bbbbbb;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
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
</style>
<style>
.statistics_container .van-popup {
  background-color: transparent;
}
</style>
