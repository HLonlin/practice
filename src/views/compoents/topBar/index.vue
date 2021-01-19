<template>
  <div class="topBar_container">
    <van-nav-bar
      :title="titleText"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right v-if="titleText == '消息' || titleText == '公告'">
        <i
          v-if="titleText == '公告' && userData.isTeacher"
          class="iconItem icon_tianjiatubiao icon_record"
          @click="chatRecord"
        ></i>
        <i
          v-if="titleText != '公告'"
          class="iconItem icon_liaotianjilutubiao icon_record"
          @click="chatRecord"
        ></i>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "topBar",
  // 接受父组件的值
  props: {
    titleText: String, //在这里对传过来的进行接收
    rightIcon: Boolean,
    required: true
  },
  data() {
    return {
      userData: Object
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {
      console.log("ClickLeft");
    },
    chatRecord: function() {
      this.$router.push({
        path: "/chatrecordlist"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon_record {
  font-size: 1rem;
  color: #ffffff;
}
</style>
<style>
.topBar_container .van-nav-bar {
  background-color: #0090d8;
}
.topBar_container .van-nav-bar__placeholder,
.topBar_container .van-nav-bar__content {
  height: 44px !important;
}
.topBar_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.topBar_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
