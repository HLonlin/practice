<template>
  <div class="applylist_wrapper">
    <van-nav-bar
      title="报名情况"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="list_panel">
      <div
        class="listItem_panel"
        v-for="(item, i) in list"
        :key="i"
        @click="linkTo(item)"
      >
        <div class="headImg_panel">
          <img
            class="headImg_logo"
            :src="
              item.logo ? item.logo : require('@/assets/images/default.png')
            "
          />
        </div>
        <div class="label_panel">
          <div class="label_title">
            <span>{{ item.username }}</span>
          </div>
          <div class="label_signin">
            <span>报名时间：{{ item.WF_Creator }}</span>
          </div>
        </div>
      </div>
      <div class="noMore_panel" v-if="list.length == 0">没有更多了</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "applylist",
  data: function() {
    return {
      list: []
    };
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    getApplyList: function() {
      let that = this;
      that.$axios
        .post(that.$api.recruitApplyList, {
          recruitId: that.$route.query.recruit_Id
        })
        .then(res => {
          console.log(res);
          if (res.data) {
            that.list = res.data;
          }
        });
    },
    linkTo: function(item) {
      this.$router.push({
        path: "/studentInfo",
        query: {
          cardid: JSON.stringify(item.cardid),
          isFrom: JSON.stringify("applylist")
        }
      });
    }
  },
  watch: {},
  computed: {},
  beforeCreate() {},
  created() {
    this.getApplyList();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list_panel {
  box-sizing: border-box;
  padding: 0px 1rem 0px 1rem;
}
.listItem_panel {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 0px;
  border-bottom: 1px solid #eeeeee;
}
.list_panel .listItem_panel:last-child {
  border: none;
}
.listItem_panel::after {
  position: absolute;
  content: "";
  top: 50%;
  right: 0.5rem;
  transform: rotate(45deg) translateY(-50%);
  width: 0.75rem;
  height: 0.75rem;
  border-right: 1px solid#999999;
  border-top: 1px solid #999999;
}
.headImg_panel {
  min-width: 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
}
.headImg_logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
.label_panel {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1.5rem 0px 0.625rem;
}
.label_title {
  width: 90%;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0px 0px 0.5rem 0px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.label_title span {
  box-sizing: border-box;
  padding: 0px 0.9375rem 0px 0px;
}
.label_title span:last-child {
  padding: 0px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  /* color: #666666; */
}
.label_signin {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 0px 0.3125rem 0px;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.label_signin span {
  box-sizing: border-box;
  padding: 0px 0.9375rem 0px 0px;
}
.label_signin span:last-child {
  padding: 0px;
}
.label_phone {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
</style>
<!-- You need to override the style of the frame -->
<style>
.applylist_wrapper .van-nav-bar {
  background-color: #0090d8;
}
.applylist_wrapper .van-nav-bar__placeholder,
.applylist_wrapper .van-nav-bar__content {
  height: 44px !important;
}
.applylist_wrapper .van-nav-bar .van-icon {
  color: #ffffff;
}
.applylist_wrapper .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
