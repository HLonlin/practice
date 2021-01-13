<template>
  <div class="dailystudy_container">
    <van-nav-bar
      title="每日一学"
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
            v-for="(item, i) in dateList"
            class="signin_calendarListItem"
            :class="[
              {
                firstDay: i == 0,
                active: item.active
              },
              item.dayClass
            ]"
            :key="i"
            :style="{ marginLeft: i == 0 ? firstDay * 14.285 + '%' : 0 }"
            @click="getDailyStudy(item)"
          >
            <div class="listItem_text">
              {{ item == i + 1 ? item : i + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dailyStudy_panel">
      <div class="dailyStudy_title">每日一学</div>
      <div class="dailyStudy_date">
        {{ $tool.getYearMonthDate(dailyStudy.learntime) }}
      </div>
      <div class="dailyStudy_text">
        {{ dailyStudy.context }}
      </div>
      <div class="dailyStudy_author">——{{ dailyStudy.wf_Creator }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dailystudy",
  data() {
    return {
      userData: Object,
      firstDay: "",
      dateList: [], // 签到列表
      currentYearMonth: "",
      dailyStudy: {}
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.getSigninDetailsList();
    this.getDailyStudy();
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
    // 根据日期加载每日一学
    getDailyStudy: function(item) {
      let that = this;
      let learntime =
        that.currentYearMonth.replace(/年/, "-").replace(/月/, "-") +
        (new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate());
      if (arguments[0]) {
        for (let i = 0, imax = that.dateList.length; i < imax; i++) {
          that.dateList[i].active = false;
        }
        that.dateList[item.date - 1].active = true;
        learntime =
          that.currentYearMonth.replace(/年/, "-").replace(/月/, "-") +
          item.date;
      }
      that.$axios
        .post(that.$api.getDailyStudyByDate, { learntime: learntime })
        .then(res => {
          for (let keys in res.data) {
            that.$set(that.dailyStudy, keys, res.data[keys]);
          }
        });
    },
    // 日历列表
    getSigninDetailsList: function() {
      let that = this;
      that.dateList = [];
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
      for (
        let j = 0, jmax = that.$tool.getDaysBy(YearMonthStr);
        j < jmax;
        j++
      ) {
        that.$set(that.dateList, j, {
          date: j + 1 < 10 ? "0" + (j + 1) : j + 1
        });
        currentYearMonth.setDate(j + 1);
        currentYearMonth = new Date(
          new Date(currentYearMonth.toLocaleDateString()).getTime()
        );
        if (currentYearMonth > today) {
          that.$set(that.dateList[j], "active", false);
        } else if (currentYearMonth < today) {
          that.$set(that.dateList[j], "active", false);
        } else {
          that.$set(that.dateList[j], "active", true);
        }
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
.active .listItem_text {
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #0090d8;
}

.signin_popup {
  width: 17.5rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
}
.signin_popupTitle {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  padding: 20px 0px 15px 0px;
  box-sizing: border-box;
  text-align: center;
}
.signin_popupContent {
  box-sizing: border-box;
  padding: 0px 1.25rem;
}
.popup_ContentItem {
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 12px;
}
.signin_popupContent .popup_ContentItem:last-child {
  border: none;
  margin-bottom: 0px;
}
.popup_itemTitle {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  box-sizing: border-box;
  padding: 0px 0px 12px 0px;
}
.popup_itemText {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  box-sizing: border-box;
  padding: 0px 0px 20px 0px;
}
.signin_popupBottomBtn {
  width: 100%;
  padding: 10px 0px;
  box-sizing: border-box;
  text-align: center;
  background-color: #cccccc;
  border-radius: 0px 0px 0.5rem 0.5rem;
  font-size: 1.125rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.signin_popupBottomBtn {
  background-color: #0090d8;
}
.dailyStudy_panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  padding: 15px 1rem;
  background-color: #ffffff;
}
.dailyStudy_title,
.dailyStudy_date,
.dailyStudy_text,
.dailyStudy_author {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 0px 0px 10px 0px;
}
.dailyStudy_title {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #555555;
}
.dailyStudy_date {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.dailyStudy_text {
  text-align: justify;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  padding-top: 10px;
}
.dailyStudy_author {
  text-align: right;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  padding-top: 10px;
}
</style>
<style>
.dailystudy_container .van-nav-bar {
  background-color: #0090d8;
}
.dailystudy_container .van-nav-bar__placeholder,
.dailystudy_container .van-nav-bar__content {
  height: 44px !important;
}
.dailystudy_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.dailystudy_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.signin_calendarContainer .van-popup {
  background-color: transparent;
}
</style>
