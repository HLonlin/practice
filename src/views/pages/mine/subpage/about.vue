<template>
  <div class="about_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="关于"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="about_list">
      <a
        v-for="(item, i) in aboutList"
        :key="i"
        class="about_item"
        :class="{ lastOne: i == aboutList.length - 1 }"
        :href="item.value"
      >
        <img
          class="about_logo"
          src="../../../../assets/images/icon.png"
          alt=""
        />
        <div class="about_text">{{ item.text }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      aboutList: []
    };
  },
  beforeCreate() {},
  created() {
    this.getAboutList();
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
    },
    // 加载关于菜单列表
    getAboutList: function() {
      let that = this;
      that.$axios.post(that.$api.about, {}).then(res => {
        let data = res.data;
        for (let i = 0, imax = res.data.length; i < imax; i++) {
          that.$set(that.aboutList, i, data[i]);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about_list {
  box-sizing: border-box;
  padding: 0px 1rem;
}
.about_item {
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  padding: 18px 0px;
  border-bottom: 1px solid #eeeeee;
}
.lastOne {
  border: none;
}
.about_logo {
  width: 1.25rem;
  height: 1.25rem;
}
.about_text {
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0090d8;
  box-sizing: border-box;
  padding: 0px 0px 0px 0.625rem;
}
</style>
<style>
.about_container .van-nav-bar {
  background-color: #0090d8;
}
.about_container .van-nav-bar__placeholder,
.about_container .van-nav-bar__content {
  height: 44px !important;
}
.about_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.about_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
