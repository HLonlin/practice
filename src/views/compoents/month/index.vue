<template>
  <div class="month_wrapper">
    <div @click="showPopup">{{ yesr }}-{{ actived }}</div>
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '50%' }"
      @click-overlay="close"
    >
      <main>
        <!-- 选择年 -->
        <div class="yesr">
          <van-icon name="arrow-left" @click="last" />
          <span>{{ yesr }}年{{ actived }}月</span>
          <van-icon name="arrow" @click="next" />
        </div>

        <section>
          <div>
            <span
              v-for="(item, index) in 12"
              :key="index"
              :class="actived === item ? 'spanBGd' : false"
              @click="spanmouth(item)"
            >
              {{ item }}月
            </span>
          </div>
        </section>

        <footer></footer>
      </main>
      <div class="button" @click="button">确定</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "month",
  data: function() {
    return {
      yesr: 1970, //年
      actived: 1, //月
      show: false
    };
  },
  methods: {
    //   上一年
    last() {
      this.yesr = this.yesr - 1;
    },
    // 下一年
    next() {
      this.yesr = this.yesr + 1;
    },
    //选择月份
    spanmouth(item) {
      this.actived = item < 10 ? "0" + item : item;
      console.log(this.actived);
    },
    //弹出层
    showPopup() {
      this.show = true;
    },
    //关闭弹出层
    close() {
      //   设置默认年份
      var date = new Date();
      this.yesr = date.getFullYear();
      this.actived =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
    },
    //确定
    button() {
      this.show = false;
      var Datenum = { year: this.yesr, month: this.actived };

      this.$emit("datebutton", Datenum);
    }
  },
  watch: {},
  computed: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    //   设置默认年份
    var date = new Date();
    this.yesr = date.getFullYear();
    this.actived =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main > .yesr {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  background: #0090d8;
  color: #fff;
  font-size: 1rem;
}
section {
  width: 100%;
  height: 150px;
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
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.spanBGd {
  background: #0090d8;
  color: #fff;
  border-radius: 10px;
}
.button {
  width: 80%;
  height: 50px;
  margin: 20px auto;
  line-height: 50px;
  background: linear-gradient(270deg, #0090d8 0%, #0090d8 100%);
  outline: none;
  border-radius: 2px;
  text-align: center;
  color: #fff;
  font-size: 1rem;
}
</style>
<!-- You need to override the style of the frame -->
<style></style>
