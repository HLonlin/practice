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
      akskskda
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
        <i class="iconItem icon_biaoqingtubiao icon_smile"></i>
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
          <div class="commonText_bottomPanel">
            <div class="commonText_bottomBtn">
              <i class="iconItem icon_tianjiatubiao icon_bottomIcon"></i>
              <div class="bottomBtn_text" @click="openPopup('addCommon', true)">
                添加
              </div>
            </div>
            <div class="commonText_bottomBtn">
              <i class="iconItem icon_guanlitubiao icon_bottomIcon"></i>
              <div
                class="bottomBtn_text"
                @click="openPopup('manageCommon', true)"
              >
                管理
              </div>
            </div>
          </div>
        </div>
      </van-popup>
      <van-popup
        class="addCommon_popup"
        position="right"
        :close-on-click-overlay="false"
        v-model="popups.addCommon"
        :get-container="getContainer"
        :overlay-style="{
          backgroundColor: 'rgba(255, 255, 255, 1)'
        }"
      >
        <div class="addCommon_panel">
          <van-nav-bar
            title="添加常用语"
            :fixed="true"
            :placeholder="true"
            :safe-area-inset-top="true"
            :border="false"
            left-arrow
            right-text="完成"
            @click-left="cancelAddCommon"
            @click-right="addText"
          >
          </van-nav-bar>
          <van-field
            class="addCommon_text"
            v-model="addCommonText"
            :autosize="{ maxHeight: 500, minHeight: 500 }"
            type="textarea"
            placeholder="请输入您想要添加的常用语。"
          />
        </div>
      </van-popup>
      <van-popup
        class="manageCommon_popup"
        position="right"
        :close-on-click-overlay="false"
        v-model="popups.manageCommon"
        :get-container="getContainer"
        :overlay-style="{
          backgroundColor: 'rgba(255, 255, 255, 1)'
        }"
      >
        <div class="manageCommon_panel">
          <van-nav-bar
            title="管理常用语"
            :fixed="true"
            :placeholder="true"
            :safe-area-inset-top="true"
            :border="false"
            left-arrow
            @click-left="openPopup('manageCommon', false)"
          >
          </van-nav-bar>
          <div class="commonList_panel">
            <div class="commonItem_panel">
              <div class="common_item" v-for="(item, i) in commonList" :key="i">
                <div class="commonItem_label">
                  {{ item.content }}
                </div>
                <div class="commonItemBtn_panel">
                  <div class="commonItem_btn" @click="openEditCommon(item)">
                    <i class="iconItem icon_bianjitubiao"></i>
                    编辑
                  </div>
                  <div class="commonItem_btn" @click="delCommon(item)">
                    <i class="iconItem icon_shanchutubiao"></i>
                    删除
                  </div>
                </div>
              </div>
              <div class="common_emptyList" v-if="commonList.length == 0">
                请先添加常用语
              </div>
            </div>
          </div>
          <div class="popupBottomBtn_panel">
            <div
              class="bottomBtn_addCommonText"
              @click="openPopup('addCommon', true)"
            >
              添加常用语
            </div>
          </div>
        </div>
      </van-popup>
      <van-popup
        class="editCommon_popup"
        position="right"
        :close-on-click-overlay="false"
        v-model="popups.editCommon"
        :get-container="getContainer"
        :overlay-style="{
          backgroundColor: 'rgba(255, 255, 255, 1)'
        }"
      >
        <div class="editCommon_panel">
          <van-nav-bar
            title="编辑常用语"
            :fixed="true"
            :placeholder="true"
            :safe-area-inset-top="true"
            :border="false"
            left-arrow
            right-text="完成"
            @click-left="cancelEditCommon"
            @click-right="editCommon"
          >
          </van-nav-bar>
          <van-field
            class="editCommon_text"
            v-model="editItem.content"
            :autosize="{ maxHeight: 500, minHeight: 500 }"
            type="textarea"
            placeholder="请输入常用语。"
          />
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
export default {
  name: "chatroom",
  data() {
    return {
      popups: {
        commonText: false, // 常用语底部弹窗
        expression: false, // 表情弹框
        addCommon: false, // 添加常用语
        manageCommon: true, // 管理常用语
        editCommon: false // 编辑常用语
      },
      msg: "", // 待发送消息
      chatWith: {}, // 聊天对象
      commonList: [], // 常用列表
      addCommonText: "", // 添加的常用语
      editItem: {} // 编辑中的常用语
    };
  },
  beforeCreate() {},
  created() {
    this.chatWith = JSON.parse(this.$route.query.chatWith);
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
      this.$router.go(-1);
    },
    sendMsg: function() {
      let that = this;
      if (that.msg == "") {
        Toast({
          message: "发送消息不可为空"
        });
        return;
      }
      that.$axios
        .post(that.$api.sendMsg_student, {
          sendto: that.chatWith.userid,
          info: that.msg
        })
        .then(res => {
          that.msg = "";
        });
    },
    chatRecord: function() {
      console.log("查看历史消息");
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
      that.$axios.post(that.$api.remarkList, {}).then(res => {
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
    // 添加常用语
    addText: function() {
      let that = this;
      that.addCommonText = that.addCommonText.trim();
      if (that.addCommonText.trim) {
        that.$axios
          .post(that.$api.remarkAdd, { content: that.addCommonText })
          .then(res => {
            that.openPopup("addCommon", false);
            Toast.success("添加成功");
          });
      } else {
        Toast({
          message: "常用语不能为空"
        });
      }
    },
    // 取消添加常用语
    cancelAddCommon: function() {
      let that = this;
      function beforeClose(action, done) {
        if (action === "confirm") {
          done();
          that.openPopup("addCommon", false);
          that.addCommonText = "";
        } else {
          done();
        }
      }
      that.addCommonText = that.addCommonText.trim();
      if (that.addCommonText) {
        Dialog.confirm({
          title: "温馨提示",
          message: "内容尚未保存，确定放弃？",
          beforeClose
        });
      } else {
        that.openPopup("addCommon", false);
        that.addCommonText = "";
      }
    },
    openEditCommon: function(item) {
      let that = this;
      for (let keys in item) {
        that.$set(that.editItem, keys, item[keys]);
      }
      this.openPopup("editCommon", true);
    },
    // 取消编辑常用语
    cancelEditCommon: function() {
      let that = this;
      function beforeClose(action, done) {
        if (action === "confirm") {
          done();
          that.openPopup("manageCommon", true);
        } else {
          done();
        }
      }
      Dialog.confirm({
        title: "温馨提示",
        message: "内容尚未保存，确定放弃？",
        beforeClose
      });
    },
    // 编辑常用语
    editCommon: function() {
      let that = this;
      that.$axios
        .post(that.$api.remarkEdit, {
          wf_docUnid: that.editItem.wf_docUnid,
          content: that.editItem.content
        })
        .then(res => {
          that.getCommonList();
          that.openPopup("manageCommon", true);
        });
    },
    // 删除常用语
    delCommon: function(item) {
      let that = this;
      function beforeClose(action, done) {
        if (action === "confirm") {
          that.$axios
            .post(that.$api.remarkDelete, { wf_docUnid: item.wf_docUnid })
            .then(res => {
              that.getCommonList();
              done();
            });
        } else {
          done();
        }
      }

      Dialog.confirm({
        title: "温馨提示",
        message: "您确定要删除此常用语吗？",
        beforeClose
      });
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
.addCommon_popup,
.manageCommon_popup,
.editCommon_popup {
  width: 100%;
  height: 100vh;
  top: 0px;
  transform: none;
}
.addCommon_panel,
.manageCommon_panel,
.editCommon_panel {
  width: 100%;
  height: 100%;
}
.manageCommon_panel {
  overflow: hidden;
}
.commonList_panel {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 1rem 120px 1rem;
}
.commonItem_label {
  box-sizing: border-box;
  padding: 15px 0px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.commonItemBtn_panel {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  box-sizing: border-box;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #eeeeee;
}
.commonItem_btn {
  box-sizing: border-box;
  padding-left: 1.25rem;
}
.common_emptyList {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  padding: 30px 0px;
  box-sizing: border-box;
}
.popupBottomBtn_panel {
  position: fixed;
  width: 100%;
  bottom: 0px;
  box-sizing: border-box;
  padding: 20px 1rem;
  background-color: #ffffff;
}
.bottomBtn_addCommonText {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  background-color: #0090d8;
  border-radius: 2px;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
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
.addCommon_popup .van-nav-bar__text,
.editCommon_popup .van-nav-bar__text {
  color: #ffffff;
}
</style>
