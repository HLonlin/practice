<template>
  <div class="todolist_container">
    <div class="topbar_panel">
      <div v-if="type == 'evaluate' ? true : false">
        <van-nav-bar
          :title="title[type]"
          :fixed="true"
          :placeholder="true"
          :safe-area-inset-top="true"
          :border="false"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
          :right-text="multiState ? '取消' : '批量管理'"
        />
      </div>
      <div v-else>
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
    </div>
    <div
      class="list_panel topList_panel"
      v-show="type == 'absenteeism'"
      v-if="!noMore"
    >
      <div
        class="listItem_panel"
        v-for="(item, i) in topList"
        :key="i"
        @click="linkTo(item, i)"
        :class="{ isToday: item.isToday }"
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
          <div class="label_signin">
            <span>最近签到：{{ item.lastTime }}</span>
            <span
              :class="{
                font_red: item.noSignNum > 3,
                font_yellow: item.noSignNum >= 2
              }"
              >缺勤次数：{{ item.noSignNum }}</span
            >
          </div>
          <div class="label_phone">
            电话:
            <span style="color:#0090d8;">{{ item.phone }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list_panel" v-if="!noMore" :class="{ onMulti: multiState }">
      <div
        class="listItem_panel"
        v-for="(item, i) in list"
        :key="i"
        @click="linkTo(item, i)"
        :class="{ isToday: item.isToday, isChecked: item.checked }"
      >
        <div class="evaluateStatus" v-show="type == 'evaluate'">
          {{ item.status }}
        </div>
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
          <div class="label_signin" v-show="type == 'evaluate'">
            <span>学号：{{ item.cardid }}</span>
          </div>
          <div class="label_phone">
            电话:
            <span style="color:#0090d8;">{{ item.phone }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="noMore_panel" v-else>
      没有更多了
    </div>
    <div class="floatBar" v-if="multiState">
      <div class="btn_allChecked" @click="onAllChecked">全选</div>
      <div class="btn_allChecked" @click="offAllChecked">取消全选</div>
      <div class="btn_evaluate" @click="batchEvaluate">评定</div>
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
        audit: "待审核名单",
        evaluate: "学生月度操行评定"
      },
      list: [],
      topList: [],
      noMore: false,
      multiState: false
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
    onClickRight: function() {
      let that = this;
      this.multiState = !this.multiState;
      for (let i = 0, imax = that.list.length; i < imax; i++) {
        that.$set(that.list[i], "checked", false);
      }
    },
    // 加载缺勤名单
    getList: function() {
      let that = this;
      switch (that.type) {
        case "absenteeism":
          that.$axios.post(that.$api.absenteeismList, {}).then(res => {
            for (let i = 0, imax = res.data.length; i < imax; i++) {
              res.data[i]["lastTime"] = res.data[i].lastSignDate.split(" ")[0];
              res.data.length == 0
                ? (that.noMore = true)
                : (that.noMore = false);
              if (res.data[i].isToday) {
                that.topList.push(res.data[i]);
              } else {
                that.list.push(res.data[i]);
              }
            }
          });
          break;
        case "noContact":
          that.$axios.post(that.$api.noContactList, {}).then(res => {
            res.data.length == 0 ? (that.noMore = true) : (that.noMore = false);
            that.list = res.data;
          });
          break;
        case "audit":
          that.$axios.post(that.$api.auditList, {}).then(res => {
            res.data.length == 0 ? (that.noMore = true) : (that.noMore = false);
            that.list = res.data;
          });
          break;
        case "evaluate":
          let date = new Date();
          let month =
            date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1;
          that.$axios
            .post(that.$api.getEvaluateList, {
              year: date.getFullYear(),
              month: month
            })
            .then(res => {
              that.list = res.data;
            });
          break;
      }
    },
    linkTo: function(item, i) {
      if (this.multiState) {
        if (item.status == "已评定") {
          this.$toast({
            message: "该学生已评定，无需再操作"
          });
          return;
        }
        item.checked = !item.checked;
      } else {
        switch (this.type) {
          case "absenteeism":
            this.$router.push({
              path: "/studentInfo",
              query: {
                cardid: JSON.stringify(item.cardid),
                isFrom: JSON.stringify("todolist")
              }
            });
            break;
          case "noContact":
            let query = {
              chatWith: JSON.stringify(item.cardid ? item.cardid : item.userid)
            };
            this.$router.push({
              path: "/chatroom",
              query: query
            });
            break;
          case "audit":
            this.$router.push({
              path: "/auditstudent",
              query: { wf_docunid: JSON.stringify(item.wf_docunid) }
            });
            break;
          case "evaluate":
            let data = {
              cardid: item.cardid,
              logo: item.logo,
              name: item.username
            };
            if (item.status == "已评定") {
              data.finish = true;
            } else {
              data.finish = false;
            }
            this.$router.push({
              path: "/evaluateStudent",
              query: { data: JSON.stringify(data) }
            });
            break;
        }
      }
    },
    onAllChecked: function() {
      let that = this;
      for (let i = 0, imax = that.list.length; i < imax; i++) {
        if (that.list[i].status != "已评定") {
          that.$set(that.list[i], "checked", true);
        }
      }
    },
    offAllChecked: function() {
      let that = this;
      for (let i = 0, imax = that.list.length; i < imax; i++) {
        that.$set(that.list[i], "checked", false);
      }
    },
    batchEvaluate: function() {
      let that = this;
      let cardids = [];
      for (let i = 0, imax = that.list.length; i < imax; i++) {
        if (that.list[i].checked) {
          cardids.push(that.list[i].cardid);
        }
      }
      let data = {
        cardid: cardids
      };
      that.$router.push({
        path: "/evaluateStudent",
        query: { data: JSON.stringify(data) }
      });
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
.topList_panel {
  padding: 0px 1rem 0px 1rem;
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
.listItem_panel {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 0px;
  border-bottom: 1px solid #eeeeee;
}
.isChecked::before {
  content: "";
  height: 1rem;
  width: 1rem;
  background-image: linear-gradient(
    to bottom right,
    #07c160 50%,
    transparent 50%
  );

  position: absolute;
  top: 0px;
  left: -1rem;
}

/* .isChecked::before {
  content: "";
  height: 100%;
  width: 1rem;
  background-color: rgb(7 193 96 / 50%);

  position: absolute;
  top: 0px;
  left: -1rem;
} */

.evaluateStatus {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 0.625rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.isToday::before {
  position: absolute;
  content: "";
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: #ffffff;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background: url("../../../../../static/images/todayLose.png") no-repeat center
    center;
  background-size: cover;
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
.font_yellow {
  color: #ffff00;
}
.font_red {
  color: #ff0000;
}

.label_phone {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.onMulti {
  padding-bottom: 50px;
}
.floatBar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 10px 1rem;
  box-shadow: 0px -1px 5px #adadad;
}
.btn_allChecked {
  background-color: #ffffff;
  border-radius: 3px;
  border: 1px solid #a7a7a7;
  box-sizing: border-box;
  padding: 4px 0.625rem;
  margin: 0px 0.625rem 0px 0px;
}
.btn_evaluate {
  margin-left: auto;
  background-color: #0090d8;
  border-radius: 3px;
  color: #ffffff;
  box-sizing: border-box;
  padding: 4px 0.625rem;
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
.todolist_container .van-nav-bar__right .van-nav-bar__text {
  color: #ffffff;
}
</style>
