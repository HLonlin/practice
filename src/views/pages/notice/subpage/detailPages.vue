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
        <div class="detail_content" v-html="detail.info"></div>
        <div
          class="detail_enclosure"
          v-for="(item, i) in detail.filename"
          :key="i"
        >
          <div v-if="detail.filename[i] != ''">
            <p>附件：</p>
            <p class="detail_enclosureName">
              <a class="detail_enclosureName" :href="detail.fileurl[i]">{{
                item
              }}</a>
            </p>
          </div>
        </div>
        <div
          class="handle_btn"
          :class="{ handle_btnDisabled: isRecruitApply }"
          v-if="type == '1' && identity == 'student'"
          @click="recruitApply"
        >
          {{ isRecruitApply ? "已报名" : "立即报名" }}
        </div>
        <div class="handle_btn" v-else-if="type == '1'" @click="linkTo">
          报名情况
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 公告详情页
 */
export default {
  name: "detailPage",
  data() {
    return {
      type: "",
      identity: "",
      userData: Object,
      isLoadeOver: false,
      detail: Object,
      showDetail_notify: false,
      isRecruitApply: false
    };
  },
  beforeCreate() {},
  created() {
    let identity = this.$tool.getLocal("identity");
    if (identity) {
      this.identity = identity;
    }
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.getNoticeDetail();
    this.hasRecruitApply();
    this.type = this.$route.query.type;
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
    linkTo: function() {
      this.$router.push({
        path: "/applylist",
        query: {
          recruit_Id: this.$route.query.recruit_Id
        }
      });
    },
    // 是否已报名
    hasRecruitApply: function() {
      let that = this;
      if (that.identity == "student") {
        that.$axios
          .post(that.$api.hasRecruitApply, {
            recruitId: that.$route.query.recruit_Id
          })
          .then(res => {
            that.isRecruitApply = res.data;
          });
      }
    },
    recruitApply: function() {
      if (this.isRecruitApply) return;
      let that = this;
      that.$dialog
        .confirm({
          title: "提示",
          message: "是否立即报名？",
          confirmButtonText: "是",
          confirmButtonColor: "#0090d8",
          cancelButtonText: "否"
        })
        .then(() => {
          that.$axios
            .post(that.$api.recruitApply, {
              recruitId: that.$route.query.recruit_Id
            })
            .then(res => {
              if (res.message == "success") {
                that.$toast.success("报名成功");
                that.isRecruitApply = true;
              } else {
                that.$toast.fail("报名失败");
              }
            });
        });
    },
    // 获取公告详情
    getNoticeDetail: function() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true
      });
      let that = this;
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.noticeDetail_teacher
            : that.$api.noticeDetail,
          {
            noticeid: that.$route.query.wf_docUnid
          }
        )
        .then(res => {
          this.$toast.clear();
          that.isLoadeOver = true;
          that.detail = res.data;
          let date = new Date(res.data.wf_Created.replace(/-/g, "/"));
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
          that.detail.date = that.$tool.getFullDate(
            res.data.wf_Created.replace(/-/g, "/")
          );
          that.detail.readTime = that.$tool.getFullDate(res.data.readTime);
          that.detail.filename = that.detail.filename.split(",");
          that.detail.fileurl = that.detail.fileurl.split(",");
          let detail_content = document.getElementsByClassName(
            "detail_content"
          )[0];
          detail_content.innerHTML = res.data.info;
          // detail_content.children[0].style.display = "none";
          if (!res.data.hasRead) {
            setIsRead();
          }
        });
      function setIsRead() {
        that.$axios
          .post(
            that.userData.isTeacher
              ? that.$api.readNotice_teacher
              : that.$api.readNotice,
            {
              noticeid: that.$route.query.wf_docUnid
            }
          )
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
  word-wrap: break-word;
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
  box-sizing: border-box;
  padding-bottom: 10px;
  letter-spacing: -0.3px;
  /* text-align: justify; */
  overflow-x: hidden;
  word-wrap: break-word;
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
.handle_btn {
  width: 100%;
  height: 36px;
  background-color: #0090d8;
  border-radius: 2px;
  color: #ffffff;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 36px;
}
.handle_btnDisabled {
  background-color: #cfcfcf;
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

.detailPage_container section {
  box-sizing: border-box;
}

/* section img {
  width: 100%;
} */

.detailPage_container img {
  width: 100%;
}
</style>
