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
    <div v-if="userData.isTeacher">
      <div class="selfinfo_topPanel">
        <div class="selfinfo_panel">
          <div class="selfinfo_label">头像</div>
          <van-uploader
            class="selfinfo_headIcon"
            v-model="headImg"
            :max-count="1"
            preview-size="3.75rem"
            :deletable="false"
            :preview-options="{ showIndex: false, closeable: true }"
          >
          </van-uploader>
        </div>
        <div class="selfinfo_panel ">
          <van-field v-model="userData.name" label="姓名" :readonly="true" />
        </div>
      </div>
      <div class="selfinfo_middlePanel">
        <div class="selfinfo_panel">
          <van-field
            v-model="userData.jobtitle"
            label="岗位"
            :readonly="true"
          />
        </div>
        <div class="selfinfo_panel">
          <van-field
            v-model="userData.deptname"
            label="系部"
            :readonly="true"
          />
        </div>
        <div class="selfinfo_panel">
          <van-field v-model="userData.zhuanye" label="专业" :readonly="true" />
        </div>
        <div class="selfinfo_panel">
          <van-field v-model="userData.banji" label="班级" :readonly="true" />
        </div>
      </div>
      <div class="selfinfo_bottomPanel">
        <div class="selfinfo_panel" :class="{ selfinfo_color: true }">
          <van-field
            v-model="userData.phonenum"
            label="联系电话"
            :readonly="true"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="selfinfo_topPanel">
        <div class="selfinfo_panel">
          <div class="selfinfo_label">头像</div>
          <van-uploader
            class="selfinfo_headIcon"
            v-model="headImg"
            :max-count="1"
            preview-size="3.75rem"
            :deletable="false"
            :preview-options="{ showIndex: false, closeable: true }"
          >
          </van-uploader>
        </div>
        <div class="selfinfo_panel ">
          <van-field
            v-model="userData.userName"
            label="姓名"
            :readonly="true"
          />
        </div>
      </div>
      <div class="selfinfo_middlePanel">
        <div class="selfinfo_panel">
          <div class="selfinfo_label">就业方式</div>
          <div class="selfinfo_text" v-if="!editing">
            {{ userData.jiuyefangshi }}
          </div>
          <van-radio-group v-model="userData.jiuyefangshi" v-else>
            <van-radio
              v-for="(item, i) in jiuyefangshiRadioList"
              :key="i"
              :name="item.value"
              checked-color="#0090d8"
              >{{ item.text }}
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
        <div class="selfinfo_panel">
          <div class="selfinfo_label">就业状态</div>
          <div class="selfinfo_text" v-if="!editing">
            {{ userData.jiuyezhuangtai }}
          </div>
          <van-radio-group v-model="userData.jiuyezhuangtai" v-else>
            <van-radio
              v-for="(item, i) in stateRadioList"
              :key="i"
              :name="item.value"
              checked-color="#0090d8"
              >{{ item.text }}
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
          :class="{ selfinfo_area: (userData.shixidanwei + '').length > 16 }"
        >
          <van-field
            v-model="userData.shixidanwei"
            rows="1"
            autosize
            label="实习单位"
            type="textarea"
            placeholder="请输入实习单位"
            :formatter="formatter_symbol"
            format-trigger="onBlur"
            :readonly="!editing"
          />
        </div>
        <div
          class="selfinfo_panel"
          :class="{ selfinfo_area: (userData.danweidizhi + '').length > 16 }"
        >
          <van-field
            v-model="userData.danweidizhi"
            rows="1"
            autosize
            label="单位地址"
            type="textarea"
            placeholder="请输入单位地址"
            :formatter="formatter_symbol"
            format-trigger="onBlur"
            :readonly="!editing"
          />
        </div>
      </div>
      <div class="selfinfo_bottomPanel">
        <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
          <van-field
            v-model="userData.phone"
            label="联系电话"
            placeholder="请输入联系电话"
            :formatter="formatter_phone"
            format-trigger="onBlur"
            :readonly="!editing"
          />
        </div>
        <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
          <van-field
            v-model="userData.jjlxr"
            label="紧急联系电话"
            placeholder="请输入紧急联系电话"
            :readonly="!editing"
          />
        </div>
        <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
          <van-field
            v-model="userData.jzdh"
            label="单位电话"
            placeholder="请输入单位电话"
            :formatter="formatter_phone"
            format-trigger="onBlur"
            :readonly="!editing"
          />
        </div>
        <div class="selfinfo_panel">
          <van-field
            v-model="userData.qylxr"
            label="企业联系人"
            placeholder="请输入企业联系人"
            :formatter="formatter_symbol"
            format-trigger="onBlur"
            :readonly="!editing"
          />
        </div>
        <div class="selfinfo_panel">
          <van-field
            v-model="userData.job"
            label="岗位"
            placeholder="请输入岗位"
            :formatter="formatter_symbol"
            format-trigger="onBlur"
            :readonly="!editing"
          />
        </div>
      </div>
      <div class="selfinfo_bottomBtnBox" v-if="!editing">
        <div
          class="selfinfo_bottomBtn"
          @click="onEditing"
          :class="{ disableBtn: evaluating }"
        >
          编辑
        </div>
      </div>
      <div class="selfinfo_bottomBtnBox" v-else>
        <div class="selfinfo_submitBtn" @click="submitChange">提交</div>
        <div class="selfinfo_cancelBtn" @click="onCancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 个人信息页
 * 你有待审核信息未通过、请在审核结束后重试
 */
