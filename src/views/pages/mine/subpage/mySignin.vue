<template>
  <div class="mySignin_container">
    <van-nav-bar
      title="我的签到"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="signin_calendarContainer">
      <div class="signin_titlePanel">
        <div class="signin_lastMonth" @click="pageTurn(false)"></div>
        <div class="signin_monthText">{{ currentYearMonth }}</div>
        <div class="signin_nextMonth" @click="pageTurn(true)"></div>
      </div>
      <div class="signin_calendarListContainer">
        <div class="signin_calendarTitle">
          <div
            class="signin_calendarTitleItem"
            v-for="(item, i) in ['日', '一', '二', '三', '四', '五', '六']"
            :key="i"
          >
            {{ item }}
          </div>
        </div>
        <div class="signin_calendarList" type="flex" justify="space-between">
          <div
            v-for="(item, i) in signinList"
            class="signin_calendarListItem"
            :class="[
              {
                isSignin: item.isSignin,
                firstDay: i == 0
              },
              item.dayClass
            ]"
            :key="i"
            :style="{ marginLeft: i == 0 ? firstDay * 14.285 + '%' : 0 }"
            @click="getSigninDetails(item)"
          >
            <div class="listItem_text">
              {{ item == i + 1 ? item : i + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="signinDetail_panel">
      <div class="signinDetail_title">
        {{ signinDetail.dateStr }}
      </div>
      <div class="signinDetail_isSignin" v-if="signinDetail.isSignin">
        <div class="signinDetail_company signinDetail_container">
          <div class="signinDetail_label">实习单位</div>
          <div class="signinDetail_content">
            {{ signinDetail.company }}
          </div>
        </div>
        <div class="signinDetail_time signinDetail_container">
          <div class="signinDetail_label ">签到时间</div>
          <div class="signinDetail_content">
            {{ signinDetail.time }}
          </div>
        </div>
        <div class="signinDetail_address signinDetail_container">
          <div class="signinDetail_label ">签到地点</div>
          <div class="signinDetail_content">
            {{ signinDetail.address }}
          </div>
        </div>
        <div class="signinDetail_map">查看坐标地图</div>
      </div>
      <div class="signinDetail_noSignin" v-else>
        未签到
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mySignin",
  data() {
    return {
      userData: Object,
      currentYearMonth: "",
      firstDay: "",
      signinList: [], // 签到列表
      pageIndex: Number,
      signinDetail: {}
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.getSigninDetailsList();
    // this.getSigninDetails();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    // 根据月份获取签到列表
    getSigninDetailsList: function() {
      let that = this;
      let today = new Date(new Date(new Date().toLocaleDateString()).getTime());
      let currentYearMonth = arguments[0] ? new Date(arguments[0]) : new Date();
      // : new Date("2020-12");
      let month =
        currentYearMonth.getMonth() + 1 < 10
          ? "0" + (currentYearMonth.getMonth() + 1) + "月"
          : currentYearMonth.getMonth() + 1 + "月";
      that.currentYearMonth = currentYearMonth.getFullYear() + "年" + month;
      let YearMonthStr = that.currentYearMonth
        .replace(/年/, "-")
        .replace(/月/, "");
      that.firstDay = new Date(YearMonthStr + "-01").getDay();
      that.$axios
        .post(that.$api.signinList, {
          month: YearMonthStr
        })
        .then(res => {
          let data = res.data;
          that.signinList = [];
          for (
            let j = 0, jmax = that.$tool.getDaysBy(YearMonthStr);
            j < jmax;
            j++
          ) {
            that.$set(that.signinList, j, {
              wf_Created: j + 1,
              isSignin: false
            });
          }
          for (let i = 0, imax = data.length; i < imax; i++) {
            let todayDate = new Date(data[i].wf_Created).getDate() - 1;
            that.$set(that.signinList, todayDate, data[i]);
            that.$set(that.signinList[todayDate], "isSignin", true);
          }
          for (let l = 0, lmax = that.signinList.length; l < lmax; l++) {
            currentYearMonth.setDate(l + 1);
            currentYearMonth = new Date(
              new Date(currentYearMonth.toLocaleDateString()).getTime()
            );
            if (currentYearMonth > today) {
              that.$set(that.signinList[l], "dayClass", "future");
            } else if (currentYearMonth < today) {
              that.$set(that.signinList[l], "dayClass", "before");
            } else {
              that.$set(that.signinList[l], "dayClass", "today");
              that.getSigninDetails(that.signinList[l]);
            }
          }
        });
    },
    // 获取签到详情
    getSigninDetails: function(item) {
      if (item.dayClass == "future") {
        return;
      }
      let that = this;
      that.$set(that.signinDetail, "isSignin", item.isSignin);
      if (item.isSignin) {
        let dateStr = that.$tool.getYearMonthDate(item.wf_Created);
        that.$set(that.signinDetail, "dateStr", dateStr);
        that.$set(that.signinDetail, "company", that.userData.danweidizhi);
        that.$set(that.signinDetail, "time", item.wf_Created);
        that.$set(that.signinDetail, "address", item.address);
      } else {
        let dateStr =
          that.currentYearMonth +
          (item.wf_Created < 10 ? "0" + item.wf_Created : item.wf_Created) +
          "日";
        that.$set(that.signinDetail, "dateStr", dateStr);
      }
    },
    pageTurn: function(add) {
      let that = this,
        dateArr = that.currentYearMonth.replace(/月/, "").split("年");
      if (add) {
        dateArr[1] = Number(dateArr[1]) + 1;
        if (dateArr[1] > 12) {
          dateArr[1] = "1";
          dateArr[0] = Number(dateArr[0]) + 1;
        }
      } else {
        dateArr[1] = Number(dateArr[1]) - 1;
        if (dateArr[1] < 1) {
          dateArr[1] = "12";
          dateArr[0] = Number(dateArr[0]) - 1;
        }
      }
      if (dateArr[1] < 10) {
        dateArr[1] = "0" + dateArr[1];
      }
      that.currentYearMonth = dateArr[0] + "年" + dateArr[1] + "月";
      that.getSigninDetailsList(dateArr[0] + "-" + dateArr[1]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signin_calendarContainer {
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 10px;
  background-color: #f6f6f6;
}
.signin_titlePanel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 5rem;
  border-bottom: 1px solid #eeeeee;
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
  background-color: #ffffff;
}
.signin_lastMonth,
.signin_nextMonth {
  transform: rotate(45deg);
  width: 0.625rem;
  height: 0.625rem;
  border-left: 1px solid #666666;
  border-bottom: 1px solid #666666;
}
.signin_nextMonth {
  transform: rotate(-135deg);
}
.signin_calendarListContainer {
  background-color: #ffffff;
}
.signin_calendarList {
  display: flex;
  flex-wrap: wrap;
}
.signin_calendarTitle {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  box-sizing: border-box;
  padding: 10px 0px;
}
.signin_calendarTitleItem {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14.285%;
  font-size: 0.875rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #666666;
}
.signin_calendarListItem {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14.285%;
  box-sizing: border-box;
  padding: 10px 0px;
}
.listItem_text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 50%;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.today .listItem_text {
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #0090d8;
}
.before .listItem_text {
  background-color: #eeeeee;
}
.isSignin .listItem_text {
  background-color: #0090d8;
  color: #ffffff;
}
.signinDetail_panel {
  box-sizing: border-box;
  padding: 0px 1rem;
}
.signinDetail_title {
  text-align: center;
  font-size: 1.125rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  box-sizing: border-box;
  padding: 15px 0px 0px 0px;
}
.signinDetail_container {
  display: flex;
  justify-content: space-between;
  padding: 16px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
}
.signinDetail_address {
  border: none;
}
.signinDetail_label {
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.signinDetail_content {
  max-width: 15rem;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.signinDetail_map {
  text-align: right;
  font-size: 0.625rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0090d8;
}
.signinDetail_noSignin {
  text-align: center;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: bold;
  color: #333333;
  box-sizing: border-box;
  padding: 15px 0px;
}
</style>
<style>
.mySignin_container .van-nav-bar {
  background-color: #0090d8;
}
.mySignin_container .van-nav-bar__placeholder,
.mySignin_container .van-nav-bar__content {
  height: 44px !important;
}
.mySignin_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.mySignin_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
