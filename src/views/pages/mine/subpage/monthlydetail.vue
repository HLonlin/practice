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
      <div class="monthlydetail_articleTitle">
        {{ monthlyDetail.year }}年{{ monthlyDetail.zhou }}月
      </div>
      <div class="monthlydetail_articleContent">
        <!-- <p>
          {{ monthlyDetail.info }}
        </p> -->
        {{ monthlyDetail.info }}
      </div>
      <div class="monthlydetail_articlePhoto">
        <div
          v-for="(item, i) in imageList"
          :key="i"
          class="articlePhoto_item"
          @click="previewImg(i)"
        >
          <img class="articlePhoto" :src="item" style="object-fit: cover;" />
        </div>
      </div>
    </div>
    <div class="monthlydetail_commentPanel">
      <div class="monthlydetail_commentTitle">老师评语</div>
      <div
        class="monthlydetail_commentItem"
        v-for="(item, i) in commentList"
        :key="i"
      >
        <div class="comment_headImg"></div>
        <div class="comment_content">
          <div class="comment_name">梁颖仪</div>
          <div class="comment_text">不错，有学到东西就很好，再接再厉。</div>
        </div>
      </div>
      <div class="monthlydetail_noComment" v-if="commentList.length == 0">
        暂无评语
      </div>
    </div>
    <van-image-preview
      v-model="show"
      :images="imageList"
      :startPosition="index"
    >
    </van-image-preview>
  </div>
</template>

<script>
export default {
  name: "monthlydetail",
  data() {
    return {
      show: false,
      index: 0,
      imageList: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
        "https://img.yzcdn.cn/vant/apple-3.jpg",
        "https://img.yzcdn.cn/vant/apple-4.jpg",
        "https://img.yzcdn.cn/vant/apple-5.jpg",
        "https://img.yzcdn.cn/vant/apple-6.jpg"
      ],
      monthlyDetail: Object,
      commentList: []
    };
  },
  beforeCreate() {},
  created() {
    this.getDEtail();
    this.getComment();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    // 加载详情
    getDEtail: function() {
      let that = this;
      that.$axios
        .post(that.$api.monthlyDetail, {
          wf_docUnid: that.$route.query.wf_docUnid
        })
        .then(res => {
          that.monthlyDetail = res.data.noticeJson;
        });
    },
    // 加载评语
    getComment: function() {
      let that = this;
      that.$axios
        .post(that.$api.commentList, {
          wf_docUnid: that.$route.query.wf_docUnid
        })
        .then(res => {
          that.commentList = res.data;
        });
    },
    onClickLeft: function() {
      // this.$router.push({
      //   path: "/monthlylist"
      // });
      this.$router.go(-1);
    },
    previewImg: function(i) {
      let that = this;
      this.show = true;
      this.index = i;
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
  word-wrap: break-word;
  word-break: normal;
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
.articlePhoto {
  width: 100%;
  height: 100%;
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
.monthlydetail_noComment {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bbbbbb;
  text-align: center;
  box-sizing: border-box;
  padding: 20px 0px;
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
