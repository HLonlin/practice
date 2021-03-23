<template>
  <div class="chatroom_container">
    <div class="topbar_panel">
      <van-nav-bar
        :title="
          chatWith.username
            ? chatWith.username
            : chatWith.userName
            ? chatWith.userName
            : chatWith.name
        "
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
          item.comefromName ==
          (userData.username ? userData.username : userData.userName)
            ? 'msgItem_right'
            : 'msgItem_left'
        ]"
      >
        <div class="msgItem_time">{{ item.time }}</div>
        <div class="msgItem_box">
          <div
            class="msgItem_header"
            v-if="
              item.comefromName !=
                (userData.username ? userData.username : userData.userName)
            "
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
          <div
            class="msgItem_content"
            v-html="item.info"
            @click="showPreview($event)"
          ></div>
          <div
            class="msgItem_header"
            v-if="
              item.comefromName ==
                (userData.username ? userData.username : userData.userName)
            "
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
        <van-uploader
          accept="image/*"
          :before-read="beforeRead"
          :after-read="afterRead"
        >
          <i class="iconItem icon_shangchuanfujiantubiao icon_smile"></i>
        </van-uploader>
        <!-- <i class="iconItem icon_shangchuanfujiantubiao icon_smile"></i> -->
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
              v-html="item.content"
            ></div>
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
    <van-image-preview
      v-model="imagePreview"
      :images="images"
      :startPosition="startPosition"
    ></van-image-preview>
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
      msgDetailList: [], //消息内容列表
      timer: "",
      startPosition: 0,
      imagePreview: false,
      images: []
    };
  },
  beforeCreate() {},
  created() {
    let that = this;
    that.init();
    this.getCommonList();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    clearInterval(this.timer);
  },
  destroyed() {},
  methods: {
    showPreview: function(event) {
      this.startPosition = this.images.indexOf(event.target.src);
      this.imagePreview = true;
    },
    beforeRead(file) {
      if (file.type.indexOf("image") != 0) {
        this.$toast("请选择图片发送");
        return false;
      }
      return true;
    },
    afterRead: function(file) {
      let files = file.file;
      let that = this;
      let host = "https://practice.dev.qooroo.cn:8443/practice"; // 测试
      // let host='https://practice.gzslits.com.cn/practice'; // 生产
      let uploadUrl = host + "/api/toolkit/upload/image";
      let formdata = new FormData();
      formdata.append(files.name, files, files.name);
      //设置请求头
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const axiosAjax = that.$axios.create({
        timeout: 1000 * 60 //时间
      });
      axiosAjax
        .post(uploadUrl, formdata, config)
        .then(res => {
          that.$toast(res.data.message);
          let file = res.data.data;
          that.sendImg(file[0].src);
          console.log(file);
        })
        .catch(() => {});
    },
    onClickLeft: function() {
      this.$router.go(-1);
    },
    init: function() {
      let that = this;
      let userData = this.$tool.getLocal("userData");
      if (userData) {
        that.userData = userData;
        that.userData.chatWith = JSON.parse(that.$route.query.chatWith);
      }
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.getUserByCardId_teacher
            : that.$api.findUserByUserId,
          that.userData.isTeacher
            ? {
                cardid: that.userData.chatWith
              }
            : { userid: that.userData.chatWith }
        )
        .then(res => {
          let readata = res.data;
          for (let keys in readata) {
            that.$set(that.chatWith, keys, readata[keys]);
          }
          that.getMsgDetail(true);
          clearInterval(that.timer);
          that.timer = setInterval(function() {
            that.getMsgDetail(false);
          }, 1000);
        });
    },
    getMsgDetail: function(nextTick) {
      let that = this;
      let data = {};
      if (that.userData.isTeacher) {
        data = {
          sendto: that.userData.chatWith,
          comefrom: that.userData.userid,
          studentname: that.chatWith.username
            ? that.chatWith.username
            : that.chatWith.userName
        };
      } else {
        data = {
          sendto: that.userData.chatWith,
          comefrom: that.userData.cardid,
          username: that.chatWith.name
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
          that.images = [];
          for (let i = 0, imax = res.data.length; i < imax; i++) {
            that.$set(that.msgDetailList, i, res.data[i]);
            let dateObj = that.$tool.getDateObj(
              res.data[i].wf_Created.replace(/-/g, "/")
            );
            let imgBox = document.createElement("div");
            imgBox.innerHTML = res.data[i].info;
            if (
              imgBox.children.length > 0 &&
              imgBox.children[0].tagName === "IMG"
            ) {
              that.images.push(imgBox.children[0].src);
            }
            let time =
              (dateObj.month < 10 ? "0" + dateObj.month : dateObj.month) +
              "月" +
              (dateObj.date < 10 ? "0" + dateObj.date : dateObj.date) +
              "日 " +
              (dateObj.hour < 10 ? "0" + dateObj.hour : dateObj.hour) +
              ":" +
              (dateObj.minute < 10 ? "0" + dateObj.minute : dateObj.minute);
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
            sendto: that.userData.chatWith,
            info: that.msg
          }
        )
        .then(res => {
          that.msg = "";
          that.getMsgDetail(true);
        });
    },
    sendImg: function(url) {
      let that = this;
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.sendMsg_teacher
            : that.$api.sendMsg_student,
          {
            sendto: that.userData.chatWith,
            info: "<img url='" + url + "' />"
          }
        )
        .then(res => {
          that.msg = "";
          that.getMsgDetail(true);
        });
    },
    chatRecord: function() {
      let that = this;
      let chatWith = {
        searchkeywords: "",
        username: that.chatWith.username
          ? that.chatWith.username
          : that.chatWith.userName
          ? that.chatWith.userName
          : that.chatWith.name,
        logo: that.chatWith.logo,
        userid: that.chatWith.cardid
          ? that.chatWith.cardid
          : that.chatWith.loginid,
        sendto: that.userData.userid
          ? that.userData.userid
          : that.userData.cardid,
        comefrom: that.chatWith.cardid
          ? that.chatWith.cardid
          : that.chatWith.loginid
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
      this.$router.push({
        path: "/commonwords",
        query: { type: type }
      });
    },
    readMsg: function() {
      let that = this;
      that.$axios.post(that.$api.readMsg, { comefrom: that.userData.chatWith });
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
  height: auto;
  min-width: 1.875rem;
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
  word-wrap: break-word;
  white-space: pre-wrap;
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
  word-wrap: break-word;
  white-space: pre-wrap;
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
.msgItem_content img {
  max-width: 100%;
}
</style>
