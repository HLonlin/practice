<template>
  <div class="app-wrapper">
    <topBar :titleText="ontapText"></topBar>
    <router-view class="router_container"></router-view>
    <tapList :tapList="tapList" v-on:tap="tap"></tapList>
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
      ontapText: "",
      tapList: [
        {
          pagePath: "/signin",
          icon: "icon_qiandao",
          icon_on: "icon_qiandao",
          text: "签到",
          cornerMarker: true
        },
        {
          pagePath: "/news",
          icon: "icon_xiaoxi",
          icon_on: "icon_xiaoxi",
          text: "消息",
          cornerMarker: true
        },
        {
          pagePath: "/notice",
          icon: "icon_gonggao",
          icon_on: "icon_gonggao",
          text: "公告",
          cornerMarker: true
        },
        {
          pagePath: "/mine",
          icon: "icon_mine",
          icon_on: "icon_mine",
          text: "我",
          cornerMarker: true
        }
      ]
    };
  },
  beforeCreate() {},
  created() {
    this.$router.push(this.tapList[0].pagePath);
    this.ontapText = this.tapList[0].text;
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    tap: function(value) {
      this.ontapText = value;
    }
  },
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
