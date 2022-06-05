<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 通过事件委派,在离开容器后移除掉最后一次经过的选项的背景 -->
      <div @mouseleave="leaveCategoryList" @mouseenter="enterShow">
        <!-- 在离开列表后才清除样式 -->
        <h2 class="all">全部商品分类</h2>

        <transition name="sort">
          <div class="sort" v-show="isCategoryNeedShow">
            <!--
            不对每个标签绑定事件, 防止绑定过多回调或者创建过多子组件(比如使用 router-link)导致页面渲染抖动
            而是对外层的容器绑定, 通过对标签添加自定义属性来确定点击的元素
            -->

            <div class="all-sort-list2" @click="goSearch($event)">
              <!--
                一级分类
                为了练习下 js 逻辑, 所以就不用 :hover 来改变背景了
              -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                @mouseenter="changeSelectedIndex(index)"
                :class="{ 'sky-blue-bgc': index === currentSelectIndex }"
                :key="c1.categoryId"
              >
                <h3>
                  <!-- 通过添加自定义属性给标签进行分类和定位 -->
                  <!-- 要注意属性的大小写转换 -->
                  <!--
                    data-*xxx 属性 MDN 参考文档
                    https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Howto/Use_data_attributes
                    https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-*
                  -->
                  <a :data-category-name="c1.categoryName" :data-category1id="c1.categoryId">
                    {{ index + 1 }}.{{ c1.categoryName }}
                  </a>
                </h3>

                <!-- 二级分类 -->
                <!-- 通过 :style 动态设置隐藏/显示属性 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentSelectIndex === index ? 'block' : 'none',
                  }"
                >
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-category-name="c2.categoryName" :data-category2id="c2.categoryId">
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <!-- 三级分类 -->
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-category-name="c3.categoryName" :data-category3id="c3.categoryId">
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a>服装城</a>
        <a>美妆馆</a>
        <a>尚品汇超市</a>
        <a>全球购</a>
        <a>闪购</a>
        <a>团购</a>
        <a>有趣</a>
        <a>秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle"; /* 使用 lodash 的 throttle 来进行节流 */

export default {
  name: "TypeNav",
  data() {
    return {
      /**
       * @description 当前选中的分类选项
       */
      currentSelectIndex: -1,

      /**
       * @description 是否需要展示商品分类
       * @default true 展示商品列表分类
       */
      isCategoryNeedShow: true,
    };
  },

  methods: {
    // 更改当前所选类别
    changeSelectedIndex: throttle(function (index) {
      this.currentSelectIndex = index;
    }, 100),

    // 离开分类列表
    leaveCategoryList() {
      this.currentSelectIndex = -1;
      // 在当前路由路径不为 /home 的情款下鼠标离开列表后隐藏列表
      if (this.$route.path !== "/home") {
        this.isCategoryNeedShow = false;
      }
    },

    // 路由跳转
    goSearch(event) {
      // 通过节点的 dataset 能取得节点的自定义属性, 且为驼峰命名方式, 这里使用对象结构来进行值提取
      const { categoryName, category1id, category2id, category3id } = event.target.dataset;
      // 根据不同的情况进行路由信息判断
      if (categoryName) {
        const packingData = { name: "search" };
        let query = { categoryName: categoryName };
        // 整理参数
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        // 如果路由跳转的时候带有 params 参数, 那么也传递过去(就算是个空对象也传过去)
        if (this.$route.params) {
          Reflect.set(packingData, "params", this.$route.params);
        }
        // 使用 Reflect API 绑定为对象最追加一个属性
        Reflect.set(packingData, "query", query);

        // 追加路由信息
        this.$router.push(packingData);
      }
    },

    // 鼠标移入时显示分类列表
    enterShow() {
      this.isCategoryNeedShow = true;
    },
  },
  computed: {
    /**
     * @detail 有关 vuex 取得特定模块的 state 数据的用法(模块已经开启了 namespaced 属性)
     * @see <a href="https://vuex.vuejs.org/zh/guide/modules.html#%E5%B8%A6%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E7%9A%84%E7%BB%91%E5%AE%9A%E5%87%BD%E6%95%B0">click me to see</a>
     */

    // 方式1
    /* ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }), */

    // 方式2[问就是直接 vuex 文档看下不就得了](稍微顺眼点🥲)
    ...mapState("home", {
      categoryList: (state) => state.categoryList,
    }),
  },

  mounted() {
    // 如果当前的路由路径不是 /home 的话, 隐藏分类显示
    if (this.$route.path !== "/home") {
      this.isCategoryNeedShow = false;
    }
  },
  beforeRouterLeave() {
    this.isCategoryNeedShow = false;
  },
};
</script>

<style lang="scss" scoped>
.type-nav {
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          &.sky-blue-bgc {
            background-color: skyblue;
          }

          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }

    // 显示列表的过渡动画
    .sort-enter-active {
      transform-origin: top center;
      animation: show-category 200ms ease-out;

      @keyframes show-category {
        from {
          transform: scale(0);
        }

        to {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
