<template>
  <div class="order-main">
    <div class="container">
      <div class="order-body">
        <!--左侧列表-->
        <OrderNavBar />

        <!-- 右侧内容 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable -->
<script>
const OrderNavBar = () => import("./children/OrderNavBar.vue");
export default {
  name: "Center",
  components: { OrderNavBar },
};
</script>

<style lang="scss" scoped>
.order-main {
  .container {
    margin: 0 auto;
    width: 1200px;

    .order-body {
      padding: 10px;
      color: #333;

      &:after {
        content: "";
        display: block;
        clear: both;
      }

      //左边
      .order-left {
        float: left;
        width: 16.67%;

        dl {
          line-height: 28px;

          dt {
            font-weight: 700;
            padding: 5px;

            i {
              color: #77b72c;
            }
          }

          dd {
            margin: 0 0 6px;
            border-bottom: 1px solid #ededed;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
