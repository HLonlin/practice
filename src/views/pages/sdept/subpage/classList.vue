<template>
  <div class="classgrades_container">
    <div class="topbar_panel">
      <van-nav-bar
        :title="zhuanye"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="StatisticsBar_panel">总实习率：{{ totalNum }}%</div>
    <div class="classgradesList_panel">
      <div
        class="classgradesItem_panel"
        v-for="(item, i) in list"
        :key="i"
        @click="linkTo(item)"
      >
        <div class="classgradesTitle_panel">
          <i class="iconItem icon_xibu-banjitubiao icon_classgrades"></i>
          {{ item.banji }}
        </div>
        <div class="classgradesNum_panel">实习率：{{ item.shixiNum }}%</div>
        <div class="classgradesStatic_panel">
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
  </div>
</template>

<script>
export default {
  name: "classgrades",
  data() {
    return {
      zhuanye: "",
      totalNum: "100",
      list: []
    };
  },
  beforeCreate() {},
  created() {
    this.zhuanye = JSON.parse(this.$route.query.zhuanye);
    this.getCountClass();
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

    getCountClass: function() {
      let that = this;
      that.$axios
        .post(that.$api.countZhuanye, {
          zhuanye: that.zhuanye,
          year: JSON.parse(that.$route.query.year)
        })
        .then(res => {
          that.totalNum = res.data.totalNum;
          that.list = res.data.data;
        });
    },
    linkTo: function(item) {
      this.$router.push({
        path: "/studentList",
        query: {
          banji: JSON.stringify(item.banji),
          year: this.$route.query.year
        }
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
.noMore_panel {
  box-sizing: border-box;
  padding: 20px 0px;
  text-align: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bbbbbb;
}
.classgradesList_panel {
  border-bottom: 5px #f6f6f6 solid;
}
.classgradesItem_panel {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 1rem;
  border-bottom: 5px #f6f6f6 solid;
}
.classgradesItem_panel::after {
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
.classgradesTitle_panel {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
  box-sizing: border-box;
  padding: 0px 0px 8px 0px;
}
.icon_classgrades {
  box-sizing: border-box;
  padding: 0px 10px 0px 0px;
  color: #0090d8;
  font-size: 0.875rem;
}
.classgradesNum_panel,
.classgradesStatic_panel {
  box-sizing: border-box;
  padding: 0px 0px 5px 28px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
</style>
<style>
.classgrades_container .van-nav-bar {
  background-color: #0090d8;
}
.classgrades_container .van-nav-bar__placeholder,
.classgrades_container .van-nav-bar__content {
  height: 44px !important;
}
.classgrades_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.classgrades_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
