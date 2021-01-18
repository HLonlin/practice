<template>
  <div class="container">
    <div class="search_panel">
      <search sourceOf="notice" v-on:searchNotice="onSearch"></search>
    </div>
    <div class="noticeList_panel">
      <van-pull-refresh v-model="refreshing" @refresh="dropDownRefresh">
        <div
          class="notice_Item"
          v-for="(item, i) in topList"
          :key="i"
          :title="item.subject"
          @click="notice_Details(item.wf_docUnid)"
        >
          <div
            class="notice_title"
            :class="{
              notice_titleTop: item.zhiding
            }"
          >
            <i
              class="iconItem icon_zhidingtubiao icon_intop"
              v-if="item.zhiding"
            ></i>
            {{ item.subject }}
          </div>
          <div class="notice_label">发起人：{{ item.wf_Creator }}</div>
          <div class="notice_date">{{ item.wf_Created }}</div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="notice_Item"
            v-for="(item, i) in noticeList"
            :key="i"
            :title="item.subject"
            @click="notice_Details(item.wf_docUnid)"
          >
            <div
              class="notice_title"
              :class="{
                notice_titleTop: item.zhiding
              }"
            >
              <i
                class="iconItem icon_zhidingtubiao icon_intop"
                v-if="item.intop"
              ></i>
              {{ item.subject }}
            </div>
            <div class="notice_label">发起人：{{ item.wf_Creator }}</div>
            <div class="notice_date">{{ item.wf_Created }}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
/**
 * 公告列表页
 */
import search from "../../compoents/search";
export default {
  name: "notice",
  components: {
    search
  },
  data() {
    return {
      userData: Object,
      topList: [],
      noticeList: [],
      loading: false, // 加载状态
      finished: false, // 是否已加载全部
      refreshing: false, //
      noReadAll: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onSearch: function(searchkeywords) {
      // 清空列表数据
      this.noticeList = [];
      this.topList = [];
      // 重置页码
      this.pageIndex = 1;
      this.refreshing = false;
      this.finished = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad(searchkeywords);
    },
    onLoad() {
      // 加载列表
      let that = this,
        keyword = arguments[0] ? arguments[0] : "";
      that.$axios
        .post(that.$api.noticeList, {
          searchkeywords: keyword,
          pageNum: that.pageIndex,
          pageSize: arguments[0] ? 1000 : that.pageSize
        })
        .then(res => {
          that.loading = false;
          that.pageIndex = that.pageIndex + 1;
          let noticeList = res.data.noticeList;
          for (let i = 0, imax = noticeList.length; i < imax; i++) {
            if (noticeList[i].zhiding == "1") {
              that.topList.push(noticeList[i]);
            } else {
              that.noticeList.push(noticeList[i]);
            }
          }
          if (
            that.noticeList.length + that.topList.length >=
            res.data.totalRecord
          ) {
            that.finished = true;
          }
        });
    },
    // 下拉刷新
    dropDownRefresh() {
      if (this.refreshing) {
        // 清空列表数据
        this.noticeList = [];
        this.topList = [];
        // 重置页码
        this.pageIndex = 1;
        this.refreshing = false;
        this.finished = false;
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
      }
      // 重新加载数据
      this.onLoad();
    },
    notice_Details: function(id) {
      this.$router.push({
        path: "/detailPage",
        query: { wf_docUnid: id, cardid: this.userData.cardid }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noticeList_panel {
  box-sizing: border-box;
  padding: 0px 1rem;
}
.notice_Item {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eeeeee;
  color: #666666;
  box-sizing: border-box;
  padding: 12px 0px;
}
.notice_title {
  height: 1.5625rem;
  line-height: 0.9375rem;
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  box-sizing: border-box;
  padding-bottom: 10px;
}
.notice_titleTop {
  color: #333333;
}
.notice_label,
.notice_date {
  height: 0.75rem;
  display: inline-block;
  line-height: 0.75rem;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.notice_label {
  display: inline-block;
}
.notice_date {
  float: right;
}
.icon_intop {
  color: #ff373a;
  font-weight: 400;
}
</style>
