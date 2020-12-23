<template>
  <div class="app-wrapper">
    <!-- <topBar></topBar> -->
    <router-view class="router_container"></router-view>
    <tapList :tapList="tapList"></tapList>
  </div>
</template>

<script>
import topBar from "../../compoents/topBar";
import tapList from "../../compoents/tapList";
export default {
  name: "layout",
  components: {
    topBar,
    tapList
  },
  data() {
    return {
      tapList: [
        {
          pagePath: "/signin",
          iconPath: require("@/assets/images/icon_message.png"),
          selectedIconPath: require("@/assets/images/icon_message_on.png"),
          text: "签到"
        },
        {
          pagePath: "/news",
          iconPath: require("@/assets/images/icon_message.png"),
          selectedIconPath: require("@/assets/images/icon_message_on.png"),
          text: "消息"
        },
        {
          pagePath: "/notice",
          iconPath: require("@/assets/images/icon_message.png"),
          selectedIconPath: require("@/assets/images/icon_message_on.png"),
          text: "公告"
        },
        {
          pagePath: "/mine",
          iconPath: require("@/assets/images/icon_message.png"),
          selectedIconPath: require("@/assets/images/icon_message_on.png"),
          text: "我"
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
  methods: {},
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router_container {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 16px 51px 16px;
}
</style>
