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
          <div class="popup_author">——{{ learnContent.wf_Creator }}</div>
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
                <div class="popup_itemLabel" @click="relocation">重新定位</div>
              </div>
              <div class="popup_itemText">广东省广州市越秀区小北路22号</div>
            </div>
          </div>
          <div class="signin_popupBottomBtn" @click="signinTotal">确定</div>
        </div>
      </van-popup>
      <van-popup
        v-model="popups.updateRemind"
        :get-container="getContainer"
        @close="updateRemindClose"
      >
        <div class="signin_popup">
          <div class="signin_popupContent">
            <div class="popup_remindText">
              {{ remindText }}
            </div>
            <div class="popupRemindBtn_panel">
              <div class="popup_remindBtn" @click="linkTo">去修改</div>
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
 * 3KWBZ-6TXWI-M2SGX-5SMDX-GD7N3-IIBMB
 */
import wx from "weixin-js-sdk"; // 微信sdk
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
        updateRemind: false // 学生信息更新提醒
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
      currentAddress: "广东省广州市越秀区小北路22号", // 当前签到地址
      latitude: "113.345073", // 纬度
      longitude: "23.182055", // 经度
      otherHealthStatus: "", // 其他症状输入框文本
      // 健康上报选项
      healthRadio: [],
      remindText: ""
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.getSigninDetailsList();
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
    getUpdateUserInfoMsg: function() {
      let that = this;
      if (that.$tool.getLocal("updateRemindClose")) return;
      that.$axios
        .post(that.$api.getUpdateUserInfoMsg, { cardid: that.userData.cardid })
        .then(res => {
          that.remindText = res.data;
          if (!res.data) {
            return;
          } else {
            that.popups.updateRemind = true;
          }
        });
    },
    // 今日是否签到
    isSigninTotal: function() {
      let that = this;
      that.$axios.post(that.$api.isSignin, {}).then(res => {
        that.is_SigninTotal = res.data.hasQiandao;
      });
    },
    isLearnToday: function() {
      // 是否已经每日一学
      let that = this;
      that.$axios.post(that.$api.isLearnToday, {}).then(res => {
        if (!res.data.hasMeizhouyixue) {
          getLearnContent();
        } else {
          that.getUpdateUserInfoMsg();
        }
      });
      // 获取每日一学内容
      function getLearnContent() {
        that.$axios.post(that.$api.getDailyStudy, {}).then(res => {
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
              confirmButtonColor: "#0090d8"
            })
            .then(() => {
              that.getUpdateUserInfoMsg();
            });
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
        for (let i = 0, imax = data.length; i < imax; i++) {
          that.healthRadio[i] = data[i].text;
          // that.$set(that.healthRadio, i, data[i].text);
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
      //采用prototype原型实现方式，查找元素在数组中的索引值
      Array.prototype.getArrayIndex = function(obj) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] === obj) {
            return i;
          }
        }
        return -1;
      };
      let jiankangStatus =
        that.healthRadio.getArrayIndex(that.healthStatus) + 1;
      let remark = "";
      if (jiankangStatus == that.healthRadio.length) {
        remark = that.otherHealthStatus;
      }
      that.$axios
        .post(that.$api.signin, {
          latitude: that.latitude, // 纬度
          longitude: that.longitude, // 经度
          address: that.currentAddress, // 打卡地点
          jiankangStatus: jiankangStatus, // 健康状态
          remark: remark // 其他说明
        })
        .then(res => {
          that.openPopup("confirmSignin", false);
          that.isSigninTotal();
          that.getSigninDetailsList();
        });
    },
    // 获取地址
    getAddress: function() {
      let geocoder = new qq.maps.Geocoder({
        complete: function(result) {
          console.log("成功：" + result.detail.address);
        }
      });
      var coord = new qq.maps.LatLng(39.987816, 116.328327);
      geocoder.getAddress(coord);
    },
    // 重新定位签到地址
    relocation() {
      let that = this,
        u = navigator.userAgent;
      if (u.indexOf("MicroMessenger") > -1) {
      } else {
        that.$toast({
          message: "请在微信端进行此操作"
        });
        return;
      }
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let url = "";
      if (isAndroid) {
        url = location.href;
      }
      if (isIOS) {
        url = location.href.split("#")[0]; //hash后面的部分如果带上ios中config会不对
      }
      that.$axios
        .get(that.$api.getWechatInvokeSign, {
          url: url
        })
        .then(response => {
          let data = response.data;
          wx.config({
            beta: true,
            debug: false,
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ["getLocation", "openLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function() {
            that.$toast({
              message: "wxReady"
            });
            wx.getLocation({
              type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function(res) {
                that.$toast({
                  message: "getLocationSuccess"
                });
                wx.openLocation({
                  latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                  longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
                  scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                  success: function(res) {
                    that.$toast({
                      message: "openLocationSuccess"
                    });
                  },
                  fail: function(err) {
                    that.$toast({
                      message: "openLocationFail"
                    });
                  }
                });
              },
              fail: function(err) {
                that.$toast({
                  message: "位置获取失败！"
                });
              }
            });
          });
        });
    },
    linkTo: function() {
      let that = this;
      that.updateRemindClose();
      this.$router.push({
        path: "/selfinfo",
        query: { cardid: that.userData.cardid }
      });
    },
    updateRemindClose: function() {
      this.$tool.setLocal("updateRemindClose", true);
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
.signin_calendarContainer {
  overflow: hidden;
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
</style>
