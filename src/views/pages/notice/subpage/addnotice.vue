<template>
  <div class="addnotice_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="新增公告"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </div>
    <div class="addnoticeCenter_panel">
      <div class="noticeTitle_panel">
        <div class="notice_title">公告标题</div>
        <div class="notice_content">
          <van-field
            v-model="noticeTitle"
            :autosize="{ maxHeight: 60, minHeight: 60 }"
            type="textarea"
            placeholder="请输入公告标题。"
            :formatter="formatter"
            format-trigger="onBlur"
            maxlength="100"
            show-word-limit
          />
        </div>
      </div>
      <div class="noticeContent_panel">
        <div class="notice_title">公告内容</div>
        <div class="notice_content">
          <van-field
            v-model="noticeInfo"
            :autosize="{ maxHeight: 210, minHeight: 210 }"
            type="textarea"
            placeholder="请输入公告内容。"
            :formatter="formatter"
            format-trigger="onBlur"
          />
        </div>
      </div>
      <div class="attachFile_panel">
        <div class="notice_title">附件</div>
        <van-uploader
          v-model="annexList"
          class="notice_upload"
          accept="file"
          :before-read="beforeRead"
          :after-read="afterRead"
        >
          <div class="attachFile_btnPanel">
            <div class="attachFile_btn">
              <i class="iconItem icon_tianjiatubiao"></i>
              <div>上传附件</div>
            </div>
          </div>
          <template #preview-cover="{ file }">
            <div class="preview-cover van-ellipsis" :title="file.name">
              {{ file.name }}
            </div>
          </template>
        </van-uploader>
      </div>
      <div class="noticeIstop_panel">
        <div class="notice_title">置顶公告</div>
        <div class="notice_istop">
          <van-switch v-model="istop" size="16px" active-color="#0090d8" />
        </div>
      </div>
      <div class="noticeDate_panel">
        <div class="notice_title">过期时间</div>
        <input
          type="text"
          id="date_pickTime"
          v-model="expiryDate"
          class="date_pickTime"
        />
      </div>
      <div class="bottomBtn_panel" @click="addNotice">
        发布
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addnotice",
  data() {
    return {
      laydate: window.laydate,
      noticeTitle: "",
      noticeInfo: "",
      annexList: [],
      istop: false,
      expiryDate: "",
      expiryTime: {
        year: "",
        month: "",
        dates: ""
      },
      currentDate: new Date()
    };
  },
  beforeCreate() {},
  created() {
    this.initExpiryTime();
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
    beforeRead(file) {
      // if (file.type !== "image/jpeg") {
      //   this.$toast("请上传 jpg 格式图片");
      //   return false;
      // }
      return true;
    },
    afterRead: function(file) {
      let files = file.file;
      let that = this;
      let host = "https://practice.dev.qooroo.cn:8443/practice"; // 测试
      // let host='https://practice.gzslits.com.cn/practice'; // 生产
      let uploadUrl = host + "/api/toolkit/upload/file";
      let formdata = new FormData();
      formdata.append(files.name, files, files.name);
      //设置请求头
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const axiosAjax = that.$axios.create({
        timeout: 1000 * 60 //时间
      });
      axiosAjax
        .post(uploadUrl, formdata, config)
        .then(res => {
          that.$toast(res.data.message);
        })
        .catch(() => {});
    },
    initLayDate: function() {
      let that = this;
      let today = that.$tool.getDateObj(new Date());
      that.expiryDate =
        today.year +
        (today.month < 10 ? "-0" + today.month : "-" + today.month) +
        "-" +
        (today.date < 10 ? "0" + today.date : today.date);
      that.laydate.render({
        elem: "#date_pickTime",
        theme: "#0090d8",
        btns: ["now", "confirm"],
        min: 0,
        position: "abolute",
        ready: function(date) {
          that.expiryTime.year = date.year;
          that.expiryTime.month =
            date.month < 10 ? "0" + date.month : date.month;
          that.expiryTime.dates = date.date < 10 ? "0" + date.date : date.date;
        },
        done: function(value, date, endDate) {
          that.expiryDate = value;
          that.expiryTime.year = date.year;
          that.expiryTime.month =
            date.month < 10 ? "0" + date.month : date.month;
          that.expiryTime.dates = date.date < 10 ? "0" + date.date : date.date;
        }
      });
    },
    onClickLeft: function() {
      let that = this;
      if (!this.noticeInfo && !this.noticeTitle) {
        this.$router.go(-1);
      } else {
        that.$dialog.confirm({
          title: "温馨提示",
          message: "内容尚未保存，是否放弃？",
          beforeClose: (action, done) => {
            if (action === "confirm") {
              done();
              this.$router.go(-1);
            } else {
              done();
            }
          }
        });
      }
    },
    formatter(value) {
      // 去除首尾空格
      return this.$tool.trim(value);
    },
    initExpiryTime: function() {
      let date = new Date();
      this.expiryTime.year = date.getFullYear();
      this.expiryTime.month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      this.expiryTime.dates =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    },
    timeFormatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    addNotice: function() {
      let that = this;
      if (!that.noticeTitle) {
        this.$toast({
          message: "公告标题不能为空"
        });
        return;
      }
      if (!that.noticeInfo) {
        this.$toast({
          message: "公告内容不能为空"
        });
        return;
      }
      let data = {
        subject: that.noticeTitle,
        info: that.noticeInfo,
        filename: "",
        fileurl: "",
        zhiding: that.istop ? 1 : 0,
        expiredTime:
          that.expiryTime.year +
          "-" +
          that.expiryTime.month +
          "-" +
          that.expiryTime.dates
      };
      that.$axios.post(that.$api.addNotice, data).then(res => {
        that.$router.go(-1);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addnoticeCenter_panel {
  box-sizing: border-box;
  padding: 15px 1rem;
}
.notice_title {
  box-sizing: border-box;
  padding: 5px 0px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.notice_istop {
  box-sizing: border-box;
  padding: 0px 1rem;
}
.noticeDate_panel,
.attachFile_panel {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 0px 20px 0px;
}
.notice_upload {
  width: 80%;
}
.attachFile_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 5px 0.625rem;
  margin-left: 1rem;
  border: 1px solid #dddddd;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
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
  background: rgba(0, 144, 216, 0.7);
}
.noticeIstop_panel {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 0px 1rem 0px;
}
.bottomBtn_panel {
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0090d8;
  border-radius: 2px;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.date_pickTime {
  width: 7.5rem;
  height: 24px;
  margin-left: 0.9375rem;
  border: 1px solid #eeeeee;
  text-align: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
</style>
<style>
.addnotice_container .van-nav-bar {
  background-color: #0090d8;
}
.addnotice_container .van-nav-bar__placeholder,
.addnotice_container .van-nav-bar__content {
  height: 44px !important;
}
.addnotice_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.addnotice_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.addnotice_container .van-field {
  margin: 5px 0px;
  padding: 10px;
  border: 1px solid #eeeeee;
}
.addnotice_container .van-picker {
  z-index: 0;
  width: 190px;
}
.addnotice_container .van-uploader__preview {
  width: 100%;
  margin-left: 1rem;
  border-radius: 3px;
  overflow: hidden;
}
.addnotice_container .van-uploader__file {
  width: 100%;
  height: 24px;
  background-color: rgba(0, 0, 0, 0);
}
.addnotice_container .van-uploader__file-icon {
  display: none;
}
.addnotice_container .van-uploader__file-name {
  display: none;
}
</style>
