<template>
  <div class="addmonthly_container">
    <van-nav-bar
      title="新增月记"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="monthlyDate_panel">
      <div class="monthly_title">月记时间</div>
      <input
        type="text"
        id="date_pickTime"
        v-model="date"
        class="date_pickTime"
        placeholder="请选择时间"
      />
    </div>
    <div class="monthlyContent_panel">
      <div class="monthly_title">月记内容</div>
      <div class="monthly_content">
        <van-field
          v-model="monthly.info"
          rows="7"
          autosize
          type="textarea"
          placeholder="月记内容不能少于150字"
          :formatter="formatter"
          format-trigger="onBlur"
        />
        <div class="monthly_fontNum">字数：{{ monthly.info.length }}</div>
      </div>
    </div>
    <!-- 上传图片、视频、附件 -->
    <div class="monthlyUpload_panel" v-show="false">
      <van-uploader v-model="photoList" class="monthly_upload">
        <div class="photoUploadBtn">
          <i class="iconItem icon_tianjiatupiantubiao icon_upload"></i>
          <span>添加图片</span>
        </div>
        <template #preview-cover="{ file }">
          <div class="preview-cover van-ellipsis">{{ file.name }}</div>
        </template>
      </van-uploader>
      <van-uploader v-model="videoList" class="monthly_upload">
        <div class="videoUploadBtn">
          <i class="iconItem icon_tianjiashipin icon_upload"></i>
          <span>添加视频</span>
        </div>
        <template #preview-cover="{ file }">
          <div class="preview-cover van-ellipsis">{{ file.name }}</div>
        </template>
      </van-uploader>
    </div>
    <div class="attachFile_panel" v-show="false">
      <div class="monthly_title">附件</div>
      <van-uploader v-model="videoList" class="monthly_upload">
        <div class="attachFile_btnPanel">
          <div class="attachFile_btn">
            <i class="iconItem icon_tianjiatubiao"></i>
            <div>上传附件</div>
          </div>
        </div>
        <template #preview-cover="{ file }">
          <div class="preview-cover van-ellipsis">{{ file.name }}</div>
        </template>
      </van-uploader>
    </div>
    <div class="addmonthly_submitBtn" @click="submitMonthly">提交</div>
  </div>
</template>

<script>
export default {
  name: "addmonthly",
  data() {
    return {
      laydate: window.laydate,
      date: "",
      monthly: {
        year: new Date().getFullYear(),
        zhou: "",
        info: "",
        tmp: ""
      },
      currentDate: new Date(),
      photoList: [],
      videoList: []
    };
  },
  beforeCreate() {},
  created() {
    let date = new Date();
    this.monthly.zhou =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
  },
  beforeMount() {},
  mounted() {
    this.initLayDate();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    initLayDate: function() {
      let that = this;
      let today = that.$tool.getDateObj(new Date());
      that.date =
        today.year +
        (today.month < 10 ? "-0" + today.month : "-" + today.month);
      that.laydate.render({
        elem: "#date_pickTime",
        type: "month",
        theme: "#0090d8",
        value: new Date(),
        btns: ["now", "confirm"],
        min: 0,
        position: "abolute",
        ready: function(date) {
          that.monthly.year = date.year;
          that.monthly.zhou = date.month < 10 ? "0" + date.month : date.month;
        },
        done: function(value, date, endDate) {
          that.date = value;
          that.monthly.year = date.year;
          that.monthly.zhou = date.month < 10 ? "0" + date.month : date.month;
        }
      });
    },
    formatter(value) {
      // 去除首尾空格
      return this.$tool.trim(value);
    },
    onClickLeft: function() {
      this.$router.go(-1);
    },
    // 提交月记
    submitMonthly: function() {
      if (this.monthly.year == "" || this.monthly.zhou == "") {
        this.$toast({
          message: "请选择时间"
        });
        return;
      }
      if (this.monthly.info.length <= 150) {
        this.$toast({
          message: "月记内容不能少于150字"
        });
        return;
      }
      let that = this;
      that.$axios
        .post(that.$api.addMonthly, {
          year: that.monthly.year,
          zhou: that.monthly.zhou,
          info: that.monthly.info,
          tmp: that.monthly.tmp
        })
        .then(res => {
          this.$router.push({
            path: "/monthlylist"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addmonthly_container {
  box-sizing: border-box;
  padding: 0px 1rem;
}
.monthlyDate_panel,
.attachFile_panel {
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 0px 10px 0px;
}
.monthlyDate_field {
  display: none;
}
.monthlyDate_pickPanel,
.attachFile_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 5px 0.625rem;
  margin-left: 0.9375rem;
  border: 1px solid #dddddd;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bbbbbb;
}
.monthlyDate_pickPanel div {
  margin-right: 1rem;
}
.attachFile_btn div {
  margin-left: 0.3125rem;
}
.monthlyDate_pickPanel::after {
  content: "";
  transform: rotate(135deg) translateY(4px);
  width: 0.5rem;
  height: 0.5rem;
  border-right: 1px solid #999999;
  border-top: 1px solid #999999;
}
.date_pickTime {
  width: 5rem;
  height: 24px;
  margin-left: 0.9375rem;
  border: 1px solid #eeeeee;
  text-align: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.monthly_content {
  position: relative;
}
.monthly_fontNum {
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 0.75rem;
  color: #999999;
  box-sizing: border-box;
  padding: 2px 0.5rem;
}
.monthlyUpload_panel {
  display: flex;
  justify-content: start;
}
.monthly_upload {
  max-width: 50%;
}
.photoUploadBtn,
.videoUploadBtn {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0px;
  width: 4.375rem;
  height: 4.375rem;
  border: 1px dotted #bbbbbb;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.photoUploadBtn {
  margin-right: 0.625rem;
}
.icon_upload {
  margin-top: 14px;
  font-size: 23px;
  color: #bbbbbb;
}
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.addmonthly_submitBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  background-color: #0090d8;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  border-radius: 2px;
  margin: 10px 0px;
}
.monthly_title {
  box-sizing: border-box;
  padding: 5px 0px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
</style>
<style>
.addmonthly_container .van-nav-bar {
  background-color: #0090d8;
}
.addmonthly_container .van-nav-bar__placeholder,
.addmonthly_container .van-nav-bar__content {
  height: 44px !important;
}
.addmonthly_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.addmonthly_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.addmonthly_container .van-field {
  margin: 5px 0px;
  padding: 10px;
  border: 1px solid #eeeeee;
}
.monthly_upload .van-uploader__preview {
  margin: 10px 10px 10px 0px;
}
.monthly_upload .van-uploader__preview-image {
  width: 4.375rem;
  height: 4.375rem;
  border-radius: 4px;
}
.addmonthly_container .van-picker {
  z-index: 0;
  width: 120px;
}
/* .addmonthly_container .van-picker__columns {
  height: 44px !important;
} */
</style>
