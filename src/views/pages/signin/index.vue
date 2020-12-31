<template>
  <div class="container">
    <div class="signin_topPanel">
      <div class="signin_roundWhite">
        <div class="signin_round">{{ is_Signin ? "已签到" : "签到" }}</div>
      </div>
      <div class="signin_position">
        <i class="iconItem icon_dizhitubiao signin_icon"></i>
        {{ currentPosition }}
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
      is_Signin: false,
      currentPosition: "广东省广州市越秀区小北路22号",
      pageIndex: 6,
      currentYear: new Date()
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
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    // 单日点击事件
    selectFn: function(date) {
      // 点击日期绑定事件
      console.log(date);
    },
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
      var windowHight = window.screen.height;
      calendarContainer.style.height =
        windowHight - signin_topPanel.offsetHeight - 95 + "px";

      let calendarDays = document.getElementsByClassName("van-calendar__days");
      calendarDays[calendarDays.length - 1].style.paddingBottom = "44px";
    },
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
    // 日历翻页监听
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
    // 翻页
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
    // 标题选项翻页
    pageTurnBytitle: function() {
      let header_subtitle = document.getElementsByClassName(
        "van-calendar__header-subtitle"
      )[0];
      let datePicker = document.getElementsByClassName("datePicker")[0];
      header_subtitle.addEventListener("click", function() {
        datePicker.style.display = "block";
      });
    },
    cancelDatePicker: function() {
      document.getElementsByClassName("datePicker")[0].style.display = "none";
    },
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
</style>
