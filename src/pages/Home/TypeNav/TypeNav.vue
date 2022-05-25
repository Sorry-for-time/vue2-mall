<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 在离开列表后才清除样式 -->
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

      <!-- 在离开容器后移除掉最后一次经过的选项的背景 -->
      <div @mouseleave="leaveCategoryList">
        <div class="sort">
          <!--
            不对每个标签绑定事件, 防止绑定过多回调或者创建过多子组件(使用 router-link)导致页面渲染抖动
            而是对外层的容器绑定, 通过对标签添加自定义属性来确定点击的元素
          -->
          <div class="all-sort-list2" @click="goSearch($event)">
            <!--
            为了练习下 js 逻辑, 所以就不用 :hover 来改变背景了...
           -->
            <!-- 一级分类 -->
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              @mouseenter="changeRecordCompareValue(index)"
              :class="{ 'sky-blue-bgc': index === currentCompareValue }"
              :key="c1.categoryId"
            >
              <h3>
                <!-- 通过添加自定义属性给标签进行分类和定位 -->
                <!-- 要主要属性的大小写转换 -->
                <a
                  :data-category-name="c1.categoryName"
                  :data-category1-id="c1.categoryChild"
                >
                  {{ c1.categoryName }}
                </a>
              </h3>

              <!-- 二级分类 -->
              <!-- 通过 :style 动态设置隐藏/显示属性 -->
              <div
                class="item-list clearfix"
                :style="{
                  display: currentCompareValue === index ? 'block' : 'none',
                }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-category-name="c2.categoryName"
                        :data-category2-id="c2.categoryChild"
                      >
                        {{ c2.categoryName }}
                      </a>
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-category-name="c3.categoryName"
                          :data-category3-id="c3.categoryId"
                        >
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 使用 lodash 的 throttle 来进行节流
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentCompareValue: -1,
    };
  },
  methods: {
    changeRecordCompareValue: throttle(function (index) {
      this.currentCompareValue = index;
    }, 100),

    leaveCategoryList() {
      this.currentCompareValue = -1;
    },

    // 路由跳转
    goSearch(event) {
      // 通过节点的 dataset 能取得节点的自定义属性, 且为驼峰命名方式, 这里使用对象结构来进行值提取
      const {
        categoryName,
        category1Id: category1id,
        category2Id: category2id,
        category3Id: category3id,
      } = event.target.dataset;

      // 根据不同的情况进路由信息判断
      if (categoryName) {
        const location = { name: "search" };
        let query = { categoryName: categoryName };
        // 整理参数
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        location.query = query;
        this.$router.push(location);
      }
    },
  },
  computed: {
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
    // 请求视图默认页视图
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style lang="scss" scoped>
.type-nav {
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
  }
}
</style>
