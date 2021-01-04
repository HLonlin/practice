<template>
  <div class="tapList_container">
    <van-tabbar
      v-model="tabbar.active"
      route
      :placeholder="true"
      :safe-area-inset-bottom="true"
      :active-color="tabbar.activeColor"
      :inactive-color="tabbar.inactiveColor"
    >
      <van-tabbar-item
        v-for="(item, i) in tabbar.list"
        :key="i"
        :to="item.routerTo"
        :dot="item.dot"
        :badge="item.badge"
        @click="ontap(i)"
      >
        <span>{{ item.text }}</span>
        <template #icon="props">
          <i class="iconItem" :class="[{ ontap: props.active }, item.icon]"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tapList",
  // 接受父组件的值
  props: {
    noticeReadAll: Boolean,
    required: true
  },
  data() {
    return {
      tabbar: {
        list: [
          {
            text: "签到",
            routerTo: "/signin",
            icon: "icon_biaoqianlanqiandaotubiao",
            dot: false
          },
          {
            text: "消息",
            routerTo: "/news",
            icon: "icon_xiaoxitubiao",
            dot: false,
            badge: "99+"
          },
          {
            text: "公告",
            routerTo: "/notice",
            icon: "icon_gonggaotubiao",
            dot: false
          },
          { text: "我", routerTo: "/mine", icon: "icon_wotubiao", dot: false }
        ],
        active: 0,
        activeColor: "#0090d8",
        inactiveColor: "#999999"
      }
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
    ontap(i) {
      // tap是在父组件on监听的方法
      // i是需要传的值
      this.$emit("tap", this.tabbar.list[this.tabbar.active].text);
    }
  },
  watch: {
    noticeReadAll: {
      handler(val, oldVal) {
        this.tabbar.list[2].dot = val;
      },
      deep: true //true 深度监听
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
</style>
