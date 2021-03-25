<template>
  <div class="studentInfo_container">
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
    </div>
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
          v-model="studentInfo.userName"
          label="姓名"
          :readonly="true"
        />
      </div>
    </div>
    <div class="selfinfo_middlePanel">
      <div class="selfinfo_panel">
        <div class="selfinfo_label">就业方式</div>
        <div class="selfinfo_text" v-if="!editing">
          {{ studentInfo.jiuyefangshi }}
        </div>
        <van-radio-group v-model="studentInfo.jiuyefangshi" v-else>
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
          {{ studentInfo.jiuyezhuangtai }}
        </div>
        <van-radio-group v-model="studentInfo.jiuyezhuangtai" v-else>
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
        :class="{ selfinfo_area: (studentInfo.shixidanwei + '').length > 16 }"
      >
        <van-field
          v-model="studentInfo.shixidanwei"
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
        :class="{ selfinfo_area: (studentInfo.danweidizhi + '').length > 16 }"
      >
        <van-field
          v-model="studentInfo.danweidizhi"
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
          v-model="studentInfo.phone"
          label="联系电话"
          placeholder="请输入联系电话"
          :formatter="formatter_phone"
          format-trigger="onBlur"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
        <van-field
          v-model="studentInfo.jjlxr"
          label="紧急联系电话"
          placeholder="请输入紧急联系电话"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
        <van-field
          v-model="studentInfo.jzdh"
          label="单位电话"
          placeholder="请输入单位电话"
          :formatter="formatter_symbol"
          format-trigger="onBlur"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel">
        <van-field
          v-model="studentInfo.qylxr"
          label="企业联系人"
          placeholder="请输入企业联系人"
          :formatter="formatter_symbol"
          format-trigger="onBlur"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel">
        <van-field
          v-model="studentInfo.job"
          label="岗位"
          placeholder="请输入岗位"
          :formatter="formatter_symbol"
          format-trigger="onBlur"
          :readonly="!editing"
        />
      </div>
    </div>
    <div
      class="handel_panel"
      :class="{ handel_panelBottom: isFrom == 'studentList' }"
    >
      <van-cell
        title="月记"
        is-link
        class="handel_item"
        @click="linkTo('/monthlylist')"
      >
        <template #icon>
          <i class="iconItem icon_yuejitubiao icon_item"></i>
        </template>
      </van-cell>
      <van-cell
        title="查看签到详情"
        is-link
        class="handel_item"
        @click="linkTo('/signinDetail')"
      >
        <template #icon>
          <i
            class="iconItem icon_xibu-chakanqiandaoxiangqingtubiao icon_item"
          ></i>
        </template>
      </van-cell>
    </div>
    <div v-if="isFrom != 'studentList'">
      <div class="selfinfo_bottomBtnpanel" v-if="!editing">
        <div
          class="selfinfo_bottomBtn"
          @click="onEditing"
          v-if="isFrom == 'statistics'"
        >
          编辑
        </div>
        <div class="selfinfo_bottomBtn" @click="sendMsg">
          发消息
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
export default {
  name: "studentInfo",
  data() {
    return {
      userData: Object,
      editing: false,
      studentInfo: {},
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
      isFrom: ""
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.isFrom = JSON.parse(this.$route.query.isFrom);
    this.getUserByCardId();
    this.getRadioOption();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    formatter_symbol: function(value) {
      if (!value && !this.editing) {
        return value;
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
      if (!this.editing) {
        return value;
      }
      if (!value && !this.editing) {
        return value;
      }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(value)) {
        this.$toast({
          message: "电话格式错误，请重新输入"
        });
      }
      return value;
    },
    onClickLeft: function() {
      this.$router.go(-1);
    },
    onEditing: function() {
      let that = this;
      that.editing = true;
      for (let key in that.studentInfo) {
        that.$set(that.infoOfbeforeEdit, key, that.studentInfo[key]);
      }
    },
    onCancel: function() {
      let that = this;
      that.editing = false;
      for (let key in that.infoOfbeforeEdit) {
        that.$set(that.studentInfo, key, that.infoOfbeforeEdit[key]);
      }
    },
    submitChange: function() {
      let that = this;
      let data = {
        cardid: that.studentInfo.cardid,
        phone: that.studentInfo.phone,
        jiuyezhuangtai: that.studentInfo.jiuyezhuangtai,
        jiuyefangshi: that.studentInfo.jiuyefangshi,
        shixidanwei: that.studentInfo.shixidanwei,
        danweidizhi: that.studentInfo.danweidizhi,
        jjlxr: that.studentInfo.jjlxr,
        jzdh: that.studentInfo.jzdh,
        qylxr: that.studentInfo.qylxr,
        job: that.studentInfo.job
      };
      for (let key in data) {
        if (!data[key]) {
          that.$toast({
            message: "您还有未填写的信息,请完成填写"
          });
          return;
        }
      }
      if (
        /[~`!@#$%^&*()+=-{}:;"'<,>.?/|[\]\\·【】；：’”“‘《》，。？、！￥……（）——]/.test(
          data.shixidanwei
        )
      ) {
        that.$toast({
          message: "实习单位不可填写特殊符号"
        });
        return;
      }
      if (
        /[~`!@#$%^&*()+=-{}:;"'<,>.?/|[\]\\·【】；：’”“‘《》，。？、！￥……（）——]/.test(
          data.danweidizhi
        )
      ) {
        that.$toast({
          message: "单位地址不可填写特殊符号"
        });
        return;
      }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(data.phone)) {
        this.$toast({
          message: "联系电话格式错误，请重新输入"
        });
        return;
      }
      if (
        /[~`!@#$%^&*()+=-{}:;"'<,>.?/|[\]\\·【】；：’”“‘《》，。？、！￥……（）——]/.test(
          data.jzdh
        )
      ) {
        that.$toast({
          message: "单位电话不可填写特殊符号"
        });
        return;
      }
      if (
        /[~`!@#$%^&*()+=-{}:;"'<,>.?/|[\]\\·【】；：’”“‘《》，。？、！￥……（）——]/.test(
          data.qylxr
        )
      ) {
        that.$toast({
          message: "企业联系人不可填写特殊符号"
        });
        return;
      }
      if (
        /[~`!@#$%^&*()+=-{}:;"'<,>.?/|[\]\\·【】；：’”“‘《》，。？、！￥……（）——]/.test(
          data.job
        )
      ) {
        that.$toast({
          message: "岗位不可填写特殊符号"
        });
        return;
      }
      that.$axios.post(that.$api.studentEdit, data).then(res => {
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
    },
    getUserByCardId() {
      let that = this;
      that.$axios
        .post(
          this.isFrom == "statistics"
            ? that.$api.getUserByCardId_teacher
            : that.$api.getUserByCardId_dept,
          {
            cardid: JSON.parse(that.$route.query.cardid),
            year: that.$route.query.year
              ? JSON.parse(that.$route.query.year)
              : ""
          }
        )
        .then(res => {
          let data = res.data;
          for (let keys in data) {
            that.$set(that.studentInfo, keys, data[keys]);
          }
          this.headImg[0].url = this.studentInfo.logo;
        });
    },
    linkTo: function(path) {
      if (path == "/monthlylist") {
        this.$router.push({
          path: path,
          query: { cardid: this.studentInfo.cardid }
        });
      } else {
        this.$router.push({
          path: path,
          query: { cardid: this.studentInfo.cardid }
        });
      }
    },
    sendMsg: function() {
      let data = {
        chatWith: JSON.stringify(this.studentInfo.cardid)
      };
      this.$router.push({
        path: "/chatroom",
        query: data
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.studentInfo_container {
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
.handel_panelBottom {
  border-bottom: 20px solid #f6f6f6;
}
.handel_item {
  padding: 10px 1rem;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.icon_item {
  color: #0090d8;
  box-sizing: border-box;
  padding: 0px 0.625rem 0px 0px;
}

.selfinfo_bottomBtnpanel {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 1rem 30px 1rem;
  background-color: #f6f6f6;
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
  background-color: #004ca7;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 36px;
  text-align: center;
  margin: 0px 0px 10px 0px;
}
.selfinfo_bottomBtnpanel .selfinfo_bottomBtn:first-child {
  background-color: #0090d8;
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
.studentInfo_container .van-nav-bar {
  background-color: #0090d8;
}
.studentInfo_container .van-nav-bar__placeholder,
.studentInfo_container .van-nav-bar__content {
  height: 44px !important;
}
.studentInfo_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.studentInfo_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}

.studentInfo_container .van-field {
  padding: 0px;
  display: flex;
  justify-content: space-between;
}
.studentInfo_container .van-field__label,
.studentInfo_container .van-field__control {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.studentInfo_container .van-field__value {
  max-width: 14rem;
}
.studentInfo_container .van-field__control {
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
