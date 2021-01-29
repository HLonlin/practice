<template>
  <div class="evaluateTeacher_container">
    <div class="topbar_panel">
      <van-nav-bar
        :title="userData.isTeacher ? '学生评价' : '班主任评价'"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topBar_panel">
      <div class="topBar_title" v-if="finish && userData.isTeacher">学生</div>
      <div class="topBar_title" v-else>（{{ username }}班主任）</div>
    </div>
    <div class="evaluateScore_panel">
      <div class="scoreTitle_panel">职业指导（{{ score.vocation.max }}分）</div>
      <div class="scoreLabel_panel">
        是否有进行岗前指导、就业前主题班会、安全教育、进行岗位德育教育等
      </div>
      <div class="scoreNum_panel">
        评分：
        <van-field
          class="score_num"
          type="digit"
          input-align="center"
          v-model="score.vocation.score"
          @input="inputHandler(score.vocation.score, 'vocation')"
          :readonly="finish"
        />
        分
      </div>
    </div>
    <div class="evaluateScore_panel">
      <div class="scoreTitle_panel">联系沟通（{{ score.contact.max }}分）</div>
      <div class="scoreLabel_panel">
        班主任是否每月都有与学生联系，了解实习状况，对其进行职业指导，能与班主任随时联系，及时回复学生信息等
      </div>
      <div class="scoreNum_panel">
        评分：
        <van-field
          class="score_num"
          type="digit"
          input-align="center"
          v-model="score.contact.score"
          @input="inputHandler(score.contact.score, 'contact')"
          :readonly="finish"
        />
        分
      </div>
    </div>
    <div class="evaluateScore_panel">
      <div class="scoreTitle_panel">巡点指导（{{ score.guidance.max }}分）</div>
      <div class="scoreLabel_panel">
        班主任是否定期到实习企业（岗位）进行巡点指导
      </div>
      <div class="scoreNum_panel">
        评分：
        <van-field
          class="score_num"
          type="digit"
          input-align="center"
          v-model="score.guidance.score"
          @input="inputHandler(score.guidance.score, 'guidance')"
          :readonly="finish"
        />
        分
      </div>
    </div>
    <div class="evaluateScore_panel">
      <div class="scoreTitle_panel">信息发布（{{ score.info.max }}分）</div>
      <div class="scoreLabel_panel">
        班主任是否建立班群，通过多渠道定期发布安全教育信息、招聘信息等
      </div>
      <div class="scoreNum_panel">
        评分：
        <van-field
          class="score_num"
          type="digit"
          input-align="center"
          v-model="score.info.score"
          @input="inputHandler(score.info.score, 'info')"
          :readonly="finish"
        />
        分
      </div>
    </div>
    <div class="evaluateScore_panel">
      <div class="scoreNum_panel">
        总评：<van-field
          class="score_num"
          type="digit"
          input-align="center"
          v-model="score.total.score"
          :readonly="true"
        />
        分
      </div>
    </div>
    <div class="evaluateScore_panel" v-if="!finish">
      <van-field
        class="evaluateInfo_panel"
        v-model="info"
        autosize
        type="textarea"
        placeholder="想跟班主任说点什么吗？"
        :formatter="formatter"
        format-trigger="onBlur"
        maxlength="300"
        show-word-limit
      />
    </div>
    <div class="evaluateScore_panel" v-else-if="info">
      <div>
        <div class="evaluate_infoTitle">学生评价</div>
        <div class="evaluate_infoText" v-html="info"></div>
      </div>
    </div>
    <div class="evaluateBottom_panel" v-if="!finish">
      <div class="evaluateBottom_btn" @click="addEvaluate">
        提交
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "evaluateTeacher",
  data() {
    return {
      username: "",
      finish: false,
      score: {
        vocation: { score: "", max: 20 },
        contact: { score: "", max: 40 },
        guidance: { score: "", max: 20 },
        info: { score: "", max: 20 },
        total: { score: "", max: 100 }
      },
      info: "",
      userData: Object
    };
  },
  beforeCreate() {},
  created() {
    this.getUserData();
    this.getQuery();
    this.getEvaluate();
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
    formatter(value) {
      // 去除首尾空格
      return this.$tool.trim(value);
    },
    getQuery: function() {
      let that = this;
      that.username = that.$route.query.username
        ? that.$route.query.username
        : "";
      that.finish = that.$route.query.finish
        ? JSON.parse(that.$route.query.finish)
        : false;
    },
    inputHandler(value, key) {
      let that = this;
      value =
        that.score[key].max > 0
          ? Math.min(value, that.score[key].max || 0)
          : value;
      that.score[key].score = value;
      that.score.total.score =
        Number(that.score.vocation.score) +
        Number(that.score.contact.score) +
        Number(that.score.guidance.score) +
        Number(that.score.info.score);
    },
    getEvaluate: function() {
      if (!this.finish) return;
      let that = this;
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.findBanZhuRenPingJiaById_teacher
            : that.$api.findBanZhuRenPingJiaById_student,
          {
            id: that.$route.query.id
          }
        )
        .then(res => {
          that.score.vocation.score = res.data.careerGuidanceNum;
          that.score.contact.score = res.data.communicationNum;
          that.score.guidance.score = res.data.pointGuidanceNum;
          that.score.info.score = res.data.informationNum;
          that.score.total.score = res.data.totalNum;
          that.info = res.data.info;
          that.username = res.data.username;
        });
    },
    addEvaluate: function() {
      let that = this;
      for (let key in that.score) {
        if (!this.score[key].score) {
          switch (key) {
            case "vocation":
              that.$toast({
                message: "职业指导评分不能为空"
              });
              break;
            case "contact":
              that.$toast({
                message: "联系沟通评分不能为空"
              });
              break;
            case "guidance":
              that.$toast({
                message: "巡点指导评分不能为空"
              });
              break;
            case "info":
              that.$toast({
                message: "信息发布不能为空"
              });
              break;
          }
          return;
        }
      }
      let today = that.$tool.getDateObj();
      that.$axios
        .post(that.$api.addBanZhuRenPingJia, {
          year: today.year,
          month: today.month < 10 ? "0" + today.month : today.month,
          username: that.$route.query.username,
          careerGuidanceNum: that.score.vocation.score,
          communicationNum: that.score.contact.score,
          pointGuidanceNum: that.score.guidance.score,
          informationNum: that.score.info.score,
          totalNum: that.score.total.score,
          info: that.info
        })
        .then(res => {
          that.$toast({
            message: "提交成功"
          });
          that.$router.go(-1);
        });
    },
    getUserData: function() {
      let userData = this.$tool.getLocal("userData");
      if (userData) {
        this.userData = userData;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topBar_panel {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 1rem;
  border-bottom: 10px solid #f6f6f6;
}
.topBar_title {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
}
.evaluateScore_panel {
  box-sizing: border-box;
  padding: 15px 1rem;
  border-bottom: 10px solid #f6f6f6;
}
.scoreTitle_panel {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
  box-sizing: border-box;
  padding: 0px 0px 10px 0px;
}
.scoreLabel_panel {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  box-sizing: border-box;
  padding: 0px 0px 8px 0px;
}
.scoreNum_panel {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
}
.score_num {
  display: inline-block;
  width: 65px;
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  border-bottom: 1px solid #000;
  padding: 0px;
}
.score_remark {
  font-size: 0.625rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #f94230;
}
.evaluateBottom_panel {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 1rem 20px 1rem;
  background-color: #f6f6f6;
}
.evaluateBottom_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  background-color: #0090d8;
  border-radius: 2px;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.evaluateInfo_panel {
  border: 1px solid #eeeeee;
}
.evaluate_infoTitle {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
  box-sizing: border-box;
  padding: 0px 0px 10px 0px;
}
.evaluate_infoText {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555555;
  word-wrap: break-word;
}
</style>
<style>
.evaluateTeacher_container .van-nav-bar {
  background-color: #0090d8;
}
.evaluateTeacher_container .van-nav-bar__placeholder,
.evaluateTeacher_container .van-nav-bar__content {
  height: 44px !important;
}
.evaluateTeacher_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.evaluateTeacher_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}

.score_num .van-field__control {
  color: #0090d8;
}
</style>
