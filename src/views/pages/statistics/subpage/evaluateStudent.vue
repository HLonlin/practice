<template>
  <div class="evaluateStudent_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="学生月度操行评定"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topBar_panel">
      <div class="headImg_panel">
        <img
          class="headImg_logo"
          :src="logo ? logo : require('@/assets/images/default.png')"
        />
      </div>
      <div class="topLabel_panel">
        <div class="topName_panel">{{ name }}</div>
        <div class="topTime_panel">{{ year }}年{{ month }}月</div>
      </div>
    </div>
    <div class="evaluateScore_panel">
      <div class="scoreTitle_panel">实习表现（70分）</div>
      <div class="scoreLabel_panel">班主任评价（30分）</div>
      <div class="scoreLabel_panel">
        实习纪律(配合现场巡查、按时提交资料、实习小匠等)（40分）
      </div>
      <div class="scoreNum_panel">
        评分：
        <van-field
          class="score_num"
          type="digit"
          input-align="center"
          v-model="score.internship.score"
          @input="inputHandler(score.internship.score, 'internship')"
          :readonly="finish"
        />
        分
      </div>
    </div>
    <div class="evaluateScore_panel">
      <div class="scoreTitle_panel">职业素养（20分）</div>
      <div class="scoreLabel_panel">
        是否遵守招聘纪律、出勤情况(旷工、早退)、不按规章制度办理离职手续、无故不参加顶岗实习、实习时间（是否频繁更换企业）（10分）
      </div>
      <div class="scoreLabel_panel">企业认可或有表彰、报道等（10分）</div>
      <div class="scoreNum_panel">
        评分：<van-field
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
      <div class="scoreTitle_panel">遵纪守法(10分)</div>
      <div class="scoreLabel_panel">
        是否遵守社会公德、注重个人形象、是否涉及违法行为
      </div>
      <div class="scoreNum_panel">
        评分：<van-field
          class="score_num"
          type="digit"
          input-align="center"
          v-model="score.observe.score"
          @input="inputHandler(score.observe.score, 'observe')"
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
          @input="inputHandler(score.total.score, 'total')"
          :readonly="true"
        />
        分
      </div>
      <div class="score_remark">(操行分不能低于90分，满分100分)</div>
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
  name: "evaluateStudent",
  data() {
    return {
      name: "",
      logo: "",
      finish: false,
      year: "",
      month: "",
      score: {
        internship: { score: "", max: 70 },
        vocation: { score: "", max: 20 },
        observe: { score: "", max: 10 },
        total: { score: "", max: 100 }
      }
    };
  },
  beforeCreate() {},
  created() {
    this.logo = JSON.parse(this.$route.query.data).logo;
    this.name = JSON.parse(this.$route.query.data).name;
    this.finish = JSON.parse(this.$route.query.data).finish;
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
    inputHandler(value, key) {
      let that = this;
      value =
        that.score[key].max > 0
          ? Math.min(value, that.score[key].max || 0)
          : value;
      that.score[key].score = value;
      that.score.total.score =
        Number(that.score.internship.score) +
        Number(that.score.vocation.score) +
        Number(that.score.observe.score);
    },
    getEvaluate: function() {
      if (!this.finish) return;
      let that = this;
      let today = that.$tool.getDateObj();
      that.$axios
        .post(that.$api.getEvaluate, {
          cardid: JSON.parse(this.$route.query.data).cardid,
          year: today.year,
          month: today.month < 10 ? "0" + today.month : today.month
        })
        .then(res => {
          that.score.internship.score = res.data.internshipNum;
          that.score.vocation.score = res.data.professionalNum;
          that.score.observe.score = res.data.abidingNum;
          that.score.total.score = res.data.totalNum;
          that.year = res.data.year;
          that.month = res.data.month;
        });
    },
    addEvaluate: function() {
      let that = this;
      for (let key in that.score) {
        if (!this.score[key]) {
          switch (key) {
            case "internship":
              that.$toast({
                message: "实习表现评分不能为空"
              });
              break;
            case "vocation":
              that.$toast({
                message: "职业素养评分不能为空"
              });
              break;
            case "observe":
              that.$toast({
                message: "遵纪守法评分不能为空"
              });
              break;
            case "total":
              that.$toast({
                message: "总分不能为空"
              });
              break;
          }
          return;
        }
      }
      let today = that.$tool.getDateObj();
      that.$axios
        .post(that.$api.addConductEvaluation, {
          cardid: JSON.parse(this.$route.query.data).cardid,
          year: today.year,
          month: today.month < 10 ? "0" + today.month : today.month,
          internshipNum: that.score.internship.score,
          professionalNum: that.score.vocation.score,
          abidingNum: that.score.observe.score,
          totalNum: that.score.total.score
        })
        .then(res => {
          that.$toast.success("成功");
          that.$router.go(-1);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topBar_panel {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 1rem;
  border-bottom: 10px solid #f6f6f6;
}
.headImg_panel {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
}
.headImg_logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
.topLabel_panel {
  box-sizing: border-box;
  padding: 0px 0px 0px 0.75rem;
}
.topName_panel,
.topTime_panel {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
}
.topName_panel {
  box-sizing: border-box;
  padding: 0px 0px 10px 0px;
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
</style>
<style>
.evaluateStudent_container .van-nav-bar {
  background-color: #0090d8;
}
.evaluateStudent_container .van-nav-bar__placeholder,
.evaluateStudent_container .van-nav-bar__content {
  height: 44px !important;
}
.evaluateStudent_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.evaluateStudent_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}

.score_num .van-field__control {
  color: #0090d8;
}
</style>
