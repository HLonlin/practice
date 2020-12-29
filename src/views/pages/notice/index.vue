<template>
  <div class="container">
    <div class="search_panel">
      <search sourceOf="notice"></search>
    </div>
    <div class="noticeList_panel">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div
          class="notice_Item"
          v-for="(item, i) in topList"
          :key="i"
          :title="item.title"
        >
          <div
            class="notice_title"
            :class="{
              notice_titleBold: item.important,
              notice_titleTop: item.intop
            }"
          >
            <i
              class="iconItem icon_zhidingtubiao icon_intop"
              v-if="item.intop"
            ></i>
            {{ item.title }}
          </div>
          <div class="notice_label">发起人：{{ item.label }}</div>
          <div class="notice_date">{{ item.date }}</div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="notice_Item"
            v-for="(item, i) in list"
            :key="i"
            :title="item.title"
          >
            <div
              class="notice_title"
              :class="{
                notice_titleBold: item.important,
                notice_titleTop: item.intop
              }"
            >
              <i
                class="iconItem icon_zhidingtubiao icon_intop"
                v-if="item.intop"
              ></i>
              {{ item.title }}
            </div>
            <div class="notice_label">发起人：{{ item.label }}</div>
            <div class="notice_date">{{ item.date }}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import search from "../../compoents/search";
export default {
  name: "notice",
  components: {
    search
  },
  data() {
    return {
      topList: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false
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
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        for (let i = 0; i < 10; i++) {
          if (i < 3) {
            this.topList.push({
              title:
                "防诈骗：花1万培训，动动嘴就轻松月入过万？！防诈骗：花1万培训，动动嘴就轻松月入过万？！",
              label: "王永润",
              date: "12月1日 19:18",
              intop: i < 3 ? true : false,
              important: i % 2 == 0 ? false : true
            });
          } else {
            this.list.push({
              title:
                "防诈骗：花1万培训，动动嘴就轻松月入过万？！防诈骗：花1万培训，动动嘴就轻松月入过万？！",
              label: "王永润",
              date: "12月1日 19:18",
              intop: i < 3 ? true : false,
              important: i % 2 == 0 ? false : true
            });
          }
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noticeList_panel {
  box-sizing: border-box;
  padding: 0px 1rem;
}
.notice_Item {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eeeeee;
  color: #666666;
  box-sizing: border-box;
  padding: 12px 0px;
}
.notice_title {
  height: 1.5625rem;
  line-height: 0.9375rem;
  font-size: 0.9375rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  box-sizing: border-box;
  padding-bottom: 10px;
}
.notice_titleTop {
  color: #333333;
}
.notice_titleBold {
  font-weight: bold;
  color: #333333;
}
.notice_label,
.notice_date {
  height: 0.75rem;
  display: inline-block;
  line-height: 0.75rem;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.notice_label {
  display: inline-block;
}
.notice_date {
  float: right;
}
.icon_intop {
  color: #ff373a;
  font-weight: 400;
}
</style>
