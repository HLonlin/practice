<template>
  <div class="todolist_container">
    <div class="topbar_panel">
      <van-nav-bar
        :title="title[type]"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
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
          <div class="label_title">{{ item.username }}</div>
          <div class="label_signin" v-show="type == 'absenteeism'">
            <span>最近签到：{{ item.lastTime }}</span>
            <span>缺勤次数：{{ item.noSignNum }}</span>
          </div>
          <div class="label_signin" v-show="type == 'noContact'">
            <span>学号：{{ item.cardid }}</span>
          </div>
          <div class="label_signin" v-show="type == 'audit'">
            <span>学号：{{ item.cardid }}</span>
            <span>签到次数：{{ item.qiandaocishu }}</span>
          </div>
          <div class="label_phone">
            电话:
            <span style="color:#0090d8;">{{ item.phone }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todolist",
  data() {
    return {
      type: "",
      title: {
        absenteeism: "缺勤名单",
        noContact: "未联系名单",
        audit: "待审核名单"
      },
      list: []
    };
  },
  beforeCreate() {},
  created() {
    this.type = this.$route.query.type;
    this.getList();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    // 加载缺勤名单
    getList: function() {
      let that = this;
      switch (that.type) {
        case "absenteeism":
          that.$axios.post(that.$api.absenteeismList, {}).then(res => {
            that.list = res.data;
            for (let i = 0, imax = res.data.length; i < imax; i++) {
              that.$set(
                that.list[i],
                "lastTime",
                res.data[i].lastSignDate.split(" ")[0]
              );
            }
          });
          break;
        case "noContact":
          that.$axios.post(that.$api.noContactList, {}).then(res => {
            that.list = res.data;
          });
          break;
        case "audit":
          that.$axios.post(that.$api.auditList, {}).then(res => {
            that.list = res.data;
          });
          break;
      }
    },
    linkTo: function(item) {
      switch (this.type) {
        case "absenteeism":
          break;
        case "noContact":
          let chatWith = {
            username: item.username,
            logo: item.logo,
            userid: item.cardid
          };
          this.$router.push({
            path: "/chatroom",
            query: { chatWith: JSON.stringify(chatWith) }
          });
          break;
        case "audit":
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list_panel {
  box-sizing: border-box;
  padding: 0px 1rem 20px 1rem;
}
.listItem_panel {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 0px;
  border-bottom: 1px solid #eeeeee;
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
  box-sizing: border-box;
  padding: 0px 0px 0px 0.625rem;
}
.label_title {
  box-sizing: border-box;
  padding: 0px 0px 0.5rem 0px;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323233;
}
.label_signin {
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
<style>
.todolist_container .van-nav-bar {
  background-color: #0090d8;
}
.todolist_container .van-nav-bar__placeholder,
.todolist_container .van-nav-bar__content {
  height: 44px !important;
}
.todolist_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.todolist_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
