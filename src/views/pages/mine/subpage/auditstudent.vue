<template>
  <div class="auditstudent_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="学生信息"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="selfinfo_topPanel">
        <div class="selfinfo_panel">
          <div class="selfinfo_label">头像</div>
          <img
            class="selfinfo_headIcon"
            :src="
              studentInfo.logo
                ? studentInfo.logo
                : require('@/assets/images/default.png')
            "
          />
        </div>
        <div class="selfinfo_panel ">
          <van-field
            v-model="studentInfo.username"
            label="姓名"
            :readonly="true"
          />
        </div>
      </div>
      <div class="selfinfo_middlePanel">
        <div class="selfinfo_panel">
          <div class="selfinfo_label">就业方式</div>
          <div class="selfinfo_text">
            {{ studentInfo.jiuyefangshi }}
          </div>
        </div>
        <div class="selfinfo_panel">
          <div class="selfinfo_label">就业状态</div>
          <div class="selfinfo_text">
            {{ studentInfo.jiuyezhuangtai }}
          </div>
        </div>
        <div
          class="selfinfo_panel"
          :class="{ selfinfo_area: (studentInfo.shixidanwei + '').length > 16 }"
        >
          <van-field
            v-model="studentInfo.shixidanwei"
            rows="1"
            autosize
            label="实习单位"
            type="textarea"
            placeholder="实习单位"
            :readonly="true"
          />
        </div>
        <div
          class="selfinfo_panel"
          :class="{ selfinfo_area: (studentInfo.danweidizhi + '').length > 16 }"
        >
          <van-field
            v-model="studentInfo.danweidizhi"
            rows="1"
            autosize
            label="单位地址"
            type="textarea"
            placeholder="单位地址"
            :readonly="true"
          />
        </div>
      </div>
      <div class="selfinfo_bottomPanel">
        <div class="selfinfo_panel" :class="{ selfinfo_color: true }">
          <van-field
            v-model="studentInfo.phone"
            label="联系电话"
            placeholder="联系电话"
            :readonly="true"
          />
        </div>
        <div class="selfinfo_panel" :class="{ selfinfo_color: true }">
          <van-field
            v-model="studentInfo.jjlxr"
            label="紧急联系电话"
            placeholder="紧急联系电话"
            :readonly="true"
          />
        </div>
        <div class="selfinfo_panel" :class="{ selfinfo_color: true }">
          <van-field
            v-model="studentInfo.jzdh"
            label="单位电话"
            placeholder="单位电话"
            :readonly="true"
          />
        </div>
        <div class="selfinfo_panel">
          <van-field
            v-model="studentInfo.qylxr"
            label="企业联系人"
            placeholder="企业联系人"
            :readonly="true"
          />
        </div>
        <div class="selfinfo_panel">
          <van-field
            v-model="studentInfo.job"
            label="岗位"
            placeholder="岗位"
            :readonly="true"
          />
        </div>
      </div>
      <div class="selfinfo_bottomBtnBox">
        <div class="selfinfo_submitBtn" @click="submitComment('是')">同意</div>
        <div class="selfinfo_cancelBtn" @click="disagree_Container = true">
          不同意
        </div>
      </div>
      <van-popup
        v-model="disagree_Container"
        :get-container="getContainer"
        :close-on-click-overlay="false"
      >
        <div class="disagree_Container">
          <div class="disagree_title">不同意原因</div>
          <div class="disagree_area">
            <van-field
              v-model="remark"
              :autosize="{ maxHeight: 150, minHeight: 150 }"
              type="textarea"
              placeholder="请输入不同意原因"
            />
          </div>
          <div class="disagree_btnBox">
            <div class="disagree_btn" @click="submitComment('否')">确定</div>
            <div class="cancel_btn" @click="disagree_Container = false">
              取消
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "auditstudent",
  data() {
    return {
      disagree_Container: false,
      studentInfo: {},
      remark: ""
    };
  },
  beforeCreate() {},
  created() {
    this.getAuditDetails();
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
    getAuditDetails() {
      let that = this;
      that.$axios
        .post(that.$api.auditDetails, {
          wf_docUnid: JSON.parse(that.$route.query.wf_docunid)
        })
        .then(res => {
          let data = res.data;

          for (let keys in data) {
            that.$set(that.studentInfo, keys, data[keys]);
          }
        });
    },
    submitComment: function(type) {
      let that = this;
      that.$axios
        .post(that.$api.submitAudit, {
          wf_docUnid: JSON.parse(that.$route.query.wf_docunid),
          status: type,
          remark: type == "否" ? that.remark : ""
        })
        .then(res => {
          that.$toast.success("审核已完成");
          that.$router.go(-1);
        });
    },
    // 返回一个特定的 DOM 节点，作为每日一学弹窗挂载的父节点
    getContainer() {
      return document.querySelector(".auditstudent_container");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auditstudent_container {
  height: 100vh;
  background-color: #f6f6f6;
}
.selfinfo_topPanel,
.selfinfo_middlePanel,
.selfinfo_bottomPanel {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem;
  margin-bottom: 10px;
  background-color: #ffffff;
}
.selfinfo_panel {
  box-sizing: border-box;
  padding: 10px 0px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
}
.selfinfo_topPanel .selfinfo_panel:last-child,
.selfinfo_middlePanel .selfinfo_panel:last-child,
.selfinfo_bottomPanel .selfinfo_panel:last-child {
  border: none;
}
.selfinfo_label {
  display: flex;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
  align-items: center;
}
.selfinfo_text {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.selfinfo_headIcon {
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
}
.selfinfo_bottomPanel {
  margin-bottom: 0px;
}
.selfinfo_bottomBtnBox {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 1rem 30px 1rem;
  background-color: #f6f6f6;
  display: flex;
  justify-content: space-between;
}
.selfinfo_submitBtn {
  display: inline-block;
  width: 10rem;
  height: 36px;
  border-radius: 2px;
  background-color: #0090d8;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 36px;
  text-align: center;
}
.selfinfo_cancelBtn {
  display: inline-block;
  width: 9.875rem;
  height: 34px;
  border-radius: 2px;
  background-color: #f6f6f6;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 36px;
  text-align: center;
  border: 1px solid #bbbbbb;
}
.disagree_Container {
  width: 17.5rem;
  border: 4px;
}
.disagree_title {
  width: 100%;
  height: 40px;
  background-color: #0090d8;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
  font-size: 1.125rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.disagree_area {
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 10px;
}
.disagree_btnBox {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 10px 0px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.disagree_btn {
  display: inline-block;
  border-radius: 4px;
  width: 6.75rem;
  height: 30px;
  background-color: #0090d8;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  margin: 0px auto;
  font-size: 0.875rem;
}
.cancel_btn {
  display: inline-block;
  border-radius: 4px;
  width: 6.75rem;
  height: 28px;
  background-color: #ffffff;
  color: #666666;
  text-align: center;
  line-height: 30px;
  margin: 0px auto;
  font-size: 0.875rem;
  border: 1px solid #bbbbbb;
}
</style>
<style>
.auditstudent_container .van-nav-bar {
  background-color: #0090d8;
}
.auditstudent_container .van-nav-bar__placeholder,
.auditstudent_container .van-nav-bar__content {
  height: 44px !important;
}
.auditstudent_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.auditstudent_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}

.auditstudent_container .van-field {
  padding: 0px;
  display: flex;
  justify-content: space-between;
}
.disagree_area .van-field {
  padding: 0px 10px;
  border: 1px solid #eeeeee;
}
.auditstudent_container .van-field__label,
.auditstudent_container .van-field__control {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.auditstudent_container .van-field__value {
  max-width: 14rem;
}
.disagree_area .van-field__value {
  max-width: 100%;
}
.auditstudent_container .van-field__control {
  text-align: right;
  color: #666666;
  letter-spacing: -0.1px;
}
.disagree_area .van-field__control {
  text-align: left;
}

.selfinfo_color .van-field__control {
  color: #0090d8;
}
.selfinfo_area .van-field__control {
  text-align: left;
}

.auditstudent_container .van-popup {
  background-color: transparent;
}
</style>
