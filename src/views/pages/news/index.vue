<template>
  <div class="container">
    <div class="message_panel">
      <div class="message_box" v-for="(item, i) in msgList" :key="i">
        <div class="message_headImg"></div>
        <div class="message_Item">
          <div class="message_label">
            <div class="message_name">梁颖仪</div>
            <div class="message_date">12月16日</div>
          </div>
          <div class="message_text">通知大家明天带上实验手册</div>
        </div>
      </div>
      <div class="noMessage_box" v-if="msgList == 0">
        暂无新的消息
      </div>
    </div>
    <div class="chatRecordPanel" v-show="popups.chatRecord">
      <van-nav-bar
        title="消息记录"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="rebackChatPanel"
      />
      <div class="search_panel">
        <search sourceOf="news" class="searchInput" @search="search"></search>
      </div>
      <div class="record_panel">
        <div class="message_box">
          <div class="message_headImg"></div>
          <div class="message_Item">
            <div class="message_label">
              <div class="message_name">江老师</div>
              <div class="message_date">2020-12-16 10:40</div>
            </div>
            <div class="message_text">3条聊天记录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 聊天列表页
 */
import search from "../../compoents/search";
export default {
  name: "news",
  components: {
    search
  },
  data() {
    return {
      popups: {
        chatRecord: false
      },
      msgList: []
    };
  },
  beforeCreate() {},
  created() {
    this.getMsgList();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    rebackChatPanel: function() {
      this.popups.chatRecord = false;
    },
    openPopup: function(target, val) {
      for (let key in this.popups) {
        this.popups[key] = false;
      }
      this.popups[target] = val;
    },
    openSearch: function() {
      this.openPopup("chatRecord", true);
      let searchInput = document.getElementsByTagName("input");
      setTimeout(function() {
        searchInput[1].focus();
      }, 100);
    },
    search: function(searchValue) {
      this.highlight(searchValue);
    },
    // 添加高亮
    highlight: function(searchValue) {
      this.clearHighlight(); //先清空一下上次高亮显示的内容；
      let searchText = searchValue.trim(); //获取你输入的关键字；
      if (searchText.length <= 0) return;
      var regExp = new RegExp(searchText, "g"); //创建正则表达式，g表示全局的，如果不用g，则查找到第一个就不会继续向下查找了；
      let record_panel = document.getElementsByClassName("record_panel")[0];
      for (let i = 0, imax = record_panel.children.length; i < imax; i++) {
        var html = record_panel.children[i].innerHTML;
        var newHtml = html.replace(
          regExp,
          "<span class='highlight' style='color:#0090d8;'>" +
            searchText +
            "</span>"
        ); //将找到的关键字替换，加上highlight属性；
        record_panel.children[i].innerHTML = newHtml;
      }
    },
    // 清空高亮
    clearHighlight: function() {
      let highlight = document.getElementsByClassName("highlight");
      for (let i = 0, imax = highlight.length; i < imax; i++) {
        let thishtml = highlight[i].innerHTML;
        console.log(highlight[i].outerHTML);
        highlight[i].outerHTML = thishtml;
      }
    },
    // 加载消息列表
    getMsgList: function() {
      let that = this;
      that.$axios.post(that.$api.msgList, {}).then(res => {
        console.log(res);
        that.msgList = res.data;
      });
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
</style>
