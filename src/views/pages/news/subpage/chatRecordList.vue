<template>
  <div class="chatrecordlist_container">
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
    <div class="search_panel">
      <search
        sourceOf="chatRecordList"
        v-on:searchchatRecord="onSearch"
      ></search>
    </div>
    <div class="chatRecordList_panel">
      <div
        class="message_box"
        v-for="(item, i) in list"
        :key="i"
        @click="linkTo(item)"
      >
        <div class="message_headImg">
          <img
            class="message_logo"
            :src="
              item.logo ? item.logo : require('@/assets/images/default.png')
            "
          />
        </div>
        <div class="message_Item">
          <div class="message_label">
            <div class="message_name">{{ item.username }}</div>
            <div class="message_date">{{ item.wf_Created }}</div>
          </div>
          <div class="message_text">{{ item.xiaoxiNum }}条聊天记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 所有历史消息列表
import search from "../../../compoents/search";
export default {
  name: "chatrecordlist",
  components: {
    search
  },
  data() {
    return {
      userData: Object,
      list: [],
      searchkeywords: ""
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.searchkeywords = this.$route.query.searchkeywords
      ? JSON.parse(this.$route.query.searchkeywords)
      : "";
    this.getRecordList(this.searchkeywords);
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
    getRecordList: function() {
      let that = this;
      let keywords = arguments[0] ? arguments[0] : "";
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.historyMsgList_teacher
            : that.$api.historyMsgList,
          { searchkeywords: keywords }
        )
        .then(res => {
          that.list = res.data;
        });
    },
    // 搜索聊天记录
    onSearch: function(val) {
      this.searchkeywords = this.$tool.trim(val);
      // if (!this.searchkeywords) return;
      this.$router.replace({
        path: "/chatrecordlist",
        query: { searchkeywords: JSON.stringify(val) }
      });
      this.getRecordList(val);
    },
    linkTo: function(item) {
      let chatWith = {
        searchkeywords: this.searchkeywords,
        username: item.username,
        logo: item.logo,
        userid: item.userid,
        sendto: item.sendto,
        comefrom: item.comefrom
      };
      this.$router.push({
        path: "/chatrecord",
        query: { chatWith: JSON.stringify(chatWith) }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatRecordList_panel {
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
  display: flex;
  justify-content: space-between;
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
  align-self: flex-start;
  min-width: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
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
</style>
<style>
.chatrecordlist_container .van-nav-bar {
  background-color: #0090d8;
}
.chatrecordlist_container .van-nav-bar__placeholder,
.chatrecordlist_container .van-nav-bar__content {
  height: 44px !important;
}
.chatrecordlist_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.chatrecordlist_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.chatrecordlist_container .van-search {
  background-color: #f6f6f6 !important;
  padding: 10px 1rem 10px 1rem !important;
}
</style>
