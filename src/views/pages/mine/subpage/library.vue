<template>
  <div class="library_container">
    <van-nav-bar
      title="教学文档库"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="library_plane">
      <router-link
        v-for="(item, i) in itemList"
        :key="i"
        :to="item.toPath"
        class="library_Item"
      >
        <div class="library_label">
          <i class="iconItem icon_label" :class="item.labelIcon"></i>
          {{ item.labelText }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "library",
  data() {
    return {
      itemList: [
        {
          labelText: "教学大纲",
          labelIcon: "icon_jiaoxuedagangtubiao",
          toPath: ""
        },
        {
          labelText: "电子书",
          labelIcon: "icon_dianzishutubiao",
          toPath: ""
        },
        {
          labelText: "教学视频",
          labelIcon: "icon_jiaoxueshipintubiao",
          toPath: ""
        }
      ]
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {
      this.$router.push({
        path: "/mine"
      });
      //   this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.library_container {
  height: 100vh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0px 1rem;
}
.library_Item {
  display: flex;
  align-content: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 15px 0px;
  border-bottom: 1px solid #eeeeee;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.library_Item::after {
  content: "";
  transform: rotate(45deg);
  width: 0.5rem;
  height: 0.5rem;
  border-right: 1px solid #999999;
  border-top: 1px solid #999999;
  align-self: center;
}
.icon_label {
  display: inline-block;
  width: 1.25rem;
  color: #0090d8;
  margin-right: 0.5rem;
}
</style>
<style>
.library_container .van-nav-bar {
  background-color: #0090d8;
}
.library_container .van-nav-bar__placeholder,
.library_container .van-nav-bar__content {
  height: 44px !important;
}
.library_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.library_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
