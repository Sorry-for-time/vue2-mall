<template>
  <div>
    <!-- 导航分类组件 -->
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>

          <!-- 面包屑导航 -->
          <ul class="fl sui-tag">
            <!-- 分类 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>

            <!-- 关键字 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>

            <!-- 品牌信息 -->
            <li class="with-x" v-if="searchParams.trademark.split(':')[1]">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
            </li>

            <!-- 平台售卖属性 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序方式 -->
              <ul class="sui-nav">
                <!-- 默认为综合排序 -->
                <li :class="{ active: isByUniversal }" @click="changeOrder('1')">
                  <a>
                    综合
                    <span v-show="isByUniversal">
                      <!-- 不同方向的箭头 -->
                      <!-- 这里不使用图标库了, 直接使用输入法的表情符号 -->
                      <i v-show="!isArrowTop">↓</i>
                      <i v-show="isArrowTop">↑</i>
                    </span>
                  </a>
                </li>

                <li :class="{ active: !isByUniversal }" @click="changeOrder('2')">
                  <a>
                    价格
                    <span v-show="!isByUniversal">
                      <i v-show="!isArrowTop">↓</i>
                      <i v-show="isArrowTop">↑</i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <!-- 产品模块 -->
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <!-- 商品图片 -->
                      <img :src="good.defaultImg" alt="图片貌似没有加载出来🙃" />
                    </router-link>
                  </div>

                  <div class="price">
                    <strong>
                      <!-- 价格 -->
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>

                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      <!-- 标题 -->
                      {{ good.title }}
                    </a>
                  </div>

                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>

                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器 -->
          <!--        当前选择页,  每页显示多少数据, 总记录数,  连续显示几页 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SearchSelector = () => import("./SearchSelector/SearchSelector.vue");
import { mapGetters, mapState } from "vuex";
export default {
  name: "MallSearch",
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        category1Id: "" /* 一级分类 ID */,
        category2Id: "" /* 二级分类 ID */,
        category3Id: "" /* 三级分类 ID */,
        categoryName: "" /* 品类名 */,
        keyword: "" /* 关键字 */,
        order: "1:desc" /* 排序方式, 默认为综合降序 */,
        pageNo: 1 /* 页码 */,
        pageSize: 10 /* 每页数量 */,
        props: [] /* 商品属性的搜索条件 */,
        trademark: "" /* 品牌的搜索条件 */,
      },
    };
  },

  methods: {
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },

    removeCategoryName() {
      // 将字段设置为 undefined 不会把参数传递给服务器
      this.searchParams.categoryName = "";
      // 跳转改变地址栏
      // 保留 params 参数
      this.$router.push({ name: "search", params: this.$route.params });
    },

    // 移除关键字
    removeKeyword() {
      this.searchParams.keyword = "";
      // 通知 header 组件清除输入框的关键字
      this.$bus.$emit("clearKeyword");

      /**
       * 不需要再触发 getData(), 因为 watch 监视着 $route, 当 $route 里的参数发生时会自动去调用 getData() 重新获取数据
       * 重新跳转时保存 quey 参数
       */
      this.$router.push({ name: "search", query: this.$route.query });
    },

    // 品牌
    trademarkInfo(trademark) {
      // 整理品牌参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },

    // 移除品牌面包屑
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getData();
    },

    // 售卖属性
    attrInfo(attr, attrValue) {
      // 整理参数
      const props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 判断是否以及存在属性, 如果不存在再添加
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
        this.getData();
      }
    },

    // 移除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },

    // 更改排序参照选择项
    changeOrder(flag) {
      let status = this.searchParams.order.split(":");
      // 不考虑后面可能有其它的排序情况, 有的话自己 switch 或者 if else 大法 ^_^
      flag === "1" ? (this.searchParams.order = "1:" + status[1]) : (this.searchParams.order = "2:" + status[1]);
      // 更改升降序状态
      this.toggleArrow();
      status = null; /* 其实没必要指向 null, 如果用 const声明, 在失去可访问性时 GC 也知道标记回收 */
      this.getData(); /* 更新数据 */
    },

    // 更箭头方向
    toggleArrow() {
      // 取得当前的升降序状态
      const arrowForward = this.searchParams.order.split(":");
      // 改变升降序
      arrowForward[1] === "desc"
        ? (this.searchParams.order = `${arrowForward[0]}:asc`)
        : (this.searchParams.order = `${arrowForward[0]}:desc`);
    },

    // 跳转到指定页码
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },

  watch: {
    // 监听路由信息是否发生变化
    $route: {
      handler() {
        // 重新整理参数
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        this.getData();
        // 在请求结束后置空 id, 方便下次的请求
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
      },
    },
  },

  beforeMount() {
    // 组件渲染前整理好要显示的参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },

  computed: {
    /**
     * @description 映射 search/goodList
     */
    ...mapGetters("search", ["goodsList"]),

    ...mapState("search", {
      total: (state) => state.searchList.total,
    }),

    /**
     * @description 目前商品的排序方式是否是通过综合排序
     * @returns {boolean} true: 综合排序, false: 价格排序
     */
    isByUniversal() {
      return this.searchParams.order.indexOf("1") !== -1;
    },

    /**
     * @description 判断箭头朝向
     * @returns {boolean} true: 箭头朝上, false: 箭头朝下
     */
    isArrowTop() {
      return this.searchParams.order.split(":").indexOf("asc") !== -1;
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
