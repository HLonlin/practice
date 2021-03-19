<template>
  <div class="recorddetail_wrapper">
    <van-nav-bar
      title="记录详情"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
    <div>
      <div class="recorddetail_middlePanel">
        <div class="recorddetail_panel">
          <div class="recorddetail_label">审核状态</div>
          <div class="recorddetail_text">
            {{
              detail.isty == "是"
                ? "已通过"
                : item.isty == "否"
                ? "未通过"
                : "待审核"
            }}
          </div>
        </div>
        <div class="recorddetail_panel">
          <div class="recorddetail_label">就业方式</div>
          <div class="recorddetail_text">
            {{ detail.jiuyefangshi }}
          </div>
        </div>
        <div class="recorddetail_panel">
          <div class="recorddetail_label">就业状态</div>
          <div class="recorddetail_text">
            {{ detail.jiuyezhuangtai }}
          </div>
        </div>
        <div
          class="recorddetail_panel"
          :class="{
            recorddetail_area: (detail.shixidanwei + '').length > 16
          }"
        >
          <van-field
            v-model="detail.shixidanwei"
            rows="1"
            autosize
            label="实习单位"
            type="textarea"
            placeholder="请输入实习单位"
            :readonly="true"
          />
        </div>
        <div
          class="recorddetail_panel"
          :class="{
            recorddetail_area: (detail.danweidizhi + '').length > 16
          }"
        >
          <van-field
            v-model="detail.danweidizhi"
            rows="1"
            autosize
            label="单位地址"
            type="textarea"
            placeholder="请输入单位地址"
            :readonly="true"
          />
        </div>
      </div>
      <div class="recorddetail_bottomPanel">
        <div class="recorddetail_panel recorddetail_color">
          <van-field
            v-model="detail.phone"
            label="联系电话"
            placeholder="请输入联系电话"
            :readonly="true"
          />
        </div>
        <div class="recorddetail_panel recorddetail_color">
          <van-field
            v-model="detail.jjlxr"
            label="紧急联系电话"
            placeholder="请输入紧急联系电话"
            :readonly="true"
          />
        </div>
        <div class="recorddetail_panel recorddetail_color">
          <van-field
            v-model="detail.jzdh"
            label="单位电话"
            placeholder="请输入单位电话"
            :readonly="true"
          />
        </div>
        <div class="recorddetail_panel">
          <van-field
            v-model="detail.qylxr"
            label="企业联系人"
            placeholder="请输入企业联系人"
            :readonly="true"
          />
        </div>
        <div class="recorddetail_panel">
          <van-field
            v-model="detail.job"
            label="岗位"
            placeholder="请输入岗位"
            :readonly="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recorddetail",
  data: function() {
    return {
      detail: ""
    };
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    getDetail: function() {
      let that = this;
      that.$axios
        .post(that.$api.auditDetails, {
          wf_docUnid: JSON.parse(this.$route.query.wf_docUnid)
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  watch: {},
  computed: {},
  beforeCreate() {},
  created() {
    this.detail = JSON.parse(this.$route.query.detail);
    // this.getDetail();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recorddetail_wrapper {
  height: 100vh;
  background-color: #f6f6f6;
}
.recorddetail_topPanel,
.recorddetail_middlePanel,
.recorddetail_bottomPanel {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem;
  margin-bottom: 10px;
  background-color: #ffffff;
}
.recorddetail_panel {
  box-sizing: border-box;
  padding: 10px 0px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
}
.recorddetail_topPanel .recorddetail_panel:last-child,
.recorddetail_middlePanel .recorddetail_panel:last-child,
.recorddetail_bottomPanel .recorddetail_panel:last-child {
  border: none;
}
.recorddetail_label {
  display: flex;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
  align-items: center;
}
.recorddetail_text {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.recorddetail_headIcon {
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
}
.recorddetail_bottomPanel {
  margin-bottom: 0px;
}
.recorddetail_radio {
  vertical-align: middle;
  color: #bbbbbb;
  display: flex;
  align-self: center;
}
.recorddetail_radioActive {
  color: #0090d8;
  display: flex;
  align-self: center;
}
.recorddetail_bottomBtnBox {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 1rem 30px 1rem;
  background-color: #f6f6f6;
  display: flex;
  justify-content: space-between;
}
.recorddetail_bottomBtn {
  width: 100%;
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
.disableBtn {
  background-color: #dddddd;
}
.recorddetail_submitBtn {
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
.recorddetail_cancelBtn {
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
</style>
<!-- You need to override the style of the frame -->
<style>
.recorddetail_wrapper .van-nav-bar {
  background-color: #0090d8;
}
.recorddetail_wrapper .van-nav-bar__placeholder,
.recorddetail_wrapper .van-nav-bar__content {
  height: 44px !important;
}
.recorddetail_wrapper .van-nav-bar .van-icon {
  color: #ffffff;
}
.recorddetail_wrapper .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}

.recorddetail_wrapper .van-field {
  padding: 0px;
  display: flex;
  justify-content: space-between;
}
.recorddetail_wrapper .van-field__label,
.recorddetail_wrapper .van-field__control {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.recorddetail_wrapper .van-field__value {
  max-width: 14rem;
}
.recorddetail_wrapper .van-field__control {
  text-align: right;
  color: #666666;
  letter-spacing: -0.1px;
}

.recorddetail_color .van-field__control {
  color: #0090d8;
}
.recorddetail_area .van-field__control {
  text-align: left;
}

.recorddetail_panel .van-radio-group {
  display: flex;
  flex-wrap: wrap;
  max-width: 14rem;
}
.recorddetail_panel .van-radio {
  display: inline-block;
  margin: 0.125rem 0px 0.125rem 0.75rem;
}
.recorddetail_panel .van-radio__icon {
  display: inline-block;
  font-size: unset;
  line-height: unset;
  height: unset;
  vertical-align: middle;
}
.recorddetail_panel .van-radio__label {
  margin-left: 3px;
  vertical-align: middle;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.recorddetail_panel .van-uploader__upload {
  margin: 0px;
  border-radius: 50%;
}
.recorddetail_panel .van-uploader__preview-image {
  border-radius: 50%;
}
.recorddetail_panel .van-uploader__preview-delete {
  border-radius: 50%;
}
.recorddetail_panel .van-uploader__preview-delete-icon {
  top: -1px;
  right: -1px;
}
</style>