export default {
  name: "selfinfo",
  data() {
    return {
      editing: false,
      userData: {},
      infoOfbeforeEdit: {},
      jiuyefangshiRadioList: [],
      stateRadioList: [
        "待业",
        "待上岗",
        "已上岗",
        "离职",
        "换企业",
        "服兵役",
        "面试体检中"
      ],
      headImg: [{ url: require("@/assets/images/default.png"), isImage: true }],
      evaluating: false
    };
  },
  beforeCreate() {},
  created() {
    this.getUserData();
    this.getRadioOption();
    this.isUpdateStudentRecord();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    isUpdateStudentRecord: function() {
      let that = this;
      that.$axios.post(that.$api.isUpdateStudentRecord).then(res => {
        if (JSON.stringify(res.data) == "{}") {
          that.evaluating = false;
        } else {
          that.evaluating = true;
        }
      });
    },
    formatter: function(formatterList) {
      if (!value && !this.editing) {
        return;
      }
      if (formatterList.indexof("symbol") != -1) {
        if (
          /[~`!@#$%^&*()+=-{}:;"'<,>.?/|[\]\\·【】；：’”“‘《》，。？、]/.test(
            value
          )
        ) {
          this.$toast({
            message: "请输入数字、汉字、英文字母或者下划线"
          });
        }
      }

      return value;
    },
    formatter_symbol: function(value) {
      if (!value && !this.editing) {
        return;
      }
      if (!value) {
        this.$toast({
          message: "内容不可为空"
        });
      }
      if (
        /[~`!@#$%^&*()+=-{}:;"'<,>.?/|[\]\\·【】；：’”“‘《》，。？、！￥……（）——]/.test(
          value
        )
      ) {
        this.$toast({
          message: "请输入数字、汉字、英文字母或者下划线"
        });
      }
      return value;
    },
    formatter_phone: function(value) {
      if (!value && !this.editing) {
        return;
      }
      if (!/^1[3|4|5|7|8|9]\d{9}$/.test(value)) {
        this.$toast({
          message: "联系电话格式错误，请重新输入"
        });
      }
      return value;
    },
    getUserData: function() {
      let that = this;
      let userData = this.$tool.getLocal("userData");
      if (userData) {
        this.userData = userData;
        this.headImg[0].url = this.userData.logo;
      }
      if (!that.userData.isTeacher) {
        that.$axios
          .post(that.$api.getUserByCardId, { cardid: that.$route.query.cardid })
          .then(res => {
            that.userData = res.data;
            this.userData.logo = this.userData.logo
              ? this.userData.logo
              : require("@/assets/images/default.png");
            this.headImg[0].url = this.userData.logo;
            that.$tool.setLocal("userData", that.userData);
          });
      }
    },
    onClickLeft: function() {
      this.$router.go(-1);
    },
    onEditing: function() {
      let that = this;
      if (that.evaluating) {
        return;
      }
      that.editing = true;
      for (let key in that.userData) {
        that.$set(that.infoOfbeforeEdit, key, that.userData[key]);
      }
    },
    onCancel: function() {
      let that = this;
      that.editing = false;
      for (let key in that.userData) {
        that.$set(that.userData, key, that.infoOfbeforeEdit[key]);
      }
    },
    submitChange: function() {
      let that = this;
      let data = {
        cardid: that.userData.cardid,
        phone: that.userData.phone,
        jiuyezhuangtai: that.userData.jiuyezhuangtai,
        jiuyefangshi: that.userData.jiuyefangshi,
        shixidanwei: that.userData.shixidanwei,
        danweidizhi: that.userData.danweidizhi,
        jjlxr: that.userData.jjlxr,
        jzdh: that.userData.jzdh,
        qylxr: that.userData.qylxr,
        job: that.userData.job
      };
      for (let key in data) {
        if (!data[key]) {
          that.$toast({
            message: "您还有未填写的信息,请完成填写"
          });
          return;
        }
      }
      if (!/^1[3|4|5|7|8|9]\d{9}$/.test(that.userData.phone)) {
        this.$toast({
          message: "联系电话格式错误，请重新输入"
        });
        return;
      }
      that.$axios.post(that.$api.updateInfo_student, data).then(res => {
        that.getUserData();
        that.isUpdateStudentRecord();
        that.editing = false;
      });
    },
    getRadioOption: function() {
      let that = this;
      that.jiuyefangshiRadioList = [];
      that.stateRadioList = [];
      that.$axios.post(that.$api.jiuyefangshi, {}).then(res => {
        for (let i = 0, imax = res.data.length; i < imax; i++) {
          if (res.data[i].text != "请选择") {
            that.$set(
              that.jiuyefangshiRadioList,
              that.jiuyefangshiRadioList.length,
              res.data[i]
            );
          }
        }
      });
      that.$axios.post(that.$api.jiuyezhuangtai, {}).then(res => {
        for (let i = 0, imax = res.data.length; i < imax; i++) {
          that.$set(that.stateRadioList, i, res.data[i]);
        }
      });
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
.selfinfo_radio {
  vertical-align: middle;
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
.disableBtn {
  background-color: #dddddd;
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
  flex-wrap: wrap;
  max-width: 14rem;
}
.selfinfo_panel .van-radio {
  display: inline-block;
  margin: 0.125rem 0px 0.125rem 0.75rem;
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
.selfinfo_panel .van-uploader__upload {
  margin: 0px;
  border-radius: 50%;
}
.selfinfo_panel .van-uploader__preview-image {
  border-radius: 50%;
}
.selfinfo_panel .van-uploader__preview-delete {
  border-radius: 50%;
}
.selfinfo_panel .van-uploader__preview-delete-icon {
  top: -1px;
  right: -1px;
}
</style>
