<template>
  <div class="wxlocation_container">
    <div class="topbar_panel">
      <van-nav-bar
        title="位置信息"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "wxlocation",
  data() {
    return {};
  },
  beforeCreate() {},
  created() {
    this.wxConfig();
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
    wxConfig: function() {
      let that = this,
        u = navigator.userAgent;
      if (u.indexOf("MicroMessenger") > -1) {
      } else {
        that.$toast({
          message: "请在微信端进行此操作"
        });
        return;
      }
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let url = "";
      if (isAndroid) {
        url = location.href;
      }
      if (isIOS) {
        url = location.href.split("#")[0]; //hash后面的部分如果带上ios中config会不对
      }
      //   获取jsdk签名配置信息
      that.$axios
        .post(that.$api.getWechatInvokeSign, {
          url: url
        })
        .then(res => {
          let data = res.data;
          //   通过config接口注入权限验证配置
          wx.config({
            beta: true,
            debug: false,
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ["getLocation", "openLocation", "getSetting"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function() {
            wx.openSetting({
              success(res) {
                that.$toast({
                  message: "success"
                });
                res.authSetting = {
                  "scope.userLocation": true
                };
              }
            });
          });
        });
    },
    openLocation: function() {
      //   wx.getLocation({
      //     type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //     success: function(res) {
      //       that.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //       that.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //       that.currentAddress = "00000000";
      //       var accuracy = res.accuracy; // 位置精度
      //       that.$toast({
      //         message: "relocationSuccess"
      //       });
      //     },
      //     fail: function(res) {
      //       that.$toast({
      //         message: res
      //       });
      //     },
      //     cancel: function(err) {
      //       that.$toast.fail("位置获取失败！");
      //     }
      //   });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
<style>
.wxlocation_container .van-nav-bar {
  background-color: #0090d8;
}
.wxlocation_container .van-nav-bar__placeholder,
.wxlocation_container .van-nav-bar__content {
  height: 44px !important;
}
.wxlocation_container .van-nav-bar .van-icon {
  color: #ffffff;
}
.wxlocation_container .van-nav-bar__title {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
