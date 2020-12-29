<template>
  <div class="app-wrapper">
    <topBar :titleText="toptitle"></topBar>
    <router-view
      class="router_container"
      v-on:checkAllRead="checkAllRead"
    ></router-view>
    <tapList :tapList="tapList" :ontapIndex="tapIndex" v-on:tap="tap"></tapList>
  </div>
</template>

<script>
import topBar from "../compoents/topBar";
import tapList from "../compoents/tapList";
export default {
  name: "layout",
  components: {
    topBar,
    tapList
  },
  data() {
    return {
      tapIndex: 0,
      toptitle: "实习小匠",
      tapList: [
        {
          pagePath: "/signin",
          icon: "icon_biaoqianlanqiandaotubiao",
          icon_on: "icon_biaoqianlanqiandaotubiao",
          text: "签到",
          cornerMarker: false,
          cornerNum: 0
        },
        {
          pagePath: "/news",
          icon: "icon_xiaoxitubiao",
          icon_on: "icon_xiaoxitubiao",
          text: "消息",
          cornerMarker: true,
          cornerNum: 0
        },
        {
          pagePath: "/notice",
          icon: "icon_gonggaotubiao",
          icon_on: "icon_gonggaotubiao",
          text: "公告",
          cornerMarker: false,
          cornerNum: "dot"
        },
        {
          pagePath: "/mine",
          icon: "icon_wotubiao",
          icon_on: "icon_wotubiao",
          text: "我",
          cornerMarker: false,
          cornerNum: 0
        }
      ]
    };
  },
  beforeCreate() {},
  created() {
    // this.updateCorner();
    this.tapIndex = this.$route.meta.tapIndex;
    this.toptitle = this.$route.meta.title;
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    tap: function(value) {
      this.toptitle = this.$route.meta.title;
      this.tapIndex = value;
    },
    checkAllRead: function(value) {
      this.tapList[2].cornerMarker = value;
    },
    updateCorner: function() {
      var that = this;
      function commitCornerNum(i) {
        let num = 0;
        setInterval(function() {
          num = num + 1;
          that.tapList[i].cornerNum = num;
        }, 200);
      }
      for (var i = 0, imax = that.tapList.length; i < imax; i++) {
        if (
          that.tapList[i].cornerMarker &&
          that.tapList[i].cornerNum != "dot"
        ) {
          commitCornerNum(i);
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router_container {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 0px 51px 0px;
}
</style>
