<template>
  <div class="container">
    <div class="signin_topPanel">
      <div class="signin_roundWhite">
        <div class="signin_round">{{ is_Signin ? "已签到" : "签到" }}</div>
      </div>
      <div class="signin_position">
        <i class="iconItem icon_dingwei signin_icon"></i>
        {{ currentPosition }}
      </div>
    </div>
    <div class="signin_calendarContainer">
      <van-calendar
        title="签到日历"
        :show-title="false"
        color="#ffffff"
        :poppable="false"
        :show-confirm="false"
        :formatter="formatter"
        @select="selectFn"
        :min-date="minDate"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "signin",
  data() {
    return {
      is_Signin: false,
      currentPosition: "广东省广州市越秀区小北路22号",
      pageIndex: 6
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.resetCalendarContainerH();
    this.calendarScroll();
    this.addPageTurnButton();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    selectFn: function(date) {
      // 点击日期绑定事件
      console.log(date);
    },
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
    resetCalendarContainerH: function() {
      // 动态日历面板高度
      let calendarContainer = document.getElementsByClassName(
        "signin_calendarContainer"
      )[0];
      let signin_topPanel = document.getElementsByClassName(
        "signin_topPanel"
      )[0];
      var windowHight = window.screen.height;
      calendarContainer.style.height =
        windowHight - signin_topPanel.offsetHeight - 97 + "px";

      let calendarDays = document.getElementsByClassName("van-calendar__days");
      calendarDays[calendarDays.length - 1].style.paddingBottom = "44px";
    },
    addPageTurnButton: function() {
      let headerSubtitle = document.getElementsByClassName(
        "van-calendar__header-subtitle"
      )[0];
      let left = document.createElement("div");
      let right = document.createElement("div");
      left.className = "van-lastPage";
      right.className = "van-nextPage";
      headerSubtitle.appendChild(left);
      headerSubtitle.appendChild(right);
      this.pageTurnByBtn();
    },
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
        if (calendarBody.scrollTop <= calendarMonth[0].offsetHeight) {
          that.pageIndex = 0;
        } else {
          for (var i = 0, imax = calendarMonth.length; i < imax; i++) {
            offsetHeightTotal =
              offsetHeightTotal + calendarMonth[i].offsetHeight;
            // if (i < 12) {
            //   offsetHeightTotal =
            //     offsetHeightTotal + calendarMonth[i + 1].offsetHeight;
            // }
            if (calendarBody.scrollTop >= offsetHeightTotal) {
              that.pageIndex = i + 1;
            }
          }
        }
      };
    },
    pageTurnByBtn: function() {
      let that = this;
      let calendarBody = document.getElementsByClassName(
        "van-calendar__body"
      )[0];
      let calendarMonth = document.getElementsByClassName(
        "van-calendar__month"
      );
      let lastPageBtn = document.getElementsByClassName("van-lastPage")[0];
      let nextPageBtn = document.getElementsByClassName("van-nextPage")[0];
      function scrollToPage() {
        let offsetHeightTotal = 0;
        for (var i = 0, imax = that.pageIndex; i < imax; i++) {
          offsetHeightTotal = offsetHeightTotal + calendarMonth[i].offsetHeight;
        }
        calendarBody.scrollTop = offsetHeightTotal + 64;
      }
      lastPageBtn.addEventListener("click", function() {
        that.pageIndex = that.pageIndex - 1 > 0 ? that.pageIndex - 1 : 0;
        if (that.pageIndex === 0) {
          calendarBody.scrollTop = 0;
        } else {
          scrollToPage();
        }
      });
      nextPageBtn.addEventListener("click", function() {
        that.pageIndex = that.pageIndex + 1 < 12 ? that.pageIndex + 1 : 12;
        scrollToPage();
      });
    }
  },
  computed: {
    minDate: function() {
      // 多显示6个月以前的记录
      let Dater = new Date();
      Dater.setMonth(Dater.getMonth() - 6);
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
  background-color: #0090d7;
}
.signin_roundWhite {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 90px;
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #0090d7;
  background-color: transparent;
  color: #0090d7;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
  font-weight: bold;
}
.signin_icon {
  vertical-align: middle;
}
.signin_position {
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  box-sizing: border-box;
  padding: 140px 16px 16px 16px;
}
</style>
<style>
.signin_calendarContainer .van-calendar__header-subtitle {
  position: relative;
  color: #000000;
  font-weight: bold;
  border-bottom: 1px solid #eeeeee;
}
.signin_calendarContainer .van-lastPage {
  position: absolute;
  left: 80px;
  top: 50%;
  transform: rotate(45deg) translateY(-50%);
  width: 10px;
  height: 10px;
  border-left: 1px solid #656565;
  border-bottom: 1px solid #656565;
}
.signin_calendarContainer .van-nextPage {
  position: absolute;
  right: 80px;
  top: 50%;
  transform: rotate(45deg) translateY(-50%);
  width: 10px;
  height: 10px;
  border-right: 1px solid #656565;
  border-top: 1px solid #656565;
}

.signin_calendarContainer .van-calendar__month {
  box-shadow: 0 2px 10px rgba(125, 126, 128, 0.1);
}
.signin_calendarContainer .van-calendar__month-title {
  height: 64px;
  box-sizing: border-box;
  padding-top: 20px;
}
.signin_calendarContainer .van-calendar__day {
  height: 50px;
}
.signin_calendarContainer .van-calendar__selected-day {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #676767;
  background-color: rgba(0, 0, 0, 0) !important;
}
.signin_calendarContainer .isToday .van-calendar__selected-day {
  background-color: #ffffff !important;
  border: 1px solid #0090d7;
}
.signin_calendarContainer .signedIn .van-calendar__selected-day {
  background-color: #0090d7 !important;
  color: #ffffff;
  border: none;
}
.signin_calendarContainer .noSignIn .van-calendar__selected-day {
  background-color: #eeeeee !important;
}
</style>
