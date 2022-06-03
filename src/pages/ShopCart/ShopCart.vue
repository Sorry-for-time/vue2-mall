<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>

      <!-- 列表 -->
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <!-- 是否勾选 -->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1"
              @change="updateCheckedStatus(cart, $event)">
          </li>

          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>

          <!-- 数量编辑 -->
          <li class="cart-list-con5">
            <!--
              减少数量
            -->
            <a href="javascript:void(0)" class="mins" @click="modifyShopCartNum('minus', -1, cart)">
              -
            </a>

            <!-- 最终显示数量 -->
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
              @change="modifyShopCartNum('change', $event.target.value, cart)">

            <!-- 增加数量 -->
            <a href="javascript:void(0)" class="plus" @click="modifyShopCartNum('add', 1, cart)">+</a>
          </li>

          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>

          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>

    </div>

    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="updateAllCheckedStatus($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllIsChecked">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ isSelected }}</span>件商品
        </div>

        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>

        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash';
import { mapGetters } from 'vuex';

export default {
  name: 'ShopCart',
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch("shopCart/getCartList");
    },

    // 修改购物车产品数量
    modifyShopCartNum: throttle(function (actionType, effectNum, cart) {
      // 设置返回值
      switch (actionType) {
        case "add":
          effectNum = 1;
          break;
        case "minus":
          // 边界判定
          if (cart.skuNum > 1) {
            effectNum = -1;
          } else {
            return;
          }
          break;

        case "change":
          if (isNaN(effectNum || effectNum < 1)) {
            effectNum = 0;
          } else {
            effectNum = parseInt(effectNum) - cart.skuNum;
          }
          break;
        default:
          break;
      }

      this.$store.dispatch("detail/addOrUpdateShopCart", { skuId: cart.skuId, skuNum: effectNum })
        .then(
          // 成功的情况
          () => {
            // 重新获取服务器数据
            this.getData();
          })
        // 失败的情况
        .catch((err) => {
          alert(err);
        });
    }, 800),

    // 通过产品 ID 删除对应的商品
    deleteCartById(cart) {
      this.$store.dispatch("shopCart/deleCartListById", cart.skuId)
        .then(
          // 成功的情况
          () => {
            this.getData();
          })
        .catch(
          // 失败的情况
          (err) => {
            console.log(err);
            alert(err);
          });
    },

    // 修改单个商品选中状态
    updateCheckedStatus: throttle(function (cart, event) {
      this.$store.dispatch("shopCart/updateCheckedStatusById", { skuId: cart.skuId, isChecked: event.target.checked ? "1" : "0" })
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          console.error(err);
        });
    }, 800),

    // 删除选中的商品
    deleteAllIsChecked() {
      this.$store.dispatch("shopCart/deleteAllChecked")
        .then(
          () => {
            this.getData();
          }
        )
        .catch(err => {
          console.error(err);
        });
    },

    updateAllCheckedStatus(event) {
      const isChecked = event.target.checked ? "1" : "0";
      this.$store.dispatch("shopCart/updateAllCheckedStatus", isChecked)
        .then(() => {
          this.getData();
        })
        .catch(
          err => {
            console.error(err);
            alert(err.message);
          }
        );
    }
  },

  computed: {
    ...mapGetters("shopCart", ["cartList"]),

    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },

    // 购买产品的总价
    totalPrice() {
      let sumPrice = 0;
      this.cartInfoList.forEach(item => {
        sumPrice += item.skuNum * item.skuPrice
      });
      return sumPrice;
    },

    // 复选框状态
    isAllChecked: {
      get() {
        return this.cartInfoList.every(item => item.isChecked.toString() == "1") && this.cartInfoList.length >= 1;
      },
    },

    // 已选择
    isSelected() {
      return this.cartInfoList.reduce((prev, element) => { return element.isChecked ? ++prev : prev }, 0);
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }


        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
