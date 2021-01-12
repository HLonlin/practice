<template>
  <div class="detailPage_container">
    <div v-show="isLoadeOver">
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
        <van-notify
          v-model="showDetail_notify"
          color="#333333"
          background="#B9E8FF"
          className="detail_notify"
        >
          <span>您已于{{ detail.readTime }}读过此公告</span>
        </van-notify>
      </div>
      <div class="detail_panel">
        <div class="detail_isreadBox" v-show="detail.hasRead">
          <img class="detail_isreadIcon" src="@/assets/images/isread.png" />
        </div>
        <div class="detail_title">
          {{ detail.subject }}
        </div>
        <div class="detail_label">
          <div class="detail_author">发起人：{{ detail.wf_Creator }}</div>
          <div class="detail_readNum">阅读：{{ detail.readNum }}</div>
          <div class="detail_date">
            {{ detail.date }}
          </div>
        </div>
        <div class="detail_content">
          {{ detail.info }}
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
  </div>
</template>

<script>
/**
 * 公告详情页
 */
import { Toast } from "vant";
export default {
  name: "detailPage",
  data() {
    return {
      isLoadeOver: false,
      detail: Object,
      showDetail_notify: false
    };
  },
  beforeCreate() {},
  created() {
    this.getNoticeDetail();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {
      this.$router.push({
        path: "/notice"
      });
    },
    // 获取公告详情
    getNoticeDetail: function() {
      let toast = Toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true
      });
      let that = this;
      that.$axios
        .post(that.$api.noticeDetail, {
          cardid: that.$route.query.cardid,
          noticeid: that.$route.query.wf_docUnid
        })
        .then(res => {
          toast.clear();
          that.isLoadeOver = true;
          that.detail = res.data;
          let date = new Date(res.data.wf_Created);
          let month =
            date.getMonth() + 1 > 10
              ? date.getMonth() + 1
              : "0" + (date.getMonth() + 1);
          let dates =
            date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
          let hours =
            date.getHours() > 10 ? date.getHours() : "0" + date.getHours();
          let minutes =
            date.getMinutes() > 10
              ? date.getMinutes()
              : "0" + date.getMinutes();
          let seconds =
            date.getSeconds() > 10
              ? date.getSeconds()
              : "0" + date.getSeconds();
          that.detail.date = that.$tool.getYearMonthDate(res.data.wf_Created);
          that.detail.readTime = that.$tool.getYearMonthDate(res.data.readTime);
          let detail_content = document.getElementsByClassName(
            "detail_content"
          )[0];
          detail_content.innerHTML = res.data.info;
          detail_content.children[0].style.display = "none";
          if (!res.data.hasRead) {
            setIsRead();
          }
        });
      function setIsRead() {
        that.$axios
          .post(that.$api.readNotice, {
            cardid: that.$route.query.cardid,
            noticeid: that.$route.query.wf_docUnid
          })
          .then(res => {
            that.showDetail_notify = true;
            setTimeout(() => {
              that.showDetail_notify = false;
            }, 2000);
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detailPage_container {
  height: 100vh;
}
.detail_panel {
  position: relative;
  box-sizing: border-box;
  padding: 20px 1rem;
  width: 100%;
}
.detail_notify {
  position: fixed;
  top: 44px;
  height: 20px;
  font-size: 0.625rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 10px;
}
.detail_isreadBox {
  position: absolute;
  top: 20px;
  right: 1rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
}
.detail_isreadIcon {
  width: 100%;
  height: 100%;
}
.detail_title {
  position: relative;
  font-size: 1.25rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 28px;
  box-sizing: border-box;
  padding-bottom: 10px;
  min-height: 38px;
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
  letter-spacing: -0.3px;
  text-align: justify;
  overflow-x: hidden;
}
/* .detail_content p {
  text-indent: 2em;
  box-sizing: border-box;
  padding-bottom: 10px;
} */
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
