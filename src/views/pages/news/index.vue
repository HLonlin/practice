<template>
  <div class="container">
    <div class="search_panel">
      <search sourceOf="news"></search>
    </div>
    <div class="message_panel">
      <div class="message_box">
        <div class="message_headImg"></div>
        <div class="message_Item">
          <div class="message_label">
            <div class="message_name">梁颖仪</div>
            <div class="message_date">12月16日</div>
          </div>
          <div class="message_text">通知大家明天带上实验手册</div>
        </div>
      </div>
      <div class="message_box">
        <div class="message_headImg"></div>
        <div class="message_Item">
          <div class="message_label">
            <div class="message_name">刘主任</div>
            <div class="message_date">12月15日</div>
          </div>
          <div class="message_text">好的</div>
        </div>
      </div>
      <div class="message_box">
        <div class="message_headImg"></div>
        <div class="message_Item">
          <div class="message_label">
            <div class="message_name">赵老师</div>
            <div class="message_date">12月14日</div>
          </div>
          <div class="message_text">通知大家明天带上练习册</div>
        </div>
      </div>
      <div class="message_box">
        <div class="message_headImg"></div>
        <div class="message_Item">
          <div class="message_label">
            <div class="message_name">刘老师</div>
            <div class="message_date">12月14日</div>
          </div>
          <div class="message_text">通知大家明天带上实验手册</div>
        </div>
      </div>
      <div class="message_box">
        <div class="message_headImg"></div>
        <div class="message_Item">
          <div class="message_label">
            <div class="message_name">江老师</div>
            <div class="message_date">12月8日</div>
          </div>
          <div class="message_text">大家交了实验数据吗？</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 聊天列表页
 */
import search from "../../compoents/search";
export default {
  name: "news",
  components: {
    search
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message_panel {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 1rem;
}
.message_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 0px;
  box-sizing: border-box;
}
.message_headImg {
  display: inline-block;
  min-width: 2.875rem;
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  background-color: #eeeeee;
}
.message_Item {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 0px 0rem 0.75rem;
}

.message_label {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  box-sizing: border-box;
  padding: 0px 0px 0.5rem 0px;
}
.message_date {
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.message_text {
  width: 75%;
  font-size: 0.75rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
