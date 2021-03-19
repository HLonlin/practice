<template>
  <div class="commonwords_container">
    <div class="topbar_panel">
      <van-nav-bar
        :title="title[type]"
        :fixed="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        :right-text="rightText[type]"
        @click-left="onClickLeft"
        @click-right="handler(handleType[type])"
      >
      </van-nav-bar>
    </div>
    <div class="popup_add popup_panel" v-if="type == 0">
      <van-field
        class="textarea_panel"
        v-model="addText"
        :autosize="{ maxHeight: containerH, minHeight: containerH }"
        type="textarea"
        placeholder="请输入您想要添加的常用语。"
        maxlength="100"
      />
    </div>
    <div class="popup_edit popup_panel" v-if="type == 1">
      <van-field
        class="textarea_panel"
        v-model="editItem.text"
        :autosize="{ maxHeight: containerH, minHeight: containerH }"
        type="textarea"
        placeholder="常用语不能为空"
        maxlength="100"
      />
    </div>
    <div class="popup_manage popup_panel" v-if="type == 2">
      <div class="manageList_panel" :style="{ height: listH }">
        <div class="listItem_panel" v-for="(item, i) in list" :key="i">
          <div class="listItem_label" v-html="item.content"></div>
          <div class="handleBtn_panel">
            <div
              class="listItem_handleBtn"
              @click="
                (type = 1),
                  (from = 'manage'),
                  (editItem.text = item.content),
                  (editItem.id = item.wf_docUnid)
              "
            >
              <i class="iconItem icon_bianjitubiao icon_handleBtn"></i> 编辑
            </div>
            <div
              class="listItem_handleBtn"
              @click="handler('del'), (editItem.id = item.wf_docUnid)"
            >
              <i class="iconItem icon_shanchutubiao icon_handleBtn"></i> 删除
            </div>
          </div>
        </div>
      </div>
      <div class="bottomBtn_panel">
        <div class="bottom_btn" @click="(type = 0), (from = 'manage')">
          添加常用语
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonwords",
  data() {
    return {
      type: Number,
      title: ["添加常用语", "编辑常用语", "管理常用语"],
      rightText: ["完成", "完成", ""],
      handleType: ["add", "edit", ""],
      addText: "",
      editItem: {
        text: "",
        id: ""
      },
      editText: "",
      list: [],
      from: "",
      userData: Object,
      comeFrom: ""
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    this.type = Number(this.$route.query.type);
    this.comeFrom = this.$route.query.comeFrom;
    if (this.type == 0) {
      this.from = "add";
    }
    this.getList();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {
      if (this.from) {
        this.backToManage();
      } else {
        this.$router.go(-1);
      }
    },
    backToManage: function() {
      let that = this;
      let from = arguments[0] ? arguments[0] : "";
      if (from) {
        switch (that.type) {
          // 添加面板完成操作
          case 0:
            if (that.from) {
              back();
            } else {
              that.$router.go(-1);
            }
            that.$toast.success("添加成功");
            break;
          // 编辑面板完成操作
          case 1:
            let editApi = that.userData.isTeacher
              ? that.$api.remarkEdit_teacher
              : that.$api.remarkEdit;
            if (that.comeFrom === "monthlydetail") {
              editApi = that.$api.zhoubaoRemarkEdit;
            }
            that.editItem.text = that.editItem.text.trim();
            if (that.editItem.text) {
              that.$axios
                .post(editApi, {
                  wf_docUnid: that.editItem.id,
                  content: that.editItem.text
                })
                .then(res => {
                  back();
                });
            } else {
              that.$toast({
                message: "常用语不能为空"
              });
            }

            break;
        }
        return;
      }
      switch (that.type) {
        // 添加面板返回操作
        case 0:
          if (that.addText) {
            that.$dialog.confirm({
              title: "温馨提示",
              message: "内容尚未保存，确定放弃？",
              beforeClose
            });
          } else {
            back();
          }
          break;
        // 编辑面板返回操作
        case 1:
          that.$dialog.confirm({
            title: "温馨提示",
            message: "内容尚未保存，确定放弃？",
            beforeClose
          });
          break;
      }
      function beforeClose(action, done) {
        if (action === "confirm") {
          done();
          back();
        } else {
          done();
        }
      }
      function back() {
        if (that.from == "add") {
          that.$router.go(-1);
        } else {
          that.type = 2;
          that.from = "";
          that.addText = "";
          that.getList();
        }
      }
    },
    // 添加常用语
    handler: function(type) {
      let that = this;
      that.addText = that.addText.trim();
      that.editText = that.editText.trim();
      switch (type) {
        case "add":
          let addApi = that.userData.isTeacher
            ? that.$api.remarkAdd_teacher
            : that.$api.remarkAdd;
          if (that.comeFrom === "monthlydetail") {
            addApi = that.$api.zhoubaoRemarkAdd;
          }
          if (that.addText) {
            that.$axios.post(addApi, { content: that.addText }).then(res => {
              if (that.from) {
                that.backToManage("end");
              } else {
                that.$router.go(-1);
              }
            });
          } else {
            that.$toast({
              message: "常用语不能为空"
            });
          }
          break;
        case "edit":
          that.backToManage("end");
          break;
        case "del":
          that.$dialog.confirm({
            title: "温馨提示",
            message: "您确定要删除此常用语吗？",
            beforeClose: (action, done) => {
              let delApi = that.userData.isTeacher
                ? that.$api.remarkDelete_teacher
                : that.$api.remarkDelete;
              if (that.comeFrom === "monthlydetail") {
                delApi = that.$api.zhoubaoRemarkDelete;
              }
              if (action === "confirm") {
                done();
                that.$axios
                  .post(delApi, {
                    wf_docUnid: that.editItem.id
                  })
                  .then(res => {
                    that.getList();
                  });
              } else {
                done();
              }
            }
          });
          break;
      }
    },
    getList: function() {
      let that = this;
      that.list = [];
      if (that.type != 2) return;
      let listApi = that.userData.isTeacher
        ? that.$api.remarkList_teacher
        : that.$api.remarkList;
      if (that.comeFrom === "monthlydetail") {
        listApi = that.$api.zhoubaoRemarkList;
      }
      that.$axios.post(listApi, {}).then(res => {
        for (let i = 0, imax = res.data.length; i < imax; i++) {
          that.$set(that.list, i, res.data[i]);
        }
      });
    }
  },
  computed: {
    containerH: function() {
      return document.documentElement.clientHeight - 80;
    },
    listH: function() {
      return this.containerH - 36 + "px";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.popup_panel {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 44px 1rem 20px 1rem;
}
.textarea_panel {
  padding: 15px 0px 20px 0px;
}
.manageList_panel {
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.manageList_panel::-webkit-scrollbar {
  width: 0 !important;
}
.listItem_panel {
  border-bottom: 1px solid #eeeeee;
}
.listItem_label {
  box-sizing: border-box;
  padding: 15px 0px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.handleBtn_panel {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.listItem_handleBtn {
  box-sizing: border-box;
  padding: 0px 0px 10px 1.25rem;
}
.icon_handleBtn {
  font-size: 0.625rem;
  margin: 0px 0.1875rem 0px 0px;
}
.bottomBtn_panel {
  align-self: flex-end;
  bottom: 0px;
  width: 100%;
  padding: 20px 0px 0px 0px;
  box-sizing: border-box;
}
.bottom_btn {
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
.commonwords_container .van-nav-bar {
  background-color: #0090d8;
}
.commonwords_container .van-nav-bar__placeholder,
.commonwords_container .van-nav-bar__content {
  height: 44px !important;
}
.commonwords_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.commonwords_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
.commonwords_container .van-nav-bar__text {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
