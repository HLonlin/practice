<template>
  <div class="studentList_container">
    <div class="topbar_panel">
      <van-nav-bar
        :title="!searchkeywords ? banji : '学生列表'"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="StatisticsBar_panel" v-if="!searchkeywords">
      <div>班实习率：{{ totalNum }}%</div>
      <div>
        {{ banzhuren }}：<span style="color:#0090d8;">{{ phone }}</span>
      </div>
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
          <div class="label_title">
            <span>{{ item.username ? item.username : item.userName }}</span>
            <span v-if="!searchkeywords"
              >健康状况：
              <span
                :style="{
                  color:
                    item.jiankangstatus == '健康'
                      ? '#00C110'
                      : item.jiankangstatus == '异常'
                      ? '#FF2A2A'
                      : '#666666'
                }"
              >
                <span v-show="item.jiankangstatus">
                  {{ item.jiankangstatus ? item.jiankangstatus : "未上报" }}
                </span>
              </span>
            </span>
          </div>
          <div class="label_signin">
            <span>签到次数：{{ item.qiandaocishu }}</span>
            <span v-if="!searchkeywords">连续未签：{{ item.noSignNum }}</span>
          </div>
          <div class="label_phone">
            电话:
            <span style="color:#0090d8;" @click.stop="call(i)">
              {{ item.phone }}
              <a href="" v-show="false" ref="tels"></a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="noMore_panel" v-if="list.length == 0">
      没有更多了
    </div>
  </div>
</template>

<script>
export default {
  name: "studentList",
  data() {
    return {
      banji: "",
      searchkeywords: "",
      totalNum: "100",
      list: [],
      banzhuren: "",
      phone: ""
    };
  },
  beforeCreate() {},
  created() {
    this.searchkeywords = this.$route.query.searchkeywords
      ? JSON.parse(this.$route.query.searchkeywords)
      : false;
    if (!this.searchkeywords) {
      this.banji = JSON.parse(this.$route.query.banji);
      this.getCountClass(this.banji);
    } else {
      this.getstudentList(this.searchkeywords);
    }
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
    getstudentList: function(searchkeywords) {
      let that = this;
      that.$axios
        .post(that.$api.getUserListByName, { username: searchkeywords })
        .then(res => {
          that.list = res.data;
        });
    },
    getCountClass: function(banji) {
      let that = this;
      that.$axios
        .post(that.$api.getUserListByBanji, {
          banji: banji
        })
        .then(res => {
          that.phone = res.data.phone;
          that.banzhuren = res.data.banzhuren;
          that.totalNum = res.data.shixiNum;
          that.list = res.data.dataList;
        });
    },
    linkTo: function(item) {
      this.$router.push({
        path: "/studentInfo",
        query: {
          cardid: JSON.stringify(item.cardid),
          isFrom: JSON.stringify("studentList")
        }
      });
    },
    call: function(index) {
      this.$refs.tels[index].href = "tel://" + this.list[index].phone;
      this.$refs.tels[index].click();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.StatisticsBar_panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  font-size: 1rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #323233;
  border-bottom: 10px #f6f6f6 solid;
  box-sizing: border-box;
  padding: 15px 1rem;
}
.noMore_panel {
  box-sizing: border-box;
  padding: 20px 0px;
  text-align: center;
  font-size: 0.875rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bbbbbb;
}
.list_panel {
  box-sizing: border-box;
  padding: 0px 1rem 30px 1rem;
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
.studentList_container .van-nav-bar {
  background-color: #0090d8;
}
.studentList_container .van-nav-bar__placeholder,
.studentList_container .van-nav-bar__content {
  height: 44px !important;
}
.studentList_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.studentList_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
