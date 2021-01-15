<template>
  <div class="contactList_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="通讯录"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="search_panel">
      <search sourceOf="contactList" v-on:searchContactList="onSearch"></search>
    </div>
    <div class="contactList_panel">
      <van-index-bar highlight-color="#666666" :sticky="false">
        <div v-for="(item, i) in list" :key="i">
          <van-index-anchor :index="indexList[i]" v-if="item.length > 0" />
          <div
            class="contact_item"
            v-for="(items, j) in item"
            :key="j"
            @click="open_popups(items)"
          >
            <div class="contact_label">
              <div class="contact_info">
                <img
                  class="contact_logo"
                  :src="
                    items.logo
                      ? items.logo
                      : '../../../../assets/images/default.png'
                  "
                />
                <div class="contact_name">{{ items.username }}</div>
              </div>
              <i
                class="iconItem icon_faxiaoxitubiao icon_sendMsg"
                @click.stop="sendMsg(items)"
              ></i>
            </div>
          </div>
        </div>
      </van-index-bar>
    </div>
    <van-popup v-model="popups_contact" :get-container="getContainer" closeable>
      <div class="contact_popup">
        <div class="contact_popupLabel">
          <div class="contact_popupTitle">姓名</div>
          <div class="contact_popupText">{{ contactItem.username }}</div>
        </div>
        <div class="contact_popupLabel">
          <div class="contact_popupTitle">岗位</div>
          <div class="contact_popupText">{{ contactItem.jobTitle }}</div>
        </div>
        <div class="contact_popupLabel">
          <div class="contact_popupTitle">部门</div>
          <div class="contact_popupText">{{ contactItem.folderName }}</div>
        </div>
        <div class="contact_popupLabel">
          <div class="contact_popupTitle">电话</div>
          <div class="contact_popupText">{{ contactItem.phonenum }}</div>
        </div>
        <div class="contact_popupBottomBtn">
          <div class="contact_sendBtn" @click="sendMsg(contactItem)">
            发消息
          </div>
          <div class="contact_callBtn" @click="call(contactItem.phonenum)">
            <a href="" v-show="false" ref="tels"></a>打电话
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import search from "../../../compoents/search";
export default {
  name: "contactList",
  components: {
    search
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 1000,
      list: [],
      indexList: [],
      loading: false,
      finished: false,
      popups_contact: false,
      contactItem: {}
    };
  },
  beforeCreate() {},
  created() {
    this.onSearch();
  },
  beforeMount() {},
  mounted() {
    this.resetContactList_panelH();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    //   重置通讯列表高度
    resetContactList_panelH: function() {
      let contactList_panel = document.getElementsByClassName(
        "contactList_panel"
      )[0];
      let topbar_panel = document.getElementsByClassName("topbar_panel")[0];
      let search_panel = document.getElementsByClassName("search_panel")[0];
      let windowH = window.screen.height;
      contactList_panel.style.height =
        windowH - topbar_panel.offsetHeight - search_panel.offsetHeight + "px";
    },
    onClickLeft: function() {
      this.$router.go(-1);
    },
    onSearch: function() {
      let that = this;
      that.indexList = [];
      that.list = [];
      for (let i = 65, count = 0; i < 91; i++) {
        that.$set(that.list, count, []);
        that.$set(that.indexList, count, String.fromCharCode(i));
        count++;
      }
      let keyword = arguments[0] ? arguments[0] : "";
      that.$axios
        .post(that.$api.contactList, {
          searchkeywords: keyword,
          pageNum: that.pageNum,
          pageSize: that.pageSize
        })
        .then(res => {
          let contactList = res.data.contactList;
          for (let i = 0, imax = contactList.length; i < imax; i++) {
            let pinyingOfName = that.$tool.makePy(contactList[i].username);
            let firstName = pinyingOfName[pinyingOfName.length - 1].slice(0, 1);
            for (let j = 0, jmax = that.indexList.length; j < jmax; j++) {
              if (firstName == that.indexList[j]) {
                that.$set(that.list[j], that.list[j].length, contactList[i]);
              }
            }
          }
          // 数据全部加载完成
          if (that.list.length >= res.data.totalRecord) {
            that.finished = true;
          }
        });
      // 加载状态结束
      that.loading = false;
    },
    open_popups: function(item) {
      this.contactItem = item;
      this.popups_contact = true;
    },
    // 返回一个特定的 DOM 节点，作为每日一学弹窗挂载的父节点
    getContainer() {
      return document.querySelector(".contactList_container");
    },
    sendMsg: function(item) {
      this.$router.push({
        path: "/chatroom",
        query: { chatWith: JSON.stringify(item) }
      });
    },
    call: function(phonenum) {
      this.$refs.tels.href = "tel://" + phonenum;
      this.$refs.tels.click();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contactList_container {
  position: relative;
}
.search_panel {
  position: absolute;
  top: 44px;
  width: 100%;
}
.contactList_panel {
  position: absolute;
  top: 90px;
  width: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0px 0px 10px 0px;
  background-color: #f6f6f6;
}
.contact_item {
  background-color: #ffffff;
}

.contact_label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 0rem;
  margin: 0px 1rem;
  border-bottom: 1px solid #eeeeee;
}
.contact_info {
  display: flex;
  justify-content: start;
  align-items: center;
}
.contact_item:last-child .contact_label {
  border: none;
}
.contact_logo {
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
}
.contact_name {
  box-sizing: border-box;
  padding: 0px 0px 0px 1rem;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.icon_sendMsg {
  margin-right: 2.125rem;
  color: #0090d8;
  font-size: 1.0625rem;
}
.contact_popup {
  width: 16.25rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 30px 1.25rem 20px 1.25rem;
}
.contact_popupLabel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  box-sizing: border-box;
  padding: 0px 0px 15px 0px;
}
.contact_popupBottomBtn {
  display: flex;
  justify-content: space-between;
}
.contact_sendBtn,
.contact_callBtn {
  width: 6.25rem;
  height: 30px;
  background-color: #0090d8;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.contact_callBtn {
  background-color: #004ca7;
}
</style>

<style>
.contactList_container .van-nav-bar {
  background-color: #0090d8;
}
.contactList_container .van-nav-bar__placeholder,
.contactList_container .van-nav-bar__content {
  height: 44px !important;
}
.contactList_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.contactList_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.contactList_container .van-search {
  background-color: #f6f6f6 !important;
}
.contactList_panel .van-index-anchor {
  padding: 0px 1rem;
  font-size: 0.75rem;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #666666;
}
.contactList_panel .van-index-bar__index {
  padding: 2px 0.5rem 2px 0px;
  font-size: 0.75rem;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #666666;
}
.contactList_container .van-popup {
  background-color: transparent;
}
.contactList_container .van-popup__close-icon--top-right {
  top: 10px;
  right: 0.625rem;
}
.contactList_container .van-popup__close-icon {
  font-size: 0.875rem;
}
</style>
