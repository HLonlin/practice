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
    />
    <div class="monthlylist_topPanel">
      <div class="monthlylist_yearPanel">
        <div class="monthlylist_lastYear" @click="lastYear"></div>
        <div class="monthlylist_currentYear">{{ currentYear }}年</div>
        <div class="monthlylist_nextYear" @click="nextYear"></div>
      </div>
    </div>
    <div class="monthlylist_listPanel">
      <router-link
        :to="{ path: 'monthlydetail', query: { detailId: 1 } }"
        class="monthlylist_listItem"
      >
        <div class="monthlylist_listTitle">2020年12月月记</div>
        <div class="monthlylist_listLabel">
          <div class="monthlylist_listAuthor">姓名：卢保希</div>
          <div class="monthlylist_listDate">2020年12月19日 17:13</div>
        </div>
      </router-link>
      <router-link
        :to="{ path: 'monthlydetail', query: { detailId: 2 } }"
        class="monthlylist_listItem"
      >
        <div class="monthlylist_listTitle">2020年11月月记</div>
        <div class="monthlylist_listLabel">
          <div class="monthlylist_listAuthor">姓名：卢保希</div>
          <div class="monthlylist_listDate">2020年11月19日 18:32</div>
        </div>
      </router-link>
      <router-link
        :to="{ path: 'monthlydetail', query: { detailId: 3 } }"
        class="monthlylist_listItem"
      >
        <div class="monthlylist_listTitle">2020年10月月记</div>
        <div class="monthlylist_listLabel">
          <div class="monthlylist_listAuthor">姓名：卢保希</div>
          <div class="monthlylist_listDate">2020年10月19日 14:25</div>
        </div>
      </router-link>
      <router-link
        :to="{ path: 'monthlydetail', query: { detailId: 4 } }"
        class="monthlylist_listItem"
      >
        <div class="monthlylist_listTitle">2020年9月月记</div>
        <div class="monthlylist_listLabel">
          <div class="monthlylist_listAuthor">姓名：卢保希</div>
          <div class="monthlylist_listDate">2020年9月19日 16:46</div>
        </div>
      </router-link>
      <router-link
        :to="{ path: 'monthlydetail', query: { detailId: 5 } }"
        class="monthlylist_listItem"
      >
        <div class="monthlylist_listTitle">2020年8月月记</div>
        <div class="monthlylist_listLabel">
          <div class="monthlylist_listAuthor">姓名：卢保希</div>
          <div class="monthlylist_listDate">2020年8月19日 17:51</div>
        </div>
      </router-link>
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
      currentYear: new Date().getFullYear()
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {
      this.$router.push({
        path: "/mine"
      });
      //   this.$router.go(-1);
    },
    lastYear: function() {
      this.currentYear -= 1;
      if (this.currentYear <= new Date().getFullYear() - 10) {
        this.currentYear = new Date().getFullYear() - 10;
      }
    },
    nextYear: function() {
      this.currentYear += 1;
      if (this.currentYear >= new Date().getFullYear() + 10) {
        this.currentYear = new Date().getFullYear() + 10;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.monthlylist_container {
  height: 100vh;
  background-color: #f6f6f6;
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
  font-weight: 500;
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
