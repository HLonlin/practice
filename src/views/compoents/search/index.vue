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
      // sourceOf
      console.log(this.sourceOf, this.searchValue);
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
</style>
