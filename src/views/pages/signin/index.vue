<template>
  <div class="container" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
    <!-- <div class="container"> -->
    <div class="signin_topPanel">
      <div
        class="signin_roundWhite"
        @click="is_SigninTotal ? '' : openPopup('healthStatus', true)"
      >
        <div class="signin_round">
          {{ is_SigninTotal ? "已签到" : "签到" }}
        </div>
      </div>
      <!-- <div class="signin_position" v-show="currentAddress">
        <i class="iconItem icon_dizhitubiao signin_icon"></i>
        {{ currentAddress }}
      </div> -->
    </div>
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
            @click="getSigninDetails(item.isSignin, item.dayClass, i + 1)"
          >
            <div class="listItem_text">
              {{ item == i + 1 ? item : i + 1 }}
            </div>
          </div>
        </div>
      </div>
      <van-popup
        v-model="popups.learnEveryDay"
        :close-on-click-overlay="false"
        :get-container="getContainer"
      >
        <div class="everyDay_popup">
          <div class="popup_titile">每日一学</div>
          <div class="popup_content">
            {{ learnContent.context }}
          </div>
          <!-- <div class="popup_author">——{{ learnContent.wf_Creator }}</div> -->
          <div
            class="popup_bottomBtn"
            :class="{ popup_bottomBtnAble: countDown == 0 }"
            @click="recordLearnToday"
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
            <!-- <div class="popup_ContentItem" v-if="signinItem.is_signin">
              <div class="popup_itemTitle">签到地址</div>
              <div class="popup_itemText">{{ signinItem.signinAddress }}</div>
            </div> -->
          </div>
          <div
            class="signin_popupBottomBtn"
            @click="openPopup('signinDetails', false)"
          >
            确定
          </div>
        </div>
      </van-popup>
      <van-popup
        v-model="popups.healthStatus"
        :get-container="getContainer"
        :close-on-click-overlay="false"
      >
        <div class="signin_popup">
          <div class="signin_popupTitle">每日健康上报</div>
          <div class="signin_popupContent">
            <van-radio-group v-model="healthStatus">
              <van-radio
                v-for="(item, i) in healthRadio"
                :key="i"
                class="health_radio"
                :name="i == healthRadio.lenght ? otherHealthStatus : item"
                checked-color="#0090d8"
                >{{ item }}
                <template #icon="props">
                  <i
                    class="iconItem"
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
          <div class="signin_popupBottomBtn" @click="signinTotal">
            签到
          </div>
        </div>
      </van-popup>
      <!-- <van-popup v-model="popups.confirmSignin" :get-container="getContainer">
        <div class="signin_popup">
          <div class="signin_popupContent">
            <div class="popup_ContentItem popup_paddinTop">
              <div class="popup_itemTitle">每日健康上报</div>
              <div class="popup_itemText">{{ healthStatus }}</div>
            </div>
            <div class="popup_ContentItem">
              <div class="popup_itemTitle">
                签到地址
                <div class="popup_itemLabel" @click="getCurrentAddress">
                  重新定位
                </div>
              </div>
              <div class="popup_itemText">{{ currentAddress }}</div>
            </div>
          </div>
          <div class="signin_popupBottomBtn" @click="signinTotal">确定</div>
        </div>
      </van-popup> -->
      <van-popup
        v-model="popups.updateRemind"
        :get-container="getContainer"
        @close="runRemind"
      >
        <div class="signin_popup">
          <div class="signin_popupContent">
            <div class="popup_remindText">
              {{ remindText }}
            </div>
            <div class="popupRemindBtn_panel">
              <div
                class="popup_remindBtn"
                @click="linkTo('/selfinfo', { cardid: userData.cardid })"
              >
                去修改
              </div>
            </div>
          </div>
        </div>
      </van-popup>
      <van-popup
        v-model="popups.evaluateRemind"
        :get-container="getContainer"
        @close="runRemind"
      >
        <div class="signin_popup">
          <div class="signin_popupContent">
            <div class="popup_remindText">
              您还未完成班主任评定，请尽快完成评定。
            </div>
            <div class="popupRemindBtn_panel">
              <div
                class="popup_remindBtn"
                @click="
                  linkTo('/evaluateTeacher', {
                    username: userData.banzhuren
                  })
                "
              >
                去评定
              </div>
            </div>
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
      userData: Object,
      popups: {
        learnEveryDay: false, // 每日一学
        signinDetails: false, // 签到详情
        healthStatus: false, // 健康上报
        confirmSignin: false, // 确认签到
        updateRemind: false, // 学生信息更新提醒
        evaluateRemind: false // 班主任评定提醒
      },
      currentYearMonth: "",
      firstDay: "",
      signinList: [], // 签到列表
      pageIndex: Number,
      learnContent: {
        context: "",
        wf_Creator: "",
        wf_docUnid: ""
      },
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
      currentAddress: "", // 当前签到地址
      latitude: "113.345073", // 纬度
      longitude: "23.182055", // 经度
      otherHealthStatus: "", // 其他症状输入框文本
      // 健康上报选项
      healthRadio: [],
      remindText: "",
      bgImage: ""
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.getBgImage();
    this.getLastSignin();
    // this.getSigninDetailsList();
    this.isLearnToday();
    this.isSigninTotal();
    this.getHealthStatus();
  },
  beforeMount() {},
  mounted() {
    this.resetCalendarContainerH();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getBgImage: function() {
      let that = this;
      that.$axios.post(that.$api.mobileImage).then(res => {
        if (res.data.fileurl) {
          that.bgImage = res.data.fileurl;
        }
      });
    },
    runRemind: function() {
      let that = this;
      let remindList = [
        {
          name: "updateRemind",
          fn: function() {
            that.$axios
              .post(that.$api.getUpdateUserInfoMsg, {
                cardid: that.userData.cardid
              })
              .then(res => {
                that.remindText = res.data;
                if (!res.data) {
                  run();
                } else {
                  that.popups.updateRemind = true;
                }
              });
            that.$tool.setLocal("updateRemind", true);
          }
        },
        {
          name: "evaluateRemind",
          fn: function() {
            that.$axios.post(that.$api.getBanZhuRenPingJiaMsg).then(res => {
              if (!res.data.temp) {
                let currentMonth = new Date().getMonth() + 1;
                for (let j = 0, jmax = res.data.month.length; j < jmax; j++) {
                  if (currentMonth == res.data.month[j].value) {
                    that.popups.evaluateRemind = true;
                    return;
                  }
                }
              }
            });
            that.$tool.setLocal("evaluateRemind", true);
          }
        }
      ];
      function run() {
        for (let i = 0, imax = remindList.length; i < imax; i++) {
          if (!that.$tool.getLocal(remindList[i].name)) {
            remindList[i].fn();
            break;
          }
        }
      }
      run();
    },
    // 今日是否签到
    isSigninTotal: function() {
      let that = this;
      that.$axios.post(that.$api.isSignin).then(res => {
        that.is_SigninTotal = res.data.hasQiandao;
      });
    },
    isLearnToday: function() {
      // 是否已经每日一学
      let that = this;
      that.$axios.post(that.$api.isLearnToday).then(res => {
        if (!res.data.hasMeizhouyixue) {
          getLearnContent();
        } else {
          if (that.is_SigninTotal) {
            that.runRemind();
          } else {
            that.openPopup("healthStatus", true);
          }
        }
      });
      // 获取每日一学内容
      function getLearnContent() {
        that.$axios.post(that.$api.getDailyStudy).then(res => {
          if (JSON.stringify(res.data) == "{}") {
            if (that.is_SigninTotal) {
              that.runRemind();
            } else {
              that.openPopup("healthStatus", true);
            }
            return;
          }
          for (let keys in res.data) {
            that.$set(that.learnContent, keys, res.data[keys]);
          }
          that.popups.learnEveryDay = true;
          // 每日一学倒计时
          let timer = setInterval(function() {
            that.countDown = that.countDown - 1 < 0 ? 0 : that.countDown - 1;
            if (that.countDown == 0) {
              clearInterval(timer);
            }
          }, 1000);
        });
      }
    },
    // 每日一学打卡
    recordLearnToday: function() {
      let that = this;
      if (that.countDown != 0) {
        return;
      }
      that.$toast.loading({
        message: "每日一学打卡中..."
      });
      that.$axios
        .post(that.$api.recordLearnEveryDay, {
          wf_docUnid: that.learnContent.wf_docUnid
        })
        .then(res => {
          this.$toast.clear();
          that.openPopup("learnEveryDay", false);
          that.$dialog
            .alert({
              message: "每日一学已打卡",
              theme: "round-button",
              confirmButtonColor: "#0090d8",
              className: "everyDayConfirm",
              width: "250px"
            })
            .then(() => {
              if (that.is_SigninTotal) {
                that.runRemind();
              } else {
                that.openPopup("healthStatus", true);
              }
            });
        });
    },
    getLastSignin: function() {
      let that = this;
      that.$axios.post(that.$api.getLastQianDaoMonth_student).then(res => {
        that.getSigninDetailsList(res.data);
      });
    },
    // 根据月份获取签到列表
    getSigninDetailsList: function() {
      let that = this;
      let today = new Date(new Date(new Date().toLocaleDateString()).getTime());
      let currentYearMonth = arguments[0] ? new Date(arguments[0]) : new Date();
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
            let todayDate =
              new Date(data[i].wf_Created.replace(/-/g, "/")).getDate() - 1;
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
            }
          }
        });
    },
    // 根据日期查看签到详情
    getSigninDetails: function(isSignin, dayClass, dates) {
      let that = this;
      if (dates < 10) {
        dates = "0" + dates;
      }
      if (dayClass != "future") {
        that.signinItem.is_signin = false;
        that.signinItem.date = that.currentYearMonth + dates + "日";
        if (isSignin) {
          let dateStr =
            that.currentYearMonth.replace(/年/, "-").replace(/月/, "-") + dates;
          that.$axios
            .post(that.$api.getSigninDetails, {
              date: dateStr
            })
            .then(res => {
              that.signinItem.is_signin = true;
              that.signinItem.signinAddress = res.data.address;
              if (res.data.jiankangStatus == that.healthRadio.length) {
                that.signinItem.healthStatus = res.data.remark;
              } else {
                that.signinItem.healthStatus = res.data.jiankangText;
              }
              that.openPopup("signinDetails", true);
            });
        } else {
          that.openPopup("signinDetails", true);
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
    },
    // 获取健康状态字典
    getHealthStatus: function() {
      let that = this;
      that.$axios.post(that.$api.healthStatus, {}).then(res => {
        let data = res.data;
        that.healthStatus = data[0].text;
        for (let i = 0, imax = data.length; i < imax; i++) {
          that.healthRadio[i] = data[i].text;
        }
      });
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
    // 动态日历面板高度
    resetCalendarContainerH: function() {
      let calendarContainer = document.getElementsByClassName(
          "signin_calendarContainer"
        )[0],
        topBar_container = document.getElementsByClassName(
          "topBar_container"
        )[0],
        signin_topPanel = document.getElementsByClassName("signin_topPanel")[0],
        tapList_container = document.getElementsByClassName(
          "tapList_container"
        )[0];
      let windowHight = document.documentElement.clientHeight;
      let calendarContainerHeight =
        windowHight -
        topBar_container.offsetHeight -
        signin_topPanel.offsetHeight -
        tapList_container.offsetHeight +
        "px";
      calendarContainer.style.height = calendarContainerHeight;
    },
    // 返回一个特定的 DOM 节点，作为每日一学弹窗挂载的父节点
    getContainer() {
      return document.querySelector(".signin_calendarContainer");
    },
    // 打开弹框
    openPopup: function(target, state, fn) {
      let that = this;
      for (let key in that.popups) {
        that.popups[key] = false;
      }
      that.popups[target] = state;
      if (fn) {
        fn();
      }
    },
    // 今日份签到
    signinTotal: function() {
      let that = this;
      that.$toast.loading({
        duration: 0,
        message: "签到中请稍后..."
      });
      if (that.$tool.isWechat()) {
        that.$tool.getCurrentAddress(
          function(data) {
            that.$tool.locationToAddress(
              data.latitude,
              data.longitude,
              function(res) {
                that.currentAddress = res.data.result.address;
                sign_in();
              }
            );
          },
          function(err) {
            console.log(err);
            that.$toast("请打开设备的定位功能");
            return;
          }
        );
      } else {
        sign_in();
      }
      // if (that.$tool.isWechat()) {
      //   navigator.geolocation.getCurrentPosition(
      //     function(data) {
      //       that.$tool.locationToAddress(
      //         data.coords.latitude,
      //         data.coords.longitude,
      //         function(res) {
      //           that.currentAddress = res.data.result.address;
      //           sign_in();
      //         }
      //       );
      //     },
      //     function(err) {
      //       console.log(err);
      //       console.log(err.code);
      //       console.log(err.message);
      //       switch (err.code) {
      //         case 2:
      //           that.$toast("请打开设备的GPS定位功能");
      //           break;
      //         case 3:
      //           that.$toast("网络不佳，请稍后重试");
      //           break;
      //         default:
      //           that.$toast("请打开设备的GPS定位功能");
      //           break;
      //       }
      //       return;
      //     },
      //     {
      //       enableHighAcuracy: false, //位置是否精确获取
      //       timeout: 5000, //获取位置允许的最长时间
      //       maximumAge: 1000 //多久更新获取一次位置
      //     }
      //   );
      // } else {
      //   sign_in();
      // }
      function sign_in() {
        let jiankangStatus =
          that.healthRadio.getArrayIndex(that.healthStatus) + 1;
        that.$axios
          .post(that.$api.signin, {
            latitude: that.latitude, // 纬度
            longitude: that.longitude, // 经度
            address: that.currentAddress, // 打卡地点
            jiankangStatus: jiankangStatus, // 健康状态
            remark: that.otherHealthStatus // 其他说明
          })
          .then(res => {
            that.$toast.clear();
            that.runRemind();
            that.isSigninTotal();
            that.getSigninDetailsList();
            that.openPopup("healthStatus", false);
          });
      }
    },
    linkTo: function(path, query) {
      this.$router.push({
        path: path,
        query: arguments[1] ? query : ""
      });
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
.container {
  background-color: #0090d8;
  background-size: cover;
}
.signin_topPanel {
  position: relative;
  width: 100%;
  height: 200px;
  /* background-color: #0090d8; */
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
.signin_calendarContainer {
  overflow-x: hidden;
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
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
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
  font-weight: bold;
  color: #323233;
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
  padding: 0px 1.25rem 20px 1.25rem;
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
.popup_remindText {
  box-sizing: border-box;
  padding: 28px 1rem 20px 1rem;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.popupRemindBtn_panel {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 0px 30px 0px;
}
.popup_remindBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.25rem;
  height: 1.875rem;
  background-color: #0090d8;
  border-radius: 2px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
<style>
.signin_calendarContainer .van-popup {
  background-color: transparent;
}
.everyDayConfirm .van-dialog--round-button {
  padding: 8px 70px 16px;
}
</style>
