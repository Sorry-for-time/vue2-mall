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

  /**
   * @description 基本分页参数配置
   */
  props: {
    pageNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
    continues: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    /**
     * @description 要求外部使用者为绑定一个名为 getPageNo 的自定义事件以接收组件返回的点击页码数
     * @param {*} pageNo 当前点击的页码
     */
    selectPageNo(pageNo) {
      this.$emit("getPageNo", pageNo);
    },
  },

  computed: {
    /**
     * @description 获取总页数
     */
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },

    /**
     * @description 计算分页的范围
     */
    startAndEndNum() {
      let continuesStart = 0;
      let continuesEnd = 0;
      // 取得外部设置的当前显示页和连续页数要求
      const { pageNo, continues } = this;
      // 在总页数小于所要求的连续页数显示的情况下
      if (this.totalPage < continues) {
        continuesStart = 1;
        continuesEnd = this.totalPage;
      } else {
        continuesStart = pageNo - parseInt(continues / 2);
        continuesEnd = pageNo + parseInt(continues / 2);
        // 如果连续显示页码起始点小于1的情况下(即 pageNo 刚好在前几页起始页上, 如在 1, 2 上)
        if (continuesStart < 1) {
          continuesStart = 1;
          continuesEnd = continues;
        }
        // 结束页超过实际总页数的情况
        if (continuesEnd > this.totalPage) {
          continuesEnd = this.totalPage;
          continuesStart = this.totalPage - continues + 1; // 将起始页往前移动以满足要求
        }
      }

      return { start: continuesStart, end: continuesEnd };
    },

    // 通过分页范围生成所需的页码数组
    pageList() {
      const dynamicPageNumbers = [];
      for (let index = this.startAndEndNum.start; index <= this.startAndEndNum.end; ++index) {
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
