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
      <div class="selfinfo_panel">
        <div class="selfinfo_label">头像</div>
        <van-uploader
          class="selfinfo_headIcon"
          v-model="info.headImg"
          :max-count="1"
          :before-read="beforeRead"
          :after-read="afterRead"
          preview-size="3.75rem"
          :deletable="false"
          :preview-options="{ showIndex: false }"
          v-if="!editing"
        >
        </van-uploader>
        <van-uploader
          class="selfinfo_headIcon"
          v-model="info.headImg"
          :max-count="1"
          :before-read="beforeRead"
          :after-read="afterRead"
          preview-size="3.75rem"
          :preview-options="{ showIndex: false }"
          v-else
        >
        </van-uploader>
      </div>
      <div class="selfinfo_panel ">
        <van-field v-model="info.UserName" label="姓名" :readonly="true" />
      </div>
    </div>
    <div class="selfinfo_middlePanel">
      <div class="selfinfo_panel">
        <div class="selfinfo_label">就业方式</div>
        <div class="selfinfo_text" v-if="!editing">{{ info.jiuyefangshi }}</div>
        <van-radio-group v-model="info.jiuyefangshi" v-else>
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
        <div class="selfinfo_text" v-if="!editing">
          {{ info.jiuyezhuangtai }}
        </div>
        <van-radio-group v-model="info.jiuyezhuangtai" v-else>
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
        :class="{ selfinfo_area: info.shixidanwei.length > 16 }"
      >
        <van-field
          v-model="info.shixidanwei"
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
        :class="{ selfinfo_area: info.danweidizhi.length > 16 }"
      >
        <van-field
          v-model="info.danweidizhi"
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
          v-model="info.phone"
          label="联系电话"
          placeholder="请输入联系电话"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
        <van-field
          v-model="info.jjlxr"
          label="紧急联系电话"
          placeholder="请输入紧急联系电话"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel" :class="{ selfinfo_color: !editing }">
        <van-field
          v-model="info.workTelephone"
          label="单位电话"
          placeholder="请输入单位电话"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel">
        <van-field
          v-model="info.qylxr"
          label="企业联系人"
          placeholder="请输入企业联系人"
          :readonly="!editing"
        />
      </div>
      <div class="selfinfo_panel">
        <van-field
          v-model="info.job"
          label="岗位"
          placeholder="请输入岗位"
          :readonly="!editing"
        />
      </div>
    </div>
    <div class="selfinfo_bottomBtnBox" v-if="!editing">
      <div class="selfinfo_bottomBtn" @click="onEditing">
        编辑
      </div>
    </div>
    <div class="selfinfo_bottomBtnBox" v-else>
      <div class="selfinfo_submitBtn">提交</div>
      <div class="selfinfo_cancelBtn" @click="onCancel">取消</div>
    </div>
  </div>
</template>

<script>
/**
 * 个人信息页
 */
export default {
  name: "selfinfo",
  data() {
    return {
      editing: false,
      info: {
        headImg: [{ url: "../../../assets/images/default.png" }],
        UserName: "卢保希",
        jiuyefangshi: "自谋",
        jiuyezhuangtai: "已上岗",
        shixidanwei: "艺影广告发展有限公司",
        danweidizhi: "广州市海珠区南洲路143号 艺影小洲影视基地",
        phone: "13332838357",
        jjlxr: "13924221482",
        workTelephone: "02084122541",
        qylxr: "刘丽",
        job: "组长"
      },
      infoOfbeforeEdit: {},
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
  created() {
    this.getUserData();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getUserData: function() {
      let userData = this.$tool.getLocal("userData");
      if (userData) {
        for (let keys in this.info) {
          if (userData[keys]) {
            this.info[keys] = userData[keys];
          }
        }
        this.userName = userData.UserName;
        this.headImg = userData.logo || "../../../assets/images/default.png";
      }
    },
    onClickLeft: function() {
      this.$router.push({
        path: "/mine"
      });
      //   this.$router.go(-1);
    },
    // 上传前校验格式、大小
    beforeRead(file) {
      return true;
    },
    afterRead(file) {
      const tempFile = file.file;
      const type = tempFile.type;
      const size = tempFile.size;
      const newName =
        new Date().getTime() +
        tempFile.name.substring(tempFile.name.indexOf("."));
      let uploadFile = new File([tempFile], newName, { type, size });
      let formData = new FormData();
      formData.append("file", uploadFile);
      file.status = "uploading";
      file.message = "上传中...";

      setTimeout(() => {
        file.status = "done";
        file.message = "上传成功";
      }, 1000);
    },
    onEditing: function() {
      let that = this;
      that.editing = true;
      for (let key in that.info) {
        that.$set(that.infoOfbeforeEdit, key, that.info[key]);
      }
    },
    onCancel: function() {
      let that = this;
      that.editing = false;
      for (let key in that.info) {
        that.$set(that.info, key, that.infoOfbeforeEdit[key]);
      }
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
