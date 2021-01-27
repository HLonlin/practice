<template>
  <div class="chatroom_container">
    <div class="topbar_panel">
      <van-nav-bar
        :title="chatWith.username"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <i
            class="iconItem icon_liaotianjilutubiao icon_record"
            @click="chatRecord"
          ></i>
        </template>
      </van-nav-bar>
    </div>
    <div class="messages_list">
      <div
        v-for="(item, i) in msgDetailList"
        :key="i"
        class="msgItem_panel"
        :class="[
          {},
          item.comefromName == chatWith.username
            ? 'msgItem_left'
            : 'msgItem_right'
        ]"
      >
        <div class="msgItem_time">{{ item.time }}</div>
        <div class="msgItem_box">
          <div
            class="msgItem_header"
            v-if="item.comefromName == chatWith.username"
          >
            <img
              class="msgItem_logo"
              :src="
                chatWith.logo
                  ? chatWith.logo
                  : require('@/assets/images/default.png')
              "
            />
          </div>
          <div class="msgItem_content">
            {{ item.info }}
          </div>
          <div
            class="msgItem_header"
            v-if="item.comefromName != chatWith.username"
          >
            <img
              class="msgItem_logo"
              :src="
                userData.logo
                  ? userData.logo
                  : require('@/assets/images/default.png')
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_bar">
      <div class="bottom_barLeft">
        <i
          class="iconItem icon_changyongyutubiao icon_common"
          @click="openPopup('commonText', !popups.commonText)"
        ></i>
        <van-field
          v-model="msg"
          class="messageBox"
          type="textarea"
          :autosize="{ maxHeight: 110, minHeight: 10 }"
          :center="true"
          rows="1"
          @keyup.enter="sendMsg"
        />
      </div>
      <div class="sendMsgBtnBox">
        <!-- <i class="iconItem icon_biaoqingtubiao icon_smile"></i> -->
        <div class="sendMsgBtn" @click="sendMsg">发送</div>
      </div>
    </div>
    <div class="commonText_panel">
      <van-popup
        class="commonText_popup"
        v-model="popups.commonText"
        position="bottom"
        :overlay-style="{
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }"
        :get-container="getContainer"
      >
        <div class="commonText_container">
          <div class="commonList_panel">
            <div
              v-for="(item, i) in commonList"
              :key="i"
              class="commonText_label"
              :title="item.content"
              @click="useCommonText(item.content)"
            >
              {{ item.content }}
            </div>
            <div
              class="commonText_label"
              v-if="commonList.length == 0"
              :style="{ color: '#999999' }"
            >
              请先添加常用语
            </div>
          </div>
          <div class="commonText_bottomPanel">
            <div class="commonText_bottomBtn">
              <i class="iconItem icon_tianjiatubiao icon_bottomIcon"></i>
              <div class="bottomBtn_text" @click="turnCommonWord(0)">
                添加
              </div>
            </div>
            <div class="commonText_bottomBtn">
              <i class="iconItem icon_guanlitubiao icon_bottomIcon"></i>
              <div class="bottomBtn_text" @click="turnCommonWord(2)">
                管理
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatroom",
  data() {
    return {
      userData: Object,
      popups: {
        commonText: false, // 常用语底部弹窗
        expression: false // 表情弹框
      },
      msg: "", // 待发送消息
      chatWith: {}, // 聊天对象
      commonList: [], // 常用列表
      msgDetailList: [] //消息内容列表
    };
  },
  beforeCreate() {},
  created() {
    let that = this;
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.chatWith = JSON.parse(this.$route.query.chatWith);
    this.getMsgDetail(true);
    clearInterval(window.getMsgDetail);
    window.getMsgDetail = setInterval(function() {
      that.getMsgDetail();
    }, 1000);
    this.getCommonList();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {
      clearInterval(window.getMsgDetail);
      this.$router.go(-1);
    },
    reSetMsgListH: function() {
      let topbar_panel = document.getElementsByClassName("topbar_panel")[0];
      let messages_list = document.getElementsByClassName("messages_list")[0];
      let bottom_bar = document.getElementsByClassName("bottom_bar")[0];
      let winH = document.documentElement.clientHeight;
      messages_list.style.height =
        winH - topbar_panel.offsetHeight - bottom_bar.offsetHeight + "px";
      messages_list.scrollTop = messages_list.scrollHeight;
    },
    sendMsg: function() {
      let that = this;
      if (that.msg == "") {
        that.$toast({
          message: "发送消息不可为空"
        });
        return;
      }
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.sendMsg_teacher
            : that.$api.sendMsg_student,
          {
            sendto: that.chatWith.userid,
            info: that.msg
          }
        )
        .then(res => {
          that.msg = "";
          that.getMsgDetail(true);
        });
    },
    chatRecord: function() {
      clearInterval(window.getMsgDetail);
      let that = this;
      let chatWith = {
        username: that.chatWith.username,
        logo: that.chatWith.logo,
        userid: that.chatWith.userid
      };
      that.$router.push({
        path: "/chatrecord",
        query: { chatWith: JSON.stringify(chatWith) }
      });
    },
    getContainer() {
      return document.querySelector(".commonText_panel");
    },
    openPopup: function(keys, val) {
      for (let key in this.popups) {
        this.popups[key] = false;
      }
      this.popups[keys] = val;
    },
    getMsgDetail: function(nextTick) {
      let that = this;
      let data = {};
      if (that.userData.isTeacher) {
        data = {
          comefrom: that.chatWith.userid,
          studentname: that.chatWith.username
        };
      } else {
        data = {
          comefrom: that.chatWith.userid,
          username: that.chatWith.username
        };
      }
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.msgDetail_teacher
            : that.$api.msgDetail,
          data
        )
        .then(res => {
          that.msgDetailList = [];
          for (let i = 0, imax = res.data.length; i < imax; i++) {
            that.$set(that.msgDetailList, i, res.data[i]);
            let dateObj = that.$tool.getDateObj(res.data[i].wf_Created);
            let time =
              (dateObj.month < 10 ? "0" + dateObj.month : dateObj.month) +
              "月" +
              dateObj.date +
              "日 " +
              dateObj.hour +
              ":" +
              dateObj.minute;
            that.$set(that.msgDetailList[i], "time", time);
          }
          if (nextTick) {
            // 消息滚动到最底部
            that.$nextTick(() => {
              that.reSetMsgListH();
              that.readMsg();
            });
          }
        });
    },
    getCommonList: function() {
      let that = this;
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.remarkList_teacher
            : that.$api.remarkList,
          {}
        )
        .then(res => {
          for (let i = 0, imax = res.data.length; i < imax; i++) {
            that.$set(that.commonList, i, res.data[i]);
          }
        });
    },
    // 使用常用语
    useCommonText: function(text) {
      this.msg = text;
      this.openPopup("commonText", false);
    },
    turnCommonWord: function(type) {
      clearInterval(window.getMsgDetail);
      this.$router.push({
        path: "/commonwords",
        query: { type: type }
      });
    },
    readMsg: function() {
      let that = this;
      that.$axios.post(that.$api.readMsg, { comefrom: that.chatWith.userid });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatroom_container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
}
.icon_record {
  font-size: 1rem;
  color: #ffffff;
}
.messages_list {
  display: block;
  overflow-y: scroll;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem 20px 1rem;
  background-color: #f6f6f6;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}
.messages_list::-webkit-scrollbar {
  width: 0 !important;
}
.msgItem_panel {
  width: 100%;
}
.msgItem_time {
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  box-sizing: border-box;
  padding: 15px 0px;
}

.msgItem_box {
  display: flex;
  align-items: center;
}
.msgItem_right .msgItem_box {
  justify-content: flex-end;
}
.msgItem_header {
  align-self: start;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
  overflow: hidden;
}
.msgItem_logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.msgItem_content {
  position: relative;
  box-sizing: border-box;
  padding: 10px 0.875rem;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  border-radius: 4px;
  max-width: 16rem;
}
.msgItem_left .msgItem_content {
  margin-left: 1rem;
  background-color: #ffffff;
}
.msgItem_right .msgItem_content {
  margin-right: 1rem;
  background-color: #0090d8;
  color: #ffffff;
}
.msgItem_left .msgItem_content::before {
  position: absolute;
  top: 12.5px;
  left: -5px;
  content: "";
  border-right: 5px solid #ffffff;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
.msgItem_right .msgItem_content::after {
  position: absolute;
  top: 12.5px;
  right: -5px;
  content: "";
  border-left: 5px solid #0090d8;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.bottom_bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 1rem;
  background-color: #eeeeee;
  position: fixed;
  bottom: 0px;
}
.bottom_barLeft {
  width: 100%;
  display: flex;
  align-items: center;
}
.messageBox {
  margin: 0px 1rem;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 0px 0.5rem;
}
.icon_common,
.icon_smile {
  font-size: 1.125rem;
}
.sendMsgBtnBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.sendMsgBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.375rem;
  height: 22px;
  background-color: #0090d8;
  border-radius: 2px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  margin-left: 1rem;
}
.commonText_popup {
  bottom: 50px;
}
.commonText_container {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem 0px 1rem;
  background-color: #ffffff;
}
.commonList_panel {
  max-height: 150px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.commonList_panel::-webkit-scrollbar {
  width: 0 !important;
}
.commonText_label {
  box-sizing: border-box;
  padding: 15px 0px;
  border-bottom: 1px solid #eeeeee;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.commonText_bottomPanel {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.commonText_bottomPanel::after {
  position: absolute;
  content: "";
  width: 1px;
  height: 30px;
  background-color: #eeeeee;
}
.commonText_bottomBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  box-sizing: border-box;
  padding: 15px 0px;
}
.icon_bottomIcon {
  font-size: 0.75rem;
  color: #0090d8;
}
.bottomBtn_text {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0090d8;
  box-sizing: border-box;
  padding: 0px 0px 0px 0.3125rem;
}
</style>
<style>
.chatroom_container .van-nav-bar {
  background-color: #0090d8;
}
.chatroom_container .van-nav-bar__placeholder,
.chatroom_container .van-nav-bar__content {
  height: 44px !important;
}
.chatroom_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.chatroom_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.bottom_bar .van-field__control {
  line-height: 30px;
}
</style>
