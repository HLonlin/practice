<template>
  <div class="container">
    <div class="message_panel">
      <div
        class="message_box"
        v-for="(item, i) in msgList"
        :key="i"
        @click="linkTo(item)"
      >
        <van-badge :content="item.unreadNum ? item.unreadNum : ''" max="99">
          <div class="message_headImg">
            <img
              class="message_logo"
              :src="
                item.logo ? item.logo : require('@/assets/images/default.png')
              "
            />
          </div>
        </van-badge>

        <div class="message_Item">
          <div class="message_label">
            <div class="message_name">{{ item.username }}</div>
            <div class="message_date">{{ item.time }}</div>
          </div>
          <div class="message_text">{{ item.info }}</div>
        </div>
      </div>
      <div class="noMessage_box" v-if="msgList.length == 0">
        暂无新的消息
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 聊天列表页
 */
export default {
  name: "news",
  data() {
    return {
      popups: {
        chatRecord: false
      },
      msgList: [],
      timer: ""
    };
  },
  beforeCreate() {},
  created() {
    this.updateMsgList();
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
    linkTo: function(item) {
      let data = {
        chatWith: JSON.stringify(item.userid ? item.userid : item.cardid)
      };
      this.$router.push({
        path: "/chatroom",
        query: data
      });
      // let data = {
      //   chatWith: JSON.stringify(item.userid)
      // };
      // this.$router.push({
      //   path: "/chatroom",
      //   query: data
      // });
    },
    updateMsgList: function() {
      let that = this;
      let msgList = that.$store.state.news.msgList;
      if (msgList) {
        that.msgList = msgList;
      }
      clearInterval(that.timer);
      that.timer = setInterval(function() {
        let msgList = that.$store.state.news.msgList;
        if (msgList) {
          that.msgList = msgList;
        }
      }, 1000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: relative;
}
.container .search_panel:first-child .search_container {
  pointer-events: none;
}
.search_container {
  margin-bottom: 15px;
}
.message_panel {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem;
}
.message_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 0px;
  box-sizing: border-box;
}
.message_box:last-child {
  border: none;
}
.noMessage_box {
  box-sizing: border-box;
  padding: 20px 0px;
  text-align: center;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.message_headImg {
  display: inline-block;
  min-width: 2.875rem;
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  background-color: #eeeeee;
  overflow: hidden;
}

.message_logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.message_Item {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 0px 0rem 0.75rem;
  overflow: hidden;
}

.message_label {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  box-sizing: border-box;
  padding: 0px 0px 0.5rem 0px;
}
.message_date {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.message_text {
  width: 75%;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chatRecordPanel {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color: #ffffff;
  z-index: 9;
}
.record_panel {
  box-sizing: border-box;
  padding: 0px 1rem;
}
.highlight {
  color: #0090d8 !important;
}
</style>
<style>
.chatRecordPanel .van-nav-bar {
  background-color: #0090d8;
}
.chatRecordPanel .van-nav-bar__placeholder,
.chatRecordPanel .van-nav-bar__content {
  height: 44px !important;
}
.chatRecordPanel .van-nav-bar .van-icon {
  color: #ffffff;
}
.chatRecordPanel .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.container .search_panel:last-child .search_container .van-search {
  padding: 10px 1rem 15px 1rem;
  background-color: #f6f6f6 !important;
}
.message_box .van-badge {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
