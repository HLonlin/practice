<template>
  <div class="updaterecord_wrapper">
    <div class="topbar_panel">
      <van-nav-bar
        title="修改记录"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <van-tabs v-model="active" color="#0090d8" :sticky="true" offset-top="44px">
      <van-tab v-for="(itemObj, j) in tabList" :key="j" :title="itemObj.title">
        <div class="recordList_listPanel">
          <van-pull-refresh
            v-model="itemObj.refreshing"
            @refresh="dropDownRefresh"
          >
            <van-list
              v-model="itemObj.loading"
              :finished="itemObj.finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <router-link
                v-for="(item, i) in itemObj.recordList"
                :key="i"
                :to="{
                  path: 'recorddetail',
                  query: { detail: JSON.stringify(item) }
                }"
                class="recordList_listItem"
              >
                <div class="recordList_listTitle">
                  修改记录
                </div>
                <div class="recordList_listLabel">
                  <div class="recordList_listAuthor">
                    审核状态:{{
                      item.isty == "是"
                        ? "已通过"
                        : item.isty == "否"
                        ? "未通过"
                        : "待审核"
                    }}
                  </div>
                  <div class="recordList_listDate">{{ item.date }}</div>
                </div>
              </router-link>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "updaterecord",
  data: function() {
    return {
      userData: Object,
      tabList: [
        {
          title: "全部",
          refreshing: false,
          loading: false, // 加载状态
          finished: false,
          pageIndex: 1,
          pageSize: 10,
          recordList: []
        },
        {
          title: "待审核",
          refreshing: false,
          loading: false, // 加载状态
          finished: false,
          pageIndex: 1,
          pageSize: 10,
          recordList: []
        },
        {
          title: "已通过",
          refreshing: false,
          loading: false, // 加载状态
          finished: false,
          pageIndex: 1,
          pageSize: 10,
          recordList: []
        },
        {
          title: "未通过",
          refreshing: false,
          loading: false, // 加载状态
          finished: false,
          pageIndex: 1,
          pageSize: 10,
          recordList: []
        }
      ],
      active: 0
    };
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    getUserData: function() {
      let userData = this.$tool.getLocal("userData");
      if (userData) {
        this.userData = userData;
      }
    },
    // 加载记录列表
    onLoad() {
      let that = this;
      that.$axios
        .post(
          that.$api.recordList,
          that.active == 0 ? {} : { status: that.active }
        )
        .then(res => {
          that.tabList[that.active].loading = false;
          that.tabList[that.active].pageIndex =
            that.tabList[that.active].pageIndex + 1;
          let recordList = res.data;
          for (let i = 0, imax = recordList.length; i < imax; i++) {
            recordList[i].date = that.$tool.getFullDate(
              recordList[i].WF_Created.replace(/-/g, "/")
            );
            that.tabList[that.active].recordList.push(recordList[i]);
          }
          that.tabList[that.active].finished = true;
        });
    },
    // 下拉刷新
    dropDownRefresh() {
      let that = this;
      if (that.tabList[that.active].refreshing) {
        // 清空列表数据
        that.tabList[that.active].recordList = [];
        // 重置页码
        that.tabList[that.active].pageIndex = 1;
        that.tabList[that.active].refreshing = false;
        that.tabList[that.active].finished = false;
        // 将 loading 设置为 true，表示处于加载状态
        that.tabList[that.active].loading = true;
      }
      // 重新加载数据
      that.onLoad();
    }
  },
  watch: {},
  computed: {},
  beforeCreate() {},
  created() {
    this.getUserData();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recordList_container {
  height: 100vh;
  background-color: #f6f6f6;
  box-sizing: border-box;
  padding: 10px 0px;
}
.recordList_yearPanel {
  width: 100%;
  height: 45px;
  margin-bottom: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0px 1rem;
}
.recordList_currentYear {
  width: 10.625rem;
  font-size: 0.9375rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
  text-align: center;
}
.recordList_lastYear {
  content: "";
  transform: rotate(45deg);
  width: 0.5rem;
  height: 0.5rem;
  border-left: 1px solid #666666;
  border-bottom: 1px solid #666666;
}
.recordList_nextYear {
  content: "";
  transform: rotate(45deg);
  width: 0.5rem;
  height: 0.5rem;
  border-right: 1px solid #666666;
  border-top: 1px solid #666666;
}
.recordList_listPanel {
  box-sizing: border-box;
  padding: 0px 1rem;
  background-color: #ffffff;
}
.recordList_listItem {
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 15px 0px;
}
.recordList_listPanel .recordList_listItem:last-child {
  border: none;
}
.recordList_listTitle {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
  box-sizing: border-box;
  padding: 0px 0px 0.5rem 0px;
}
.recordList_listLabel {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  display: flex;
  justify-content: space-between;
}
.recordList_listDate {
  color: #999999;
}
</style>
<!-- You need to override the style of the frame -->
<style>
.updaterecord_wrapper .van-nav-bar {
  background-color: #0090d8;
}
.updaterecord_wrapper .van-nav-bar__placeholder,
.updaterecord_wrapper .van-nav-bar__content {
  height: 44px !important;
}
.updaterecord_wrapper .van-nav-bar .van-icon {
  color: #ffffff;
}
.updaterecord_wrapper .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
