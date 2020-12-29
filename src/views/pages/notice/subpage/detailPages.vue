<template>
  <div class="detailPage_container">
    <div class="detail_topPanel">
      <van-nav-bar
        title="公告详情"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="detail_panel">
      <div class="detail_title">
        安全提醒：全球昨日日增确诊超55万例，累计逾7258万例，美国新增超19万例
      </div>
      <div class="detail_label">
        <div class="detail_author">发起人：梁颖仪</div>
        <div class="detail_readNum">阅读：30</div>
        <div class="detail_date">12月14日 17:13</div>
      </div>
      <div class="detail_content">
        <p>
          海外网12月14日电Worldmeter网站实时统计数据显示，截至北京时间12月14日6时30分左右，全球累计确诊新冠肺炎病例72583536例，累计死亡病例1618087例，全球单日新增确诊病例551186例，新增死亡病例7775例。中国以外新增确诊病例逾55万例，累计确诊病例逾7249万例，累计死亡病例逾161万例。
        </p>
        <p>
          海外网12月14日电Worldmeter网站实时统计数据显示，截至北京时间12月14日6时30分左右，全球累计确诊新冠肺炎病例72583536例，累计死亡病例1618087例，全球单日新增确诊病例551186例，新增死亡病例7775例。中国以外新增确诊病例逾55万例，累计确诊病例逾7249万例，累计死亡病例逾161万例。
        </p>
        <p>
          海外网12月14日电Worldmeter网站实时统计数据显示，截至北京时间12月14日6时30分左右，全球累计确诊新冠肺炎病例72583536例，累计死亡病例1618087例，全球单日新增确诊病例551186例，新增死亡病例7775例。中国以外新增确诊病例逾55万例，累计确诊病例逾7249万例，累计死亡病例逾161万例。
        </p>
        <p>（资料来源：Worldmeter数据、新华社、人民日报、央视等）</p>
      </div>
      <div class="detail_enclosure" v-show="detail.type == 'enclosure'">
        <p>附件：</p>
        <p class="detail_enclosureName">2020实习企业招聘信息一览表</p>
      </div>
      <div class="detail_outLink" v-show="detail.type == 'outLink'">
        https://new.qq.com/rain/a/20201203a0hjnt00
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailPage",
  data() {
    return {
      detail: Object
    };
  },
  beforeCreate() {},
  created() {
    this.detail = JSON.parse(decodeURIComponent(this.$route.query.detailId));
  },
  beforeMount() {},
  mounted() {
    this.resetContainerH();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    resetContainerH: function() {
      let windowHight = window.screen.height;
      let detailPage_container = document.getElementsByClassName(
        "detailPage_container"
      )[0];
      let nav_bar = document.getElementsByClassName("detail_topPanel")[0];
      detailPage_container.style.height =
        windowHight - nav_bar.offsetHeight + "px";
    },
    onClickLeft: function() {
      this.$router.push({
        path: "/notice"
      });
      //   this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail_panel {
  box-sizing: border-box;
  padding: 20px 1rem;
  width: 100%;
}
.detail_title {
  font-size: 1.25rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 28px;
  box-sizing: border-box;
  padding-bottom: 10px;
}
.detail_label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 12px;
  box-sizing: border-box;
  padding-bottom: 10px;
}
.detail_content {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555555;
  line-height: 26px;
  text-indent: 2em;
  box-sizing: border-box;
  padding-bottom: 10px;
}
.detail_content p {
  text-indent: 2em;
}
.detail_enclosure {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555555;
  line-height: 26px;
  box-sizing: border-box;
  padding-bottom: 10px;
}
.detail_enclosure p {
  display: inline-block;
}
.detail_enclosureName {
  color: #0090d8;
}
.detail_outLink {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0090d8;
  line-height: 15px;
  box-sizing: border-box;
  padding-bottom: 10px;
}
</style>
<style>
.detailPage_container .van-nav-bar {
  background-color: #0090d8;
}
.detailPage_container .van-nav-bar__placeholder,
.detailPage_container .van-nav-bar__content {
  height: 44px !important;
}
.detailPage_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.detailPage_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
