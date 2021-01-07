<template>
  <div class="container">
    <div class="signin_topPanel">
      <div
        class="signin_roundWhite"
        @click="is_SigninTotal ? '' : openPopup('healthStatus', true)"
      >
        <div class="signin_round">
          {{ is_SigninTotal ? "已签到" : "签到" }}
        </div>
      </div>
      <div class="signin_position">
        <i class="iconItem icon_dizhitubiao signin_icon"></i>
        {{ currentAddress }}
      </div>
    </div>
    <div class="signin_calendarContainer">
      <van-datetime-picker
        class="datePicker"
        v-model="currentYear"
        type="year-month"
        title="选择年月"
        :formatter="yearFormatter"
        :item-height="45"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancelDatePicker"
        @confirm="confirmDatePicker"
      />
      <van-calendar
        title="签到日历"
        :show-title="false"
        color="#ffffff"
        :poppable="false"
        :show-confirm="false"
        :formatter="formatter"
        @select="selectFn"
        :min-date="minDate"
        :max-date="maxDate"
        :show-mark="false"
      />
      <van-popup
        v-model="popups.learnEveryDay"
        :close-on-click-overlay="countDown == 0"
        :get-container="getContainer"
      >
        <div class="everyDay_popup">
          <div class="popup_titile">每日一学</div>
          <div class="popup_content">
            只有在那崎岖的小路上仍不畏艰难奋勇攀登的人，才有希望到达光辉的顶点。
          </div>
          <div class="popup_author">——马克思</div>
          <div
            class="popup_bottomBtn"
            :class="{ popup_bottomBtnAble: countDown == 0 }"
            @click="
              countDown == 0
                ? openPopup('learnEveryDay', false)
                : openPopup('learnEveryDay', true)
            "
          >
            确定{{ countDown == 0 ? "" : "（" + countDown + "s）" }}
          </div>
        </div>
      </van-popup>
      <van-popup v-model="popups.signinDetails" :get-container="getContainer">
        <div class="signin_popup">
          <div class="signin_popupTitle">{{ signinItem.date }}</div>
          <div class="signin_popupContent">
            <div class="popup_ContentItem">
              <div class="popup_itemTitle">签到情况</div>
              <div class="popup_itemText">
                {{ signinItem.is_signin ? "已签到" : "未签到" }}
              </div>
            </div>
            <div class="popup_ContentItem" v-if="signinItem.is_signin">
              <div class="popup_itemTitle">每日健康上报</div>
              <div class="popup_itemText">{{ signinItem.healthStatus }}</div>
            </div>
            <div class="popup_ContentItem" v-if="signinItem.is_signin">
              <div class="popup_itemTitle">签到地址</div>
              <div class="popup_itemText">{{ signinItem.signinAddress }}</div>
            </div>
          </div>
          <div
            class="signin_popupBottomBtn"
            @click="openPopup('signinDetails', false)"
          >
            确定
          </div>
        </div>
      </van-popup>
      <van-popup v-model="popups.healthStatus" :get-container="getContainer">
        <div class="signin_popup">
          <div class="signin_popupTitle">每日健康上报</div>
          <div class="signin_popupContent">
            <van-radio-group v-model="healthStatus">
              <van-radio
                class="health_radio"
                name="自觉正常"
                checked-color="#0090d8"
                >自觉正常
                <template #icon="props">
                  <i
                    class="iconItem "
                    :class="{
                      icon_radioActive: props.checked,
                      icon_radio: true
                    }"
                  ></i>
                </template>
              </van-radio>
              <van-radio
                class="health_radio"
                name="发热37.3℃以下"
                checked-color="#0090d8"
                >发热37.3℃以下
                <template #icon="props">
                  <i
                    class="iconItem "
                    :class="{
                      icon_radioActive: props.checked,
                      icon_radio: true
                    }"
                  ></i>
                </template>
              </van-radio>
              <van-radio
                class="health_radio"
                name="发热37.3℃（含）以上"
                checked-color="#0090d8"
                >发热37.3℃（含）以上
                <template #icon="props">
                  <i
                    class="iconItem "
                    :class="{
                      icon_radioActive: props.checked,
                      icon_radio: true
                    }"
                  ></i>
                </template>
              </van-radio>
              <van-radio
                class="health_radio"
                name="干咳"
                checked-color="#0090d8"
                >干咳
                <template #icon="props">
                  <i
                    class="iconItem "
                    :class="{
                      icon_radioActive: props.checked,
                      icon_radio: true
                    }"
                  ></i>
                </template>
              </van-radio>
              <van-radio
                class="health_radio"
                name="乏力"
                checked-color="#0090d8"
                >乏力
                <template #icon="props">
                  <i
                    class="iconItem "
                    :class="{
                      icon_radioActive: props.checked,
                      icon_radio: true
                    }"
                  ></i>
                </template>
              </van-radio>
              <van-radio
                class="health_radio"
                :name="otherHealthStatus"
                checked-color="#0090d8"
                >其他症状
                <template #icon="props">
                  <i
                    class="iconItem "
                    :class="{
                      icon_radioActive: props.checked,
                      icon_radio: true
                    }"
                  ></i>
                </template>
              </van-radio>
            </van-radio-group>
            <van-field
              class="otherHealthStatus"
              v-model="otherHealthStatus"
              placeholder="请简要描述症状情况"
            />
          </div>
          <div
            class="signin_popupBottomBtn"
            @click="is_SigninTotal ? '' : openPopup('confirmSignin', true)"
          >
            签到
          </div>
        </div>
      </van-popup>
      <van-popup v-model="popups.confirmSignin" :get-container="getContainer">
        <div class="signin_popup">
          <div class="signin_popupContent">
            <div class="popup_ContentItem popup_paddinTop">
              <div class="popup_itemTitle">每日健康上报</div>
              <div class="popup_itemText">{{ healthStatus }}</div>
            </div>
            <div class="popup_ContentItem">
              <div class="popup_itemTitle">
                签到地址
                <div class="popup_itemLabel">重新定位</div>
              </div>
              <div class="popup_itemText">广东省广州市越秀区小北路22号</div>
            </div>
          </div>
          <div class="signin_popupBottomBtn" @click="signinTotal">
            确定
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
/**
 * 签到页
 */
