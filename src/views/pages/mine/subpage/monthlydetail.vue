<template>
  <div class="monthlydetail_container">
    <van-nav-bar
      title="月记详情"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="monthlydetail_articlePanel">
      <div class="monthlydetail_articleTitle">
        {{ monthlyDetail.year }}年{{ monthlyDetail.zhou }}月
      </div>
      <!-- 月记详情 -->
      <div
        class="monthlydetail_articleContent"
        v-html="monthlyDetail.info"
      ></div>
      <!-- 月记图 -->
      <div class="monthlydetail_articlePhoto" v-show="false">
        <div
          v-for="(item, i) in imageList"
          :key="i"
          class="articlePhoto_item"
          @click="previewImg(i)"
        >
          <img class="articlePhoto" :src="item" style="object-fit: cover;" />
        </div>
      </div>
    </div>
    <!-- 月记评语 -->
    <div class="monthlydetail_commentPanel">
      <div class="monthlydetail_commentTitle">老师评语</div>
      <div
        class="monthlydetail_commentItem"
        v-for="(item, i) in commentList"
        :key="i"
      >
        <div class="comment_headImg">
          <img
            class="comment_logo"
            :src="
              item.logo ? item.logo : require('@/assets/images/default.png')
            "
          />
        </div>
        <div class="comment_content">
          <div class="comment_title">
            <div class="comment_name">{{ item.username }}</div>
            <div class="comment_time">{{ item.created }}</div>
          </div>
          <div class="comment_text" v-html="item.info"></div>
        </div>
      </div>
      <div class="monthlydetail_noComment" v-if="commentList.length == 0">
        暂无评语
      </div>
    </div>
    <div class="monthlydetail_commentPanel" v-if="identity == 'headmaster'">
      <div class="monthlydetail_commentTitle">月记点评</div>
      <div class="dropDownList_box">
        <div class="dropDownList_container" @click.stop="dropDown = !dropDown">
          <div
            class="dropDownList_title"
            :style="{ color: onSelect === '' ? '#BBBBBB' : '#555555' }"
          >
            {{ onSelect === "" ? "请选择常用评语" : onSelect }}
          </div>
          <div class="dropDownList_triangle"></div>
          <div class="dropDownList_itemBox" v-show="dropDown">
            <div class="dropDownList_itemContainer">
              <div
                class="dropDownList_item"
                v-for="(item, i) in commonOption"
                :key="i"
                v-html="item.content"
                @click.stop="selectItem(item.content)"
                :style="{ color: onSelect === item.content ? '#0090d8' : '' }"
              ></div>
            </div>
            <div class="dropDownList_btnBox">
              <div class="dropDownList_addBtn" @click="turnCommonWord(0)">
                <i class="iconItem icon_tianjiatubiao icon_bottomIcon"></i>添加
              </div>
              <div class="dropDownList_ediBtn" @click="turnCommonWord(2)">
                <i class="iconItem icon_guanlitubiao icon_bottomIcon"></i>管理
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="monthlyComment_panel">
        <van-field
          class="monthlyComment_item"
          v-model="message"
          :autosize="{ maxHeight: 150, minHeight: 150 }"
          type="textarea"
          placeholder="请输入您对该学生的月记评语。"
        />
      </div>
      <div class="commentSubmit_panel">
        <div class="commentSubmit_btn" @click="addComment">提交</div>
      </div>
    </div>
    <van-image-preview
      v-model="show"
      :images="imageList"
      :startPosition="index"
    >
    </van-image-preview>
  </div>
</template>

