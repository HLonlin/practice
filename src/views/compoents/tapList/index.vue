<template>
  <van-row type="flex" justify="center" class="tapList_container">
    <van-col
      v-for="(item, i) in tapList"
      :span="Math.floor(20 / tapList.length)"
      :key="i"
      class="item_container"
      @click="ontap(i)"
    >
      <router-link :to="{ path: item.pagePath }">
        <div class="item_inner">
          <van-badge
            v-if="item.cornerMarker && item.cornerNum > 0"
            :content="item.cornerNum"
            max="99"
          >
            <div
              class="iconItem"
              :class="ontapIndex == i ? 'ontap ' + item.icon_on : item.icon"
            ></div>
          </van-badge>
          <van-badge
            dot
            v-else-if="item.cornerMarker && item.cornerNum == 'dot'"
          >
            <div
              class="iconItem"
              :class="ontapIndex == i ? 'ontap ' + item.icon_on : item.icon"
            ></div>
          </van-badge>
          <div
            v-else
            class="iconItem"
            :class="ontapIndex == i ? 'ontap ' + item.icon_on : item.icon"
          ></div>
          <div class="item_text" :class="ontapIndex == i ? 'ontap' : ''">
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
    ontapIndex: Number,
    required: true
  },
  data() {
    return {};
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
    ontap(i) {
      // tap是在父组件on监听的方法
      // i是需要传的值
      this.$emit("tap", i);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.iconItem {
  display: inline-block;
  margin-bottom: 4px;
  font-size: 16px;
  color: #999999;
}
.item_text {
  color: #999999;
  text-align: center;
}
.ontap {
  color: #0090d8;
}
</style>
<style>
.item_inner .van-badge--dot {
  top: 4px;
}
</style>
