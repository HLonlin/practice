<template>
  <div class="container">
    <div class="signin_topPanel">
      <div class="signin_roundShadow">
        <div class="signin_roundWhite">
          <div class="signin_round">签到</div>
        </div>
      </div>
      <div class="signin_position">
        <i class="iconItem icon_dingwei signin_icon"></i>
        广东省广州市越秀区小北路22号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signin",
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
.signin_topPanel {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #0090d7;
}
.signin_roundShadow {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}
.signin_roundWhite {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #ffffff;
}
.signin_round {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #0090d7;
  background-color: #ffffff;
  color: #0090d7;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
  font-weight: bold;
}
.signin_icon {
  vertical-align: middle;
}
.signin_position {
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  box-sizing: border-box;
  padding: 140px 16px 16px 16px;
}
</style>
