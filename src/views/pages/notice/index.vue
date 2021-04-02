<template>
  <div class="container">
    <van-tabs
      v-model="active"
      color="#0090d8"
      :sticky="true"
      offset-top="44px"
      @change="tabChange"
    >
      <van-tab
        v-for="(itemObj, i) in tabList"
        :key="i"
        :title="itemObj.title"
        :name="i"
      >
        <div class="search_panel">
          <search sourceOf="notice" v-on:searchNotice="onSearch"></search>
        </div>
        <div class="noticeList_panel">
          <van-pull-refresh
            v-model="itemObj.refreshing"
            @refresh="dropDownRefresh"
          >
            <div
              class="notice_Item"
              v-for="(item, i) in itemObj.topList"
              :key="i"
              :title="item.subject"
              @click="notice_Details(item.wf_docUnid, item.recruit_Id)"
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
              v-model="itemObj.loading"
              :finished="itemObj.finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div
                class="notice_Item"
                v-for="(item, i) in itemObj.noticeList"
                :key="i"
                :title="item.subject"
                @click="notice_Details(item.wf_docUnid, item.recruit_Id)"
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
      </van-tab>
    </van-tabs>
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
      tabList: [
        {
          title: "校内公告",
          topList: [],
          noticeList: [],
          loading: false, // 加载状态
          finished: false, // 是否已加载全部
          refreshing: false, //
          pageIndex: 1,
          pageSize: 10
        },
        {
          title: "招聘公告",
          topList: [],
          noticeList: [],
          loading: false, // 加载状态
          finished: false, // 是否已加载全部
          refreshing: false, //
          pageIndex: 1,
          pageSize: 10
        }
      ],
      active: Number(this.$route.query.active ? this.$route.query.active : 0)
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
    tabChange: function() {
      this.$router.replace({
        path: "/notice",
        query: {
          active: this.active
        }
      });
    },
    onSearch: function(searchkeywords) {
      let that = this;
      // 清空列表数据
      that.tabList[that.active].noticeList = [];
      that.tabList[that.active].topList = [];
      // 重置页码
      that.tabList[that.active].pageIndex = 1;
      that.tabList[that.active].refreshing = false;
      that.tabList[that.active].finished = false;
      // 将 loading 设置为 true，表示处于加载状态
      that.tabList[that.active].loading = true;
      this.onLoad(searchkeywords);
    },
    onLoad() {
      // 加载列表
      let that = this,
        keyword = arguments[0] ? arguments[0] : "";
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.active == 0
              ? that.$api.noticeList_teacher
              : that.$api.adList_teacher
            : that.active == 0
            ? that.$api.noticeList
            : that.$api.adList,
          {
            searchkeywords: keyword,
            pageNum: that.tabList[that.active].pageIndex,
            pageSize: arguments[0] ? 1000 : that.tabList[that.active].pageSize
          }
        )
        .then(res => {
          that.tabList[that.active].loading = false;
          that.tabList[that.active].pageIndex =
            that.tabList[that.active].pageIndex + 1;
          let noticeList = res.data.noticeList;
          for (let i = 0, imax = noticeList.length; i < imax; i++) {
            if (noticeList[i].zhiding == "1") {
              that.tabList[that.active].topList.push(noticeList[i]);
            } else {
              that.tabList[that.active].noticeList.push(noticeList[i]);
            }
          }
          if (
            that.tabList[that.active].noticeList.length +
              that.tabList[that.active].topList.length >=
            res.data.totalRecord
          ) {
            that.tabList[that.active].finished = true;
          }
        });
    },
    // 下拉刷新
    dropDownRefresh() {
      let that = this;
      if (that.tabList[that.active].refreshing) {
        // 清空列表数据
        that.tabList[that.active].noticeList = [];
        that.tabList[that.active].topList = [];
        // 重置页码
        that.tabList[that.active].pageIndex = 1;
        that.tabList[that.active].refreshing = false;
        that.tabList[that.active].finished = false;
        // 将 loading 设置为 true，表示处于加载状态
        that.tabList[that.active].loading = true;
      }
      // 重新加载数据
      that.onLoad();
    },
    notice_Details: function(id, recruit_Id) {
      this.$router.push({
        path: "/detailPage",
        query: {
          wf_docUnid: id,
          recruit_Id: recruit_Id,
          cardid: this.userData.cardid,
          type: this.active
        }
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
