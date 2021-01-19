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
        :badge="item.badge ? item.badge : ''"
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
  props: {},
  data() {
    return {
      userData: Object,
      tabbar: {
        list: [
          {
            text: "签到",
            routerTo: "/signin",
            icon: "icon_biaoqianlanqiandaotubiao"
          },
          {
            text: "消息",
            routerTo: "/news",
            icon: "icon_xiaoxitubiao",
            badge: ""
          },
          {
            text: "公告",
            routerTo: "/notice",
            icon: "icon_gonggaotubiao"
          },
          { text: "我", routerTo: "/mine", icon: "icon_wotubiao" }
        ],
        active: 0,
        activeColor: "#0090d8",
        inactiveColor: "#999999"
      }
    };
  },
  beforeCreate() {},
  created() {
    let userData = this.$tool.getLocal("userData");
    if (userData) {
      this.userData = userData;
    }
    // this.updateMsgList();
  },
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
    },
    // 加载消息列表
    getMsgList: function() {
      let that = this;
      let badge = 0;
      that.$axios.post(that.$api.msgList, {}).then(res => {
        let data = res.data;
        for (let i = 0, imax = data.length; i < imax; i++) {
          badge = badge + data[i].unreadNum;
          if (badge != that.tabbar.list[1].badge) {
            that.tabbar.list[1].badge = badge;
          }
          let month =
            (new Date(res.data[i].wf_Created).getMonth() + 1 < 10
              ? "0" + (new Date(res.data[i].wf_Created).getMonth() + 1)
              : new Date(res.data[i].wf_Created).getMonth() + 1) + "月";
          let dates =
            (new Date(res.data[i].wf_Created).getDate() < 10
              ? "0" + new Date(res.data[i].wf_Created).getDate()
              : new Date(res.data[i].wf_Created).getDate()) + "日 ";
          let time = month + dates;
          data[i]["time"] = time;
        }
        that.$store.commit("news/addState", {
          key: "msgList",
          val: data
        });
      });
    },
    updateMsgList: function() {
      let that = this;
      clearInterval(timer);
      let timer = setInterval(function() {
        that.getMsgList();
      }, 1000);
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
