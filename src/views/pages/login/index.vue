<template>
  <div class="login_container"></div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  beforeCreate() {},
  created() {
    let that = this;
    setTimeout(() => {
      let url = that.$route.query.redirect || "/";
      this.$store.commit("addState", {
        key: "tokenid",
        val: url
      });
      that.$router.replace(url);
    }, 1000);
  },
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
<style scoped></style>
