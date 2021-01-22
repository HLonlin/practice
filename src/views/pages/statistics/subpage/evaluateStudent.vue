<template>
  <div class="evaluateStudent_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="学生月度操行评定"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topBar_panel">
      <div class="headImg_panel">
        <img
          class="headImg_logo"
          :src="logo ? logo : require('@/assets/images/default.png')"
        />
      </div>
      <div class="topLabel_panel">
        <div class="topName_panel">{{ name }}</div>
        <div class="topTime_panel">2020年12月</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "evaluateStudent",
  data() {
    return {
      name: "",
      logo: ""
    };
  },
  beforeCreate() {},
  created() {
    this.logo = JSON.parse(this.$route.query.logo);
    this.name = JSON.parse(this.$route.query.name);
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topBar_panel {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 1rem;
  border-bottom: 10px solid #f6f6f6;
}
.headImg_panel {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
}
.headImg_logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
.topLabel_panel {
  box-sizing: border-box;
  padding: 0px 0px 0px 0.75rem;
}
.topName_panel,
.topTime_panel {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
}
.topName_panel {
  box-sizing: border-box;
  padding: 0px 0px 10px 0px;
}
</style>
<style>
.evaluateStudent_container .van-nav-bar {
  background-color: #0090d8;
}
.evaluateStudent_container .van-nav-bar__placeholder,
.evaluateStudent_container .van-nav-bar__content {
  height: 44px !important;
}
.evaluateStudent_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.evaluateStudent_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
