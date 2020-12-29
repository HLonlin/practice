<template>
  <div class="app-wrapper">
    <topBar :titleText="ontapText"></topBar>
    <router-view
      class="router_container"
      v-on:checkAllRead="checkAllRead"
    ></router-view>
    <tapList
      :tapList="tapList"
      :ontapIndex="ontapIndex"
      v-on:tap="tap"
    ></tapList>
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
      ontapIndex: 2,
      tapList: [
        {
          pagePath: "/signin",
          icon: "icon_qiandaotubiao",
          icon_on: "icon_qiandaotubiao",
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
    this.$router.push(this.tapList[this.ontapIndex].pagePath);
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    tap: function(value) {
      this.ontapIndex = value;
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
  },
  computed: {
    ontapText: function() {
      // 顶部标题文字内容
      return this.tapList[this.ontapIndex].text;
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
