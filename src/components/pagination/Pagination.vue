<template>
  <!-- 分页器 -->
  <div class="pagination">
    <!-- 当当前页不是为第一时才显示 -->
    <button v-show="!(pageNo === 1)" @click="selectPageNo(pageNo - 1)">上一页</button>

    <!-- 连续的起始页码大于 1 时才显示 -->
    <button v-if="startAndEndNum.start > 1" @click="selectPageNo(1)">1</button>

    <!-- 当连续页码的起始页码大于 2 时才显示省略提示 -->
    <button disabled v-if="startAndEndNum.start > 2">...</button>

    <!-- 动态页码 -->
    <button
      v-for="index in pageList"
      :key="index"
      :class="{ active: index === pageNo }"
      :disabled="index === pageNo"
      @click="selectPageNo(index)"
    >
      {{ index }}
    </button>

    <button disabled v-if="startAndEndNum.end < totalPage - 1">...</button>

    <button v-if="startAndEndNum.end < totalPage" @click="selectPageNo(totalPage)">{{ totalPage }}</button>

    <button v-show="!(pageNo === totalPage)" @click="selectPageNo(pageNo + 1)">下一页</button>

    <button>总页数{{ totalPage }}</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",

  data() {
    return {};
  },
  props: ["pageNo", "pageSize", "total", "continues"],

  components: {},

  methods: {
    selectPageNo(pageNo) {
      // 触发自定义事件
      this.$emit("getPageNo", pageNo);
    },
  },

  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },

    // 计算分页的范围
    startAndEndNum() {
      let start = 0,
        end = 0;
      const { pageNo, continues } = this;

      if (this.totalPage < continues) {
        start = 1;
        end = this.totalPage;
      } else {
        /**
         * 处理各种边界情况
         */
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 如过起始点小于1的情况下(即 pageNo 刚好在前几页起始页上)
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 结束页超过实际页的情况
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - continues + 1; // 将其实页往前移动以满足要求
        }
      }
      return { start, end };
    },

    // 通过分页范围生成所需的页码数组
    pageList() {
      const dynamicPageNumbers = [];
      for (let index = this.startAndEndNum.start; index <= this.startAndEndNum.end; index++) {
        dynamicPageNumbers.push(index);
      }
      return dynamicPageNumbers;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
