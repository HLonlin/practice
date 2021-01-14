<template>
  <div class="search_container">
    <van-search
      v-model="searchValue"
      shape="round"
      background="#ffffff"
      placeholder="请输入搜索关键词"
      @blur="onSearch"
    />
  </div>
</template>

<script>
export default {
  name: "search",
  props: {
    sourceOf: String,
    required: true
  },
  data() {
    return {
      searchValue: ""
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onSearch: function() {
      // console.log("搜索来源：", this.sourceOf, "搜索文本：", this.searchValue);
      switch (this.sourceOf) {
        case "notice":
          this.$emit("searchNotice", this.searchValue);
          break;
        case "contactList":
          this.$emit("searchContactList", this.searchValue);
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
<style>
.search_container .van-search__content {
  background-color: #ffffff;
  border: 1px solid #dddddd;
}
.search_container .van-search {
  padding: 10px 1rem 0px 1rem;
}
</style>