<script>
export default {
  name: "monthlydetail",
  data() {
    return {
      onSelect: "",
      dropDown: false,
      commonOption: [],
      userData: Object,
      show: false,
      index: 0,
      imageList: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
        "https://img.yzcdn.cn/vant/apple-3.jpg",
        "https://img.yzcdn.cn/vant/apple-4.jpg",
        "https://img.yzcdn.cn/vant/apple-5.jpg",
        "https://img.yzcdn.cn/vant/apple-6.jpg"
      ],
      monthlyDetail: Object,
      commentList: [],
      message: "",
      identity: ""
    };
  },
  beforeCreate() {},
  created() {
    this.getUserData();
    this.getDEtail();
    this.getRemarkList();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    turnCommonWord: function(type) {
      this.$router.push({
        path: "/commonwords",
        query: { type: type, comeFrom: "monthlydetail" }
      });
    },
    getRemarkList: function() {
      let that = this;
      that.$axios.post(that.$api.zhoubaoRemarkList).then(res => {
        that.commonOption = res.data;
      });
    },
    selectItem: function(item) {
      this.onSelect = item;
      this.dropDown = false;
      this.message = item;
    },
    getUserData: function() {
      let userData = this.$tool.getLocal("userData");
      let identity = this.$tool.getLocal("identity");
      if (userData) {
        this.userData = userData;
      }
      if (identity) {
        this.identity = identity;
      }
    },
    // 加载详情
    getDEtail: function() {
      let that = this;
      that.$axios
        .post(
          that.userData.isTeacher
            ? that.$api.monthlyDetail_teacher
            : that.$api.monthlyDetail,
          {
            wf_docUnid: that.$route.query.wf_docUnid
          }
        )
        .then(res => {
          that.commentList = res.data.ideaList;
          that.monthlyDetail = res.data.noticeJson;
        });
    },
    onClickLeft: function() {
      this.$router.go(-1);
    },
    previewImg: function(i) {
      let that = this;
      this.show = true;
      this.index = i;
    },
    addComment: function() {
      this.message = this.$tool.trim(this.message);
      if (this.message) {
        let that = this;
        that.$axios
          .post(that.$api.zhoubaoideaAdd, {
            zhoubaoid: that.$route.query.wf_docUnid,
            info: that.message
          })
          .then(res => {
            that.$toast({
              message: "提交成功"
            });
            that.message = "";
            that.getDEtail();
          });
      } else {
        this.$toast({
          message: "月记评语不能为空"
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.monthlydetail_container {
  height: 100vh;
  background-color: #ffffff;
}
.monthlydetail_articlePanel {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem 20px 1rem;
  background-color: #ffffff;
  border-bottom: 10px #f6f6f6 solid;
}
.monthlydetail_articleTitle {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #323233;
  text-align: center;
  padding: 15px 0px 0px 0px;
  box-sizing: border-box;
}
.monthlydetail_articleContent {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555555;
  line-height: 26px;
  /* text-align: justify;
  letter-spacing: 0.4px; */
  box-sizing: border-box;
  padding: 10px 0px 0px 0px;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.monthlydetail_articlePhoto {
  box-sizing: border-box;
  padding: 15px 0px 10px 0px;
  display: flex;
  flex-wrap: wrap;
}
.articlePhoto_item {
  width: 3.75rem;
  height: 3.75rem;
  background-color: azure;
  margin: 0px 0.625rem 0.625rem 0px;
}
.articlePhoto {
  width: 100%;
  height: 100%;
}
.monthlydetail_commentPanel {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem;
  background-color: #ffffff;
}
.monthlydetail_commentTitle {
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  text-align: center;
  box-sizing: border-box;
  padding: 10px 0px 0px 0px;
}
.monthlydetail_commentItem {
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 17px 0px;
  display: flex;
  justify-content: flex-start;
}
.monthlydetail_commentPanel .monthlydetail_commentItem:last-child {
  border: none;
}
.comment_headImg {
  min-width: 2.25rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: #eeeeee;
  overflow: hidden;
}
.comment_logo {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
}
.comment_content {
  box-sizing: border-box;
  padding: 0px 0px 0px 0.625rem;
  max-width: 19rem;
}
.comment_title {
  display: flex;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.comment_time {
  box-sizing: border-box;
  padding: 0px 0px 0px 1rem;
}
.comment_text {
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555555;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.monthlydetail_noComment {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bbbbbb;
  text-align: center;
  box-sizing: border-box;
  padding: 20px 0px;
}
.monthlyComment_panel {
  box-sizing: border-box;
  padding: 15px 0px;
}
.monthlyComment_item {
  border: 1px solid #eeeeee;
}
.commentSubmit_panel {
  box-sizing: border-box;
  padding: 0px 0px 30px 0px;
}
.commentSubmit_btn {
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
.dropDownList_box {
  box-sizing: border-box;
  padding: 15px 0px 0px 0px;
}
.dropDownList_container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 36px;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 0px 10px;
}
.dropDownList_title {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dropDownList_triangle {
  position: relative;
  transform: translateY(3px);
  width: 0;
  height: 0;
  border-width: 6px;
  border-style: solid;
  border-color: #dddddd transparent transparent transparent;
}
.dropDownList_itemBox {
  position: absolute;
  left: -1px;
  top: 36px;
  width: 100%;
  height: 185px;
  border: 1px solid #eeeeee;
  border-top-width: 0px;
  background-color: #ffffff;
  z-index: 1;
}
.dropDownList_itemContainer {
  width: 100%;
  height: 155px;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 10px;
  overflow: scroll;
}
.dropDownList_item {
  box-sizing: border-box;
  padding: 10px 0px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555555;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.dropDownList_btnBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
.dropDownList_addBtn,
.dropDownList_ediBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0090d8;
}
.dropDownList_addBtn {
  border-right: 1px solid #eeeeee;
}
.icon_bottomIcon {
  font-size: 0.625rem;
  margin-right: 5px;
}
</style>
<style>
.monthlydetail_container .van-nav-bar {
  background-color: #0090d8;
}
.monthlydetail_container .van-nav-bar__placeholder,
.monthlydetail_container .van-nav-bar__content {
  height: 44px !important;
}
.monthlydetail_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.monthlydetail_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.monthlydetail_container img {
  display: block;
}
</style>
