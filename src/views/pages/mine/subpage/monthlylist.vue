<template>
  <div class="monthlylist_container">
    <van-nav-bar
      title="月记"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <i
          class="iconItem icon_tianjiatubiao icon_add"
          @click="addMonthly"
          v-show="!userData.isTeacher"
        ></i>
      </template>
    </van-nav-bar>
    <div class="monthlylist_listPanel">
      <van-pull-refresh v-model="refreshing" @refresh="dropDownRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <router-link
            v-for="(item, i) in monthlyList"
            :key="i"
            :to="{
              path: 'monthlydetail',
              query: { wf_docUnid: item.wf_docUnid }
            }"
            class="monthlylist_listItem"
          >
            <div class="monthlylist_listTitle">
              {{ item.year }}年{{ item.zhou }}月月记
            </div>
            <div class="monthlylist_listLabel">
              <div class="monthlylist_listAuthor">
                姓名：{{ item.username }}
              </div>
              <div class="monthlylist_listDate">{{ item.date }}</div>
            </div>
          </router-link>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
/**
 * 月记列表页
 */
export default {
  name: "monthlylist",
  data() {
    return {
      userData: Object,
      monthlyList: [],
      loading: false, // 加载状态
      finished: false, // 是否已加载全部
      refreshing: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  beforeCreate() {},
  created() {
    this.getUserData();
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
    getUserData: function() {
      let userData = this.$tool.getLocal("userData");
      if (userData) {
        this.userData = userData;
      }
    },
    // 加载月记列表
    onLoad() {
      let that = this,
        data = {};
      if (that.userData.isTeacher) {
        data = {
          cardid: that.$route.query.cardid
        };
      }
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.monthList_teacher
            : that.$api.monthlyList,
          data
        )
        .then(res => {
          that.loading = false;
          that.pageIndex = that.pageIndex + 1;
          let monthlyList = res.data;
          for (let i = 0, imax = monthlyList.length; i < imax; i++) {
            monthlyList[i].date = that.$tool.getFullDate(
              monthlyList[i].wf_Created.replace(/-/g, "/")
            );
            that.monthlyList.push(monthlyList[i]);
          }
          that.finished = true;
        });
    },
    // 下拉刷新
    dropDownRefresh() {
      if (this.refreshing) {
        // 清空列表数据
        this.monthlyList = [];
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
    // 添加月记
    addMonthly: function() {
      let that = this;
      this.$router.push({
        path: "/addmonthly"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.monthlylist_container {
  height: 100vh;
  background-color: #f6f6f6;
  box-sizing: border-box;
  padding: 10px 0px;
}
.icon_add {
  font-size: 1rem;
  color: #ffffff;
}
.monthlylist_yearPanel {
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
.monthlylist_currentYear {
  width: 10.625rem;
  font-size: 0.9375rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
  text-align: center;
}
.monthlylist_lastYear {
  content: "";
  transform: rotate(45deg);
  width: 0.5rem;
  height: 0.5rem;
  border-left: 1px solid #666666;
  border-bottom: 1px solid #666666;
}
.monthlylist_nextYear {
  content: "";
  transform: rotate(45deg);
  width: 0.5rem;
  height: 0.5rem;
  border-right: 1px solid #666666;
  border-top: 1px solid #666666;
}
.monthlylist_listPanel {
  box-sizing: border-box;
  padding: 0px 1rem;
  background-color: #ffffff;
}
.monthlylist_listItem {
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 15px 0px;
}
.monthlylist_listPanel .monthlylist_listItem:last-child {
  border: none;
}
.monthlylist_listTitle {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
  box-sizing: border-box;
  padding: 0px 0px 0.5rem 0px;
}
.monthlylist_listLabel {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  display: flex;
  justify-content: space-between;
}
.monthlylist_listDate {
  color: #999999;
}
</style>
<style>
.monthlylist_container .van-nav-bar {
  background-color: #0090d8;
}
.monthlylist_container .van-nav-bar__placeholder,
.monthlylist_container .van-nav-bar__content {
  height: 44px !important;
}
.monthlylist_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.monthlylist_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
