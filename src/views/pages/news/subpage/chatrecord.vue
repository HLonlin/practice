<template>
  <div class="chatrecord_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="聊天记录"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </div>
    <van-list
      class="messages_list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getRecord"
      :offset="0"
    >
      <div v-show="finished">
        <div
          v-for="(item, i) in recordList"
          :key="i"
          class="msgItem_panel"
          :class="[
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
            <div class="msgItem_content" v-html="item.info"></div>
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
    </van-list>
  </div>
</template>

<script>
// 历史消息、聊天记录页
export default {
  name: "chatrecord",
  data() {
    return {
      userData: Object,
      chatWith: {},
      loading: false,
      finished: false,
      recordList: [],
      pageNum: 1,
      pageSize: 10
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.chatWith = JSON.parse(this.$route.query.chatWith);
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
    //  滚动到底部
    reSetMsgListH: function() {
      let topbar_panel = document.getElementsByClassName("topbar_panel")[0];
      let messages_list = document.getElementsByClassName("messages_list")[0];
      let winH = document.documentElement.clientHeight;
      messages_list.style.height = winH - topbar_panel.offsetHeight + "px";
      messages_list.scrollTop = messages_list.scrollHeight;
    },
    getRecord: function() {
      let that = this;
      let data = {};
      if (that.userData.isTeacher) {
        data = {
          sendto: that.chatWith.sendto,
          comefrom: that.chatWith.comefrom,
          studentname: that.chatWith.username,
          searchkeywords: that.chatWith.searchkeywords
            ? that.chatWith.searchkeywords
            : ""
        };
      } else {
        data = {
          sendto: that.chatWith.sendto,
          comefrom: that.chatWith.comefrom,
          username: that.chatWith.username,
          searchkeywords: that.chatWith.searchkeywords
            ? that.chatWith.searchkeywords
            : ""
        };
      }
      that.loading = true;
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.historyMsgDetailList_teacher
            : that.$api.historyMsgDetailList,
          data
        )
        .then(res => {
          // 加载状态结束
          that.loading = false;
          that.pageNum = that.pageNum + 1;
          let historyDetailList = res.data.historyDetailList;
          for (let i = 0, imax = historyDetailList.length; i < imax; i++) {
            let dateObj = that.$tool.getDateObj(
              historyDetailList[i].wf_Created.replace(/-/g, "/")
            );
            let time =
              (dateObj.month < 10 ? "0" + dateObj.month : dateObj.month) +
              "月" +
              (dateObj.date < 10 ? "0" + dateObj.date : dateObj.date) +
              "日 " +
              dateObj.hour +
              ":" +
              dateObj.minute;
            historyDetailList[i]["time"] = time;
            that.recordList.push(historyDetailList[i]);
          }
          // 数据全部加载完成
          if (that.recordList.length >= res.data.totalRecord) {
            that.finished = true;
          }
          that.$nextTick(() => {
            that.reSetMsgListH();
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatrecord_container {
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
}
.messages_list {
  display: block;
  overflow-y: scroll;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem 20px 1rem;
  background-color: #f6f6f6;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
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
</style>
<style>
.chatrecord_container .van-nav-bar {
  background-color: #0090d8;
}
.chatrecord_container .van-nav-bar__placeholder,
.chatrecord_container .van-nav-bar__content {
  height: 44px !important;
}
.chatrecord_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.chatrecord_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.msgItem_content img {
  max-width: 100%;
}
</style>
