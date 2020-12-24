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
          cornerMarker: false,
          cornerNum: 0
        },
        {
          pagePath: "/news",
          icon: "icon_xiaoxi",
          icon_on: "icon_xiaoxi",
          text: "消息",
          cornerMarker: true,
          cornerNum: 0
        },
        {
          pagePath: "/notice",
          icon: "icon_gonggao",
          icon_on: "icon_gonggao",
          text: "公告",
          cornerMarker: false,
          cornerNum: 0
        },
        {
          pagePath: "/mine",
          icon: "icon_mine",
          icon_on: "icon_mine",
          text: "我",
          cornerMarker: false,
          cornerNum: 0
        }
      ]
    };
  },
  beforeCreate() {},
  created() {
    this.updateCornerNum();
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
    },
    updateCornerNum: function() {
      var that = this;
      function commitCornerNum(i) {
        let num = 0;
        setInterval(function() {
          num = num + 1;
          let stateStr =
            that.tapList[i].pagePath.replace(/\//g, "") + "/addState";
          that.$store.commit(stateStr, {
            key: "cornerNum",
            val: num
          });
          that.tapList[i].cornerNum =
            that.$store.state[
              that.tapList[i].pagePath.replace(/\//g, "")
            ].cornerNum;
        }, 200);
      }
      for (var i = 0, imax = that.tapList.length; i < imax; i++) {
        if (that.tapList[i].cornerMarker) {
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
