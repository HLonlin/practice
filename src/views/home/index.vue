<template>
  <div class="app-wrapper">
    <topBar :titleText="toptitle"></topBar>
    <router-view
      class="router_container"
      v-on:checkAllRead="checkAllRead"
    ></router-view>
    <tapList v-on:tap="tap" :noticeReadAll="noticeReadAll"></tapList>
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
      toptitle: "实习小匠",
      noticeReadAll: false
    };
  },
  beforeCreate() {},
  created() {
    this.toptitle = this.$router.currentRoute.meta.title;
    // this.updateCorner();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    tap: function(val) {
      this.toptitle = val;
    },
    checkAllRead: function(val) {
      this.noticeReadAll = val;
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
