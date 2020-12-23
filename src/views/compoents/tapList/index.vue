<template>
  <van-row type="flex" justify="center" class="tapList_container">
    <van-col
      v-for="(item, i) in tapList"
      :span="Math.floor(20 / tapList.length)"
      :key="i"
      class="item_container"
      @click="ontapIndex = i"
    >
      <router-link :to="{ path: item.pagePath }">
        <div class="item_inner">
          <img
            v-if="ontapIndex == i"
            class="item_icon item_icon_on"
            :src="item.selectedIconPath"
          />
          <img v-else class="item_icon" :src="item.iconPath" />
          <div
            :class="ontapIndex == i ? 'item_text item_text_on' : 'item_text'"
          >
            {{ item.text }}
          </div>
        </div>
      </router-link>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: "tapList",
  // 接受父组件的值
  props: {
    tapList: Array, //在这里对传过来的进行接收
    required: true
  },
  data() {
    return {
      ontapIndex: 0
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
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tapList_container {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  border-top: 1px solid #eeeeee;
}
.item_container {
  position: relative;
  text-align: center;
  height: 100%;
}
.item_inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.item_icon {
  width: 15px;
  margin-bottom: 4px;
}
.item_text {
  color: #999999;
  text-align: center;
}
.item_text_on {
  color: #0090d7;
}
</style>