export default {
  name: "signin",
  data() {
    return {
      popups: {
        learnEveryDay: false, // 每日一学
        signinDetails: false, // 签到详情
        healthStatus: false, // 健康上报
        confirmSignin: false // 确认签到
      },
      pageIndex: Number,
      currentYear: new Date(),
      countDown: 10, // 每日一学倒计时长
      signinItem: {
        // 签到详情内容
        date: String,
        is_signin: Boolean,
        healthStatus: String,
        signinAddress: String
      },
      is_SigninTotal: false, // 今日是否已签到
      healthStatus: "自觉正常", // 健康状态
      currentAddress: "广东省广州市越秀区小北路22号", // 当前签到地址
      otherHealthStatus: "", // 其他症状输入框文本
      // 健康上报选项
      healthRadio: [
        "自觉正常",
        "发热37.3℃以下",
        "发热37.3℃（含）以上",
        "干咳",
        "乏力",
        "其他症状"
      ]
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.resetCalendarContainerH();
    this.calendarScroll();
    this.addPageTurnButton();
    this.pageTurnBytitle();
    this.countDownFn();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  watch: {
    otherHealthStatus: {
      handler(newVal, oldVal) {
        this.healthRadio[5] = newVal;
        this.healthStatus = newVal;
      }
    }
  },
  methods: {
    // 年月选项格式化函数
    yearFormatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    // 日历格式化函数
    formatter: function(day) {
      day.type = "selected";
      // 今天
      if (day.date.toLocaleDateString() == new Date().toLocaleDateString()) {
        day.className = "isToday";
      }
      // 已签到的
      if (
        day.date < new Date(new Date(new Date().toLocaleDateString()).getTime())
      ) {
        day.className = "signedIn";
      }
      // 未签到的
      if (day.date.getDay() == 0 || day.date.getDay() == 6) {
        day.className = "noSignIn";
      }
      return day;
    },
    // 动态日历面板高度
    resetCalendarContainerH: function() {
      let calendarContainer = document.getElementsByClassName(
        "signin_calendarContainer"
      )[0];
      let signin_topPanel = document.getElementsByClassName(
        "signin_topPanel"
      )[0];
      let windowHight = window.screen.height;
      calendarContainer.style.height =
        windowHight - signin_topPanel.offsetHeight - 95 + "px";

      let calendarDays = document.getElementsByClassName("van-calendar__days");
      calendarDays[calendarDays.length - 1].style.paddingBottom = "44px";
    },
    // 添加翻页按钮
    addPageTurnButton: function() {
      let header_subtitle = document.getElementsByClassName(
        "van-calendar__header-subtitle"
      )[0];
      let left = document.createElement("div");
      let right = document.createElement("div");
      left.className = "van-lastPage";
      right.className = "van-nextPage";
      header_subtitle.appendChild(left);
      header_subtitle.appendChild(right);
      this.pageTurnByBtn();
    },
    // 日历滚动翻页监听
    calendarScroll: function() {
      let that = this;
      let calendarBody = document.getElementsByClassName(
        "van-calendar__body"
      )[0];
      let calendarMonth = document.getElementsByClassName(
        "van-calendar__month"
      );
      calendarBody.onscroll = function() {
        let offsetHeightTotal = 0;
        // 实时更新当前码、作用关联于左右翻页
        if (calendarBody.scrollTop <= calendarMonth[0].offsetHeight) {
          that.pageIndex = 0;
        } else {
          for (var i = 0, imax = calendarMonth.length; i < imax; i++) {
            offsetHeightTotal =
              offsetHeightTotal + calendarMonth[i].offsetHeight;
            if (calendarBody.scrollTop >= offsetHeightTotal) {
              that.pageIndex = i + 1;
            }
          }
        }
        // 实时更新年月选项当前时间
        if (that.pageIndex != 0) {
          that.currentYear = new Date(
            calendarMonth[that.pageIndex].children[0].innerHTML
              .replace(/年/, "/")
              .replace(/月/, "/")
          );
        } else {
          that.currentYear = this.minDate;
        }
      };
    },
    // 滚动翻页
    scrollToPage: function(e) {
      let that = this;
      let calendarBody = document.getElementsByClassName(
        "van-calendar__body"
      )[0];
      let calendarMonth = document.getElementsByClassName(
        "van-calendar__month"
      );
      let header_subtitle = document.getElementsByClassName(
        "van-calendar__header-subtitle"
      )[0];
      // 阻止左右按钮事件冒泡
      try {
        e.stopPropagation(); //非IE浏览器
      } catch (e) {
        window.event.cancelBubble = true; //IE浏览器
      }
      if (that.pageIndex === 0) {
        calendarBody.scrollTop = 0;
      } else {
        let offsetHeightTotal = 0;
        for (var i = 0, imax = that.pageIndex; i < imax; i++) {
          offsetHeightTotal = offsetHeightTotal + calendarMonth[i].offsetHeight;
        }
        calendarBody.scrollTop = offsetHeightTotal + 64;
      }
    },
    // 左右按钮翻页
    pageTurnByBtn: function() {
      let that = this;
      let lastPageBtn = document.getElementsByClassName("van-lastPage")[0];
      let nextPageBtn = document.getElementsByClassName("van-nextPage")[0];
      let calendarMonth = document.getElementsByClassName(
        "van-calendar__month"
      );
      lastPageBtn.addEventListener("click", function(e) {
        that.pageIndex = that.pageIndex - 1 > 0 ? that.pageIndex - 1 : 0;
        that.scrollToPage(e);
      });
      nextPageBtn.addEventListener("click", function(e) {
        that.pageIndex =
          that.pageIndex + 1 < calendarMonth.length
            ? that.pageIndex + 1
            : calendarMonth.length;
        that.scrollToPage(e);
      });
    },
    // 打开标题选项
    pageTurnBytitle: function() {
      let header_subtitle = document.getElementsByClassName(
        "van-calendar__header-subtitle"
      )[0];
      let datePicker = document.getElementsByClassName("datePicker")[0];
      header_subtitle.addEventListener("click", function() {
        datePicker.style.display = "block";
      });
    },
    // 取消选项翻页
    cancelDatePicker: function() {
      document.getElementsByClassName("datePicker")[0].style.display = "none";
    },
    // 确认选项翻页
    confirmDatePicker: function(val) {
      let that = this;
      let calendarMonth = document.getElementsByClassName(
        "van-calendar__month"
      );
      let datePicker = document.getElementsByClassName("datePicker")[0];
      let innerHTMLS = val.getFullYear() + "年" + (val.getMonth() + 1) + "月";
      for (var i = 0, imax = calendarMonth.length; i < imax; i++) {
        if (
          i == 0 &&
          that.minDate.getFullYear() +
            "年" +
            (that.minDate.getMonth() + 1) +
            "月" ==
            val.getFullYear() + "年" + (val.getMonth() + 1) + "月"
        ) {
          that.pageIndex = 0;
        } else if (innerHTMLS == calendarMonth[i].children[0].innerHTML) {
          that.pageIndex = i;
        }
      }
      this.scrollToPage();
      datePicker.style.display = "none";
    },
    // 每日一学倒计时
    countDownFn: function() {
      if (!this.popups.learnEveryDay) return;
      let that = this;
      let timer = setInterval(function() {
        that.countDown = that.countDown - 1 < 0 ? 0 : that.countDown - 1;
        if (that.countDown == 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    // 返回一个特定的 DOM 节点，作为每日一学弹窗挂载的父节点
    getContainer() {
      return document.querySelector(".signin_calendarContainer");
    },
    // 打开弹框
    openPopup: function(target, state) {
      let that = this;
      for (let key in that.popups) {
        that.popups[key] = false;
      }
      that.popups[target] = state;
    },
    // 今日份签到
    signinTotal: function() {
      let that = this;
      that.openPopup("confirmSignin", false);
      console.log("健康状态", that.healthStatus);
      console.log("签到地址", that.currentAddress);
      that.is_SigninTotal = true;
    },
    // 重新定位签到地址
    relocation: function() {},
    // 点击日期绑定事件
    selectFn: function(date) {
      let that = this;
      // 点击日期是否已签到
      let dateType = "";
      // 已签到的
      if (
        date < new Date(new Date(new Date().toLocaleDateString()).getTime())
      ) {
        dateType = "已签到的";
      }
      // 未签到的
      if (date.getDay() == 0 || date.getDay() == 6) {
        dateType = "未签到的";
      }

      if (
        date > new Date(new Date(new Date().toLocaleDateString()).getTime())
      ) {
        console.log("以后");
        return; // 点击日期为今天后的不打开签到弹框
      } else if (
        date < new Date(new Date(new Date().toLocaleDateString()).getTime())
      ) {
        console.log("以前");
        // 点击日期为今天前的根据签到状态打开签到弹框
        if (dateType == "未签到的") {
          that.signinItem.is_signin = false;
        } else if (dateType == "已签到的") {
          that.signinItem.is_signin = true;
        }
        that.signinItem.date =
          date.getFullYear() +
          "年" +
          (date.getMonth() + 1) +
          "月" +
          date.getDate() +
          "日";
        this.openPopup("signinDetails", true);
      } else {
        console.log("今天");
        // 点击日期为当天先判断是否已经签到、未签到的不打开签到弹框、已签到的打开签到弹框
        if (that.is_SigninTotal) {
          that.signinItem.is_signin = true;
          that.signinItem.date =
            date.getFullYear() +
            "年" +
            (date.getMonth() + 1) +
            "月" +
            date.getDate() +
            "日";
          this.openPopup("signinDetails", true);
        }
      }
    }
  },
  computed: {
    minDate: function() {
      // 限定最小年月
      let Dater = new Date();
      Dater.setFullYear(Dater.getFullYear() - 1);
      Dater.setMonth(0);
      return Dater;
    },
    maxDate: function() {
      // 限定最大年月
      let Dater = new Date();
      Dater.setFullYear(Dater.getFullYear() + 1);
      return Dater;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signin_topPanel {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #0090d8;
}
.signin_roundWhite {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 5.625rem;
  height: 5.625rem;
  border-radius: 50%;
  background-color: #ffffff;
}
@keyframes cd-pulse {
  0% {
    transform: scale(1);
    box-shadow: inset 0 0 10px 3px rgba(255, 255, 255, 1);
  }
  50% {
    box-shadow: inset 0 0 10px 3px rgba(255, 255, 255, 0.5);
  }
  100% {
    transform: scale(1.4);
    box-shadow: inset 0 0 10px 3px rgba(0, 0, 0, 0);
  }
}
.signin_roundWhite::before {
  content: "";
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: transparent;
  animation: cd-pulse 2s infinite;
}
.signin_roundWhite::after {
  content: "";
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: inherit;
  background-color: transparent;
  transform: scale(1.1);
  box-shadow: inset 0 0 10px 5px rgba(255, 255, 255, 0.5);
}
.signin_round {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 1px solid #0090d8;
  background-color: transparent;
  color: #0090d8;
  text-align: center;
  line-height: 5rem;
  font-size: 1.31rem;
  font-weight: bold;
}
.signin_icon {
  vertical-align: middle;
}
.signin_position {
  font-size: 0.75rem;
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  box-sizing: border-box;
  padding: 140px 1rem 16px 1rem;
}
.everyDay_popup,
.signin_popup {
  width: 17.5rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
}
.popup_titile,
.signin_popupTitle {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  padding: 20px 0px 15px 0px;
  box-sizing: border-box;
  text-align: center;
}
.popup_content {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  text-align: justify;
  padding: 0px 1.25rem;
  box-sizing: border-box;
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
.popup_paddinTop {
  padding-top: 20px;
}
.popup_itemTitle {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  box-sizing: border-box;
  padding: 0px 0px 12px 0px;
}
.popup_itemLabel {
  display: inline-block;
  box-sizing: border-box;
  padding-left: 0.625rem;
  font-size: 0.625rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0090d8;
}
.popup_itemText {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  box-sizing: border-box;
  padding: 0px 0px 20px 0px;
}

.popup_author {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  text-align: right;
  padding: 15px 1.25rem 20px 1.25rem;
  box-sizing: border-box;
}
.popup_bottomBtn,
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
.popup_bottomBtnAble,
.signin_popupBottomBtn {
  background-color: #0090d8;
}
.health_radio {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  box-sizing: border-box;
  padding: 0px 0px 15px 0px;
}
.icon_radio {
  display: flex;
  align-items: center;
}
.icon_radioActive {
  color: #0090d8;
}
.otherHealthStatus {
  box-sizing: border-box;
  padding: 0px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 20px;
}
</style>
<style>
.signin_calendarContainer {
  position: relative;
}
.signin_calendarContainer .van-calendar__header-subtitle {
  position: relative;
  font-size: 1rem;
  color: #323233;
  font-weight: bold;
  border-bottom: 1px solid #eeeeee;
}
.signin_calendarContainer .van-lastPage {
  position: absolute;
  left: 5rem;
  top: 50%;
  transform: rotate(45deg) translateY(-50%);
  width: 0.625rem;
  height: 0.625rem;
  border-left: 1px solid #666666;
  border-bottom: 1px solid #666666;
}
.signin_calendarContainer .van-nextPage {
  position: absolute;
  right: 5rem;
  top: 50%;
  transform: rotate(45deg) translateY(-50%);
  width: 0.625rem;
  height: 0.625rem;
  border-right: 1px solid #666666;
  border-top: 1px solid #666666;
}
.signin_calendarContainer .van-calendar__weekday {
  font-size: 0.875rem;
  color: #666666;
}
.signin_calendarContainer .van-calendar__month {
  box-shadow: 0 2px 10px rgba(125, 126, 128, 0.1);
}
.signin_calendarContainer .van-calendar__month-title {
  height: 4rem;
  box-sizing: border-box;
  padding-top: 1.25rem;
}
.signin_calendarContainer .van-calendar__day {
  height: 3.125rem;
}
.signin_calendarContainer .van-calendar__selected-day {
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 50%;
  color: #666666;
  background-color: rgba(0, 0, 0, 0) !important;
}
.signin_calendarContainer .isToday .van-calendar__selected-day {
  background-color: #ffffff !important;
  border: 1px solid #0090d8;
}
.signin_calendarContainer .signedIn .van-calendar__selected-day {
  background-color: #0090d8 !important;
  color: #ffffff;
  border: none;
}
.signin_calendarContainer .noSignIn .van-calendar__selected-day {
  background-color: #eeeeee !important;
}
.signin_calendarContainer .datePicker {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.signin_calendarContainer .van-popup {
  background-color: transparent;
}
</style>
