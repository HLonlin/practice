<template>
  <van-row type="flex" justify="center" class="tapList_container">
    <van-col
      v-for="(item, i) in tapList"
      :span="Math.floor(20 / tapList.length)"
      :key="i"
      class="item_container"
      @click="ontap(item.text)"
    >
      <router-link :to="{ path: item.pagePath }">
        <div class="item_inner">
          <van-badge
            v-if="item.cornerMarker & (item.cornerNum > 0)"
            :content="item.cornerNum"
            max="99"
          >
            <div
              class="iconItem"
              :class="
                ontapText == item.text ? 'ontap ' + item.icon_on : item.icon
              "
            ></div>
          </van-badge>
          <div
            v-else
            class="iconItem"
            :class="
              ontapText == item.text ? 'ontap ' + item.icon_on : item.icon
            "
          ></div>
          <div class="item_text" :class="ontapText == item.text ? 'ontap' : ''">
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
      ontapText: ""
    };
  },
  beforeCreate() {},
  created() {
    this.ontapText = this.tapList[0].text;
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    ontap(text) {
      // tap是在父组件on监听的方法
      // this.ontapText是需要传的值
      this.ontapText = text;
      this.$emit("tap", this.ontapText);
    }
  }
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
.iconItem {
  display: inline-block;
  margin-bottom: 4px;
  font-size: 16px;
  color: #9d9d99;
}
.item_text {
  color: #9d9d99;
  text-align: center;
}
.ontap {
  color: #0090d7;
  // font-weight: bold;
}
</style>
