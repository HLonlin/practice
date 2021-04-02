<template>
  <div class="month_wrapper">
    <div class="exterior" @click="showPopup">
      <div class="signin_last ouside" @click.stop="lastMonth"></div>
      <div class="signin_title">
        {{ yesr }}-{{ actived >= 10 ? actived : "0" + actived }}
      </div>
      <div class="signin_next ouside" @click.stop="nextMonth"></div>
    </div>
    <van-popup v-model="show" position="top" @click-overlay="close">
      <main>
        <!-- 选择年 -->
        <div class="yesr">
          <div class="signin_last" @click="yesr -= 1"></div>
          <span>
            {{ yesr }}年{{ actived >= 10 ? actived : "0" + actived }}月
          </span>
          <div class="signin_next" @click="yesr += 1"></div>
        </div>
        <!-- 选择月 -->
        <section>
          <div>
            <span
              v-for="(item, index) in 12"
              :key="index"
              :class="actived === item ? 'isActived' : false"
              @click="actived = item"
            >
              {{ item }}月
            </span>
          </div>
        </section>
        <footer><div class="button" @click="button">确定</div></footer>
      </main>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "month",
  props: {
    year: Number, // 自定义年
    month: Number // 自定义月
  },
  data: function() {
    return {
      yesr: Number, // 默认年
      actived: Number, // 默认月
      show: false, // 弹层显隐状态
      // 备份年月用于取消选择时还原
      backups: {
        year: "",
        month: ""
      }
    };
  },
  methods: {
    //打开弹出层备份年月
    showPopup() {
      this.show = true;
      this.backups.year = this.yesr;
      this.backups.month = this.actived;
    },
    //关闭弹出层还原年月
    close() {
      this.yesr = this.backups.year;
      this.actived = this.backups.month;
    },
    lastMonth: function() {
      this.actived = this.actived - 1;
      this.button();
    },
    nextMonth: function() {
      this.actived = this.actived + 1;
      this.button();
    },
    //确定
    button() {
      this.show = false;
      var Datenum = {
        year: this.yesr,
        month: this.actived >= 10 ? this.actived + "" : "0" + this.actived
      };
      this.$emit("datebutton", Datenum);
    }
  },
  watch: {
    year() {
      this.yesr = this.year ? this.year : date.getFullYear();
    },
    month() {
      this.actived = this.month ? this.month : date.getMonth() + 1;
    }
  },
  computed: {},
  beforeCreate() {},
  created() {
    // 设置默认年份
    var date = new Date();
    this.yesr = this.year ? this.year : date.getFullYear();
    this.actived = this.month ? this.month : date.getMonth() + 1;
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
.month_wrapper {
  width: 100%;
  height: 100%;
}
.exterior {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
}
/* .exterior::after {
  position: absolute;
  content: "";
  width: 0.625rem;
  height: 0.625rem;
  border-left: 2px solid #999;
  border-bottom: 2px solid #999;
  transform: rotate(315deg);
  top: 30%;
  right: 0px;
} */
main {
  background-color: #ffffff;
}
main > .yesr {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  background: #0090d8;
  color: #ffffff;
  font-size: 1rem;
}
.signin_title {
  width: 50%;
  text-align: center;
}
.signin_last,
.signin_next {
  transform: rotate(45deg);
  width: 0.625rem;
  height: 0.625rem;
  border-left: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}
.signin_next {
  transform: rotate(225deg);
}
.ouside {
  border-color: #333333;
}
section {
  width: 100%;
  height: 149px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(207, 205, 205);
  font-size: 1rem;
}
section > div {
  width: 74%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
section > div > span {
  width: 16.666%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.isActived {
  background-color: #0090d8;
  color: #ffffff;
  border-radius: 4px;
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 0px;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50px;
  background: linear-gradient(270deg, #0090d8 0%, #0090d8 100%);
  outline: none;
  border-radius: 2px;
  text-align: center;
  color: #ffffff;
  font-size: 1rem;
}
</style>
<!-- You need to override the style of the frame -->
<style></style>
