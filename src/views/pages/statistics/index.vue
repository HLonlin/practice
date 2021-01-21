<template>
  <div class="statistics_container">
    <div class="topbar_panel">
      <div class="topbar">实习率：{{ employRate }}</div>
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
                  color: item.jiankangstatus == 6 ? '#FF2A2A' : '#00C110'
                }"
              >
                <span v-show="item.jiankangstatus">
                  {{ item.jiankangstatus == 6 ? "异常" : "健康" }}
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
    </div>
  </div>
</template>

<script>
export default {
  name: "statistics",
  data() {
    return {
      userData: Object,
      list: [],
      employRate: ""
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.getUserListByBanji();
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
      that.$axios.post(that.$api.tongjiList, {}).then(res => {
        that.list = res.data.userList;

        that.employRate = res.data.employRate;
      });
    },
    linkTo: function(item) {
      this.$router.push({
        path: "/studentInfo",
        query: {
          cardid: JSON.stringify(item.cardid),
          isFrom: JSON.stringify("statistics")
        }
      });
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
  box-sizing: border-box;
  padding: 0px 0px 0px 0.625rem;
}
.label_title {
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
</style>
