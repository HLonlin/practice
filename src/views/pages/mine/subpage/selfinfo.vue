<template>
  <div class="selfinfo_container">
    <van-nav-bar
      title="个人信息"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="selfinfo_topPanel">
      <!-- <div class="selfinfo_panel selfinfo_headPanel">
          <div class="selfinfo_label">头像</div>
          <div class="selfinfo_headIconBox">
            <img class="selfinfo_headIcon" :src="headImg" />
          </div>
        </div> -->
      <div class="selfinfo_panel ">
        <van-field
          v-model="name"
          label="姓名"
          placeholder="请输入姓名"
          :readonly="!editing"
        />
      </div>
    </div>
    <div class="selfinfo_middlePanel">
      <div class="selfinfo_panel">
        <div class="selfinfo_label">就业方式</div>
        <div class="selfinfo_text" v-if="!editing">{{ mode }}</div>
        <van-radio-group v-model="mode" v-else>
          <van-radio name="自谋" checked-color="#0090d8"
            >自谋
            <template #icon="props">
              <i
                class="iconItem "
                :class="{
                  selfinfo_radioActive: props.checked,
                  icon_radioActive: props.checked,
                  icon_radio: !props.checked
                }"
              ></i>
            </template>
          </van-radio>
          <van-radio name="推荐" checked-color="#0090d8"
            >推荐
            <template #icon="props">
              <i
                class="iconItem "
                :class="{
                  selfinfo_radioActive: props.checked,
                  selfinfo_radio: !props.checked,
                  icon_radioActive: props.checked,
                  icon_radio: !props.checked
                }"
              ></i>
            </template>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="selfinfo_panel">
        <div class="selfinfo_label">就业状态</div>
        <div class="selfinfo_text" v-if="!editing">{{ state }}</div>
        <van-radio-group v-model="state" v-else>
          <van-radio
            v-for="(item, i) in stateRadioList"
            :key="i"
            :name="item"
            checked-color="#0090d8"
            >{{ item }}
            <template #icon="props">
              <i
                class="iconItem "
                :class="{
                  selfinfo_radioActive: props.checked,
                  icon_radioActive: props.checked,
                  icon_radio: !props.checked
                }"
              ></i>
            </template>
          </van-radio>
        </van-radio-group>
      </div>
      <div
        class="selfinfo_panel"
        :class="{ selfinfo_area: company.length > 16 }"
      >
        <van-field
          v-model="company"
          rows="1"
          autosize
          label="实习单位"
          type="textarea"
          placeholder="请输入实习单位"
          :readonly="!editing"
        />
      </div>
      <div
        class="selfinfo_panel"
        :class="{ selfinfo_area: address.length > 16 }"
      >
        <van-field
          v-model="address"
          rows="1"
          autosize
          label="单位地址"
          type="textarea"
          placeholder="请输入单位地址"
          :readonly="!editing"
        />
      </div>
    </div>
    <div class="selfinfo_bottomPanel">
      <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
        <van-field
          v-model="tel"
          label="联系电话"
          placeholder="请输入联系电话"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
        <van-field
          v-model="emergencyCall"
          label="紧急联系电话"
          placeholder="请输入紧急联系电话"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
        <van-field
          v-model="workTelephone"
          label="单位电话"
          placeholder="请输入单位电话"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel">
        <van-field
          v-model="businessContacts"
          label="企业联系人"
          placeholder="请输入企业联系人"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel">
        <van-field
          v-model="post"
          label="岗位"
          placeholder="请输入岗位"
          :readonly="!editing"
        />
      </div>
    </div>
    <div class="selfinfo_bottomBtnBox" v-if="!editing">
      <div class="selfinfo_bottomBtn" @click="editing = true">
        编辑
      </div>
    </div>
    <div class="selfinfo_bottomBtnBox" v-else>
      <div class="selfinfo_submitBtn">提交</div>
      <div class="selfinfo_cancelBtn" @click="editing = false">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selfinfo",
  data() {
    return {
      editing: false,
      headImg: require("@/assets/images/default.png"),
      name: "卢保希",
      mode: "自谋",
      state: "已上岗",
      company: "艺影广告发展有限公司",
      address: "广州市海珠区南洲路143号 艺影小洲影视基地",
      tel: "13332838357",
      emergencyCall: "13924221482",
      workTelephone: "02084122541",
      businessContacts: "刘丽",
      post: "组长",
      stateRadioList: [
        "待业",
        "待上岗",
        "已上岗",
        "离职",
        "换企业",
        "服兵役",
        "面试体检中"
      ]
    };
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
        path: "/mine"
      });
      //   this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selfinfo_container {
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
  align-items: center;
}
.selfinfo_topPanel .selfinfo_panel:last-child,
.selfinfo_middlePanel .selfinfo_panel:last-child,
.selfinfo_bottomPanel .selfinfo_panel:last-child {
  border: none;
}
.selfinfo_label {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.selfinfo_text {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.selfinfo_bottomPanel {
  margin-bottom: 0px;
}
.selfinfo_radio {
  vertical-align: middle;
  font-size: 0.9375rem;
  color: #bbbbbb;
  display: flex;
  align-self: center;
}
.selfinfo_radioActive {
  color: #0090d8;
  display: flex;
  align-self: center;
}
.selfinfo_bottomBtnBox {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 1rem 30px 1rem;
  background-color: #f6f6f6;
  display: flex;
  justify-content: space-between;
}
.selfinfo_bottomBtn {
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
/* .selfinfo_label {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.selfinfo_info {
  max-width: 14rem;
  letter-spacing: -0.4px;
}
.selfinfo_panel {
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.selfinfo_disable {
  color: #666666;
}
.selfinfo_able {
  color: #0090d8;
}
.selfinfo_headPanel {
  height: 90px;
}
.selfinfo_headIconBox {
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
}
.selfinfo_headIcon {
  width: 100%;
  height: 100%;
}
.selfinfo_infoPanel {
  box-sizing: border-box;
  padding: 12px 0px;
}
.selfinfo_alignTop {
  align-self: flex-start;
} */
</style>
<style>
.selfinfo_container .van-nav-bar {
  background-color: #0090d8;
}
.selfinfo_container .van-nav-bar__placeholder,
.selfinfo_container .van-nav-bar__content {
  height: 44px !important;
}
.selfinfo_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.selfinfo_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}

.selfinfo_container .van-field {
  padding: 0px;
  display: flex;
  justify-content: space-between;
}
.selfinfo_container .van-field__label,
.selfinfo_container .van-field__control {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.selfinfo_container .van-field__value {
  max-width: 14rem;
}
.selfinfo_container .van-field__control {
  text-align: right;
  color: #666666;
  letter-spacing: -0.1px;
}

.selfinfo_color .van-field__control {
  color: #0090d8;
}
.selfinfo_area .van-field__control {
  text-align: left;
}

.selfinfo_panel .van-radio-group {
  display: flex;
  height: 19px;
}
.selfinfo_panel .van-radio {
  display: inline-block;
  margin-left: 0.75rem;
}
.selfinfo_panel .van-radio__icon {
  display: inline-block;
  font-size: unset;
  line-height: unset;
  height: unset;
  vertical-align: middle;
}
.selfinfo_panel .van-radio__label {
  margin-left: 3px;
  vertical-align: middle;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
</style>
