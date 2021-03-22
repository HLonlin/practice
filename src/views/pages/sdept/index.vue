<template>
  <div class="sdept_container">
    <div class="topbar_panel">
      <van-nav-bar
        :title="year + '届'"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        right-text="选择学届"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="search_panel">
      <search sourceOf="sdept" v-on:searchSdept="onSearch"></search>
    </div>
    <div class="StatisticsBar_panel">总实习率：{{ totalNum }}%</div>
    <div class="sdeptList_panel">
      <div
        class="sdeptItem_panel"
        v-for="(item, i) in list"
        :key="i"
        @click="linkTo(item)"
      >
        <div class="sdeptTitle_panel">
          <i class="iconItem icon_xibu-xibutubiao icon_sdept"></i>
          {{ item.xibu }}
        </div>
        <div class="sdeptNum_panel">实习率：{{ item.shixiNum }}%</div>
        <div class="sdeptStatic_panel">
          <span>健康上报：{{ item.qiandaoNum }}%</span>
          <span
            >异常：<span style="color:#FF2A2A;">{{
              item.qiandaoErrorCount
            }}</span
            >人</span
          >
        </div>
      </div>
    </div>
    <div class="noMore_panel" v-if="list.length == 0">
      没有更多了
    </div>
    <van-popup
      v-model="selecterShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="选择学届"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="defaultIndex"
        :visible-item-count="5"
      />
    </van-popup>
  </div>
</template>

<script>
import search from "../../compoents/search";
export default {
  name: "sdept",
  components: {
    search
  },
  data() {
    return {
      year: new Date().getFullYear(),
      totalNum: "100",
      list: [],
      selecterShow: false,
      columns: [],
      defaultIndex: 0
    };
  },
  beforeCreate() {},
  created() {
    this.initColumns();
    this.getAllCountXibu();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    initColumns: function() {
      let theFirstOne = new Date(this.year - 5 + "").getFullYear();
      for (let i = 0, imax = 10; i <= imax; i++) {
        if (this.year == i + theFirstOne) {
          this.defaultIndex = i;
        }
        this.columns.push(i + theFirstOne);
      }
    },
    onConfirm: function(value, index) {
      this.year = value;
      this.getAllCountXibu();
      this.defaultIndex = index;
      this.selecterShow = false;
    },
    onCancel: function() {
      this.selecterShow = false;
    },
    onClickLeft: function() {
      this.$router.push({
        path: "/login"
      });
    },
    onClickRight: function() {
      this.selecterShow = !this.selecterShow;
    },
    getAllCountXibu: function() {
      let that = this;
      that.$axios
        .post(that.$api.allCountXibu, { year: that.year })
        .then(res => {
          that.list = res.data.data;
          that.totalNum = res.data.totalNum;
        });
    },
    onSearch: function(searchkeywords) {
      if (!searchkeywords) return;
      let that = this;
      this.$router.push({
        path: "/studentList",
        query: {
          searchkeywords: JSON.stringify(searchkeywords)
        }
      });
    },
    linkTo: function(item) {
      this.$router.push({
        path: "/majorList",
        query: { xibu: JSON.stringify(item.xibu) }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.StatisticsBar_panel {
  width: 100%;
  height: 46px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
  border-bottom: 10px #f6f6f6 solid;
}
.search_panel {
  box-sizing: border-box;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #eeeeee;
}
.noMore_panel {
  box-sizing: border-box;
  padding: 20px 0px;
  text-align: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bbbbbb;
}
.sdeptList_panel {
  border-bottom: 5px #f6f6f6 solid;
}
.sdeptItem_panel {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 1rem;
  border-bottom: 5px #f6f6f6 solid;
}
.sdeptItem_panel::after {
  position: absolute;
  content: "";
  top: 50%;
  right: 1.5rem;
  transform: rotate(45deg) translateY(-50%);
  width: 0.75rem;
  height: 0.75rem;
  border-right: 1px solid#999999;
  border-top: 1px solid #999999;
}
.sdeptTitle_panel {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
  box-sizing: border-box;
  padding: 0px 0px 8px 0px;
}
.icon_sdept {
  box-sizing: border-box;
  padding: 0px 10px 0px 0px;
  color: #0090d8;
  font-size: 0.875rem;
}
.sdeptNum_panel,
.sdeptStatic_panel {
  box-sizing: border-box;
  padding: 0px 0px 5px 28px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
</style>
<style>
.sdept_container .van-nav-bar {
  background-color: #0090d8;
}
.sdept_container .van-nav-bar__placeholder,
.sdept_container .van-nav-bar__content {
  height: 44px !important;
}
.sdept_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.sdept_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.sdept_container .van-nav-bar__right .van-nav-bar__text {
  color: #ffffff;
}
</style>
