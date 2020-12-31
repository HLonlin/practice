<template>
  <div class="monthlydetail_container">
    <van-nav-bar
      title="月记详情"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="monthlydetail_articlePanel">
      <div class="monthlydetail_articleTitle">2020年11月</div>
      <div class="monthlydetail_articleContent">
        <p>
          在这个月，学的做的相比上月多了很多，修图、跟拍片场置景过程视频（7号-10号），过后再把这些视频素材浓缩剪辑成一个快节奏的短视频选曲快节奏的纯音乐进行配乐，算是实习以来第一个作品了。
        </p>
        <p>
          去片场跟了一通宵边看边学习和搬搬抬抬，（导演如何去演员调度、现场场景灯光的设计、根据场景变化去调整灯光的摆放）。
        </p>
        <p>进一步学到了修图，剪辑思路音乐卡节奏。</p>
      </div>
      <div class="monthlydetail_articlePhoto">
        <div class="articlePhoto_item"></div>
        <div class="articlePhoto_item"></div>
        <div class="articlePhoto_item"></div>
        <div class="articlePhoto_item"></div>
        <div class="articlePhoto_item"></div>
        <div class="articlePhoto_item"></div>
      </div>
    </div>
    <div class="monthlydetail_commentPanel">
      <div class="monthlydetail_commentTitle">老师评语</div>
      <div class="monthlydetail_commentItem">
        <div class="comment_headImg"></div>
        <div class="comment_content">
          <div class="comment_name">梁颖仪</div>
          <div class="comment_text">不错，有学到东西就很好，再接再厉。</div>
        </div>
      </div>
      <div class="monthlydetail_commentItem">
        <div class="comment_headImg"></div>
        <div class="comment_content">
          <div class="comment_name">刘礼理</div>
          <div class="comment_text">
            做得很好，有不懂的地方就需要多学习，可以向公司的前辈们学习，提升自己的技能。
          </div>
        </div>
      </div>
      <div class="monthlydetail_commentItem">
        <div class="comment_headImg"></div>
        <div class="comment_content">
          <div class="comment_name">赵莹莹</div>
          <div class="comment_text">有付出就有回报，在实习中好好学习。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "monthlydetail",
  data() {
    return {};
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
        path: "/monthlylist"
      });
      //   this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.monthlydetail_container {
  height: 100vh;
  background-color: #f6f6f6;
}
.monthlydetail_articlePanel {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem;
  background-color: #ffffff;
  margin-bottom: 10px;
}
.monthlydetail_articleTitle {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #323233;
  text-align: center;
  padding: 15px 0px 0px 0px;
  box-sizing: border-box;
}
.monthlydetail_articleContent {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555555;
  line-height: 26px;
  text-align: justify;
  letter-spacing: 0.4px;
  box-sizing: border-box;
  padding: 10px 0px 0px 0px;
}
.monthlydetail_articlePhoto {
  box-sizing: border-box;
  padding: 15px 0px 10px 0px;
  display: flex;
  flex-wrap: wrap;
}
.articlePhoto_item {
  width: 3.75rem;
  height: 3.75rem;
  background-color: azure;
  margin: 0px 0.625rem 0.625rem 0px;
}
.monthlydetail_commentPanel {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem;
  background-color: #ffffff;
}
.monthlydetail_commentTitle {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
  box-sizing: border-box;
  padding: 10px 0px 0px 0px;
}
.monthlydetail_commentItem {
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 17px 0px;
  display: flex;
  justify-content: flex-start;
}
.monthlydetail_commentPanel .monthlydetail_commentItem:last-child {
  border: none;
}
.comment_headImg {
  min-width: 2.25rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: #eeeeee;
}
.comment_content {
  box-sizing: border-box;
  padding: 0px 0px 0px 0.625rem;
  max-width: 19rem;
}
.comment_name {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.comment_text {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555555;
}
</style>
<style>
.monthlydetail_container .van-nav-bar {
  background-color: #0090d8;
}
.monthlydetail_container .van-nav-bar__placeholder,
.monthlydetail_container .van-nav-bar__content {
  height: 44px !important;
}
.monthlydetail_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.monthlydetail_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
