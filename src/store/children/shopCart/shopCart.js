import {
  requestShopCartList,
  requestDeleteCartById,
  requestUpdateCartCheckedStatus,
} from "@/network/api/apis";

const state = {
  cartList: [],
};

const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    const result = await requestShopCartList();
    if (result.code.toString() === "200") {
      commit("SET_SHOP_CART_LIST", result.data);
    }
  },

  // 根据 id 删除购物车的商品
  async deleCartListById(_context, id) {
    const result = await requestDeleteCartById(id);
    if (result.code.toString() === "200") {
      return "success";
    } else {
      Promise.reject(new Error("fail"));
    }
  },

  // 修改购物车产品选中的状态
  async updateCheckedStatusById(_context, { skuId, isChecked }) {
    const result = await requestUpdateCartCheckedStatus(skuId, isChecked);
    if (result.code == 200) {
      return "success";
    } else {
      return Promise.reject(new Error(result));
    }
  },

  // 删除所有被选中的产品
  async deleteAllChecked(context) {
    const requestResults = [];
    context.getters.cartList.cartInfoList
      .filter((cart) => {
        return cart.isChecked;
      })
      .forEach((element) => {
        requestResults.push(
          context.dispatch("deleCartListById", element.skuId)
        );
      });
    // 返回执行结果
    return Promise.all(requestResults);
  },

  // 更新所有选项的 checked 属性
  async updateAllCheckedStatus(context, isChecked) {
    const status = [];
    context.getters.cartList.cartInfoList.forEach((element) => {
      status.push(
        context.dispatch("updateCheckedStatusById", {
          skuId: element.skuId,
          isChecked,
        })
      );
    });
    return Promise.all(status);
  },
};

const mutations = {
  SET_SHOP_CART_LIST(state, payload) {
    state.cartList = payload;
  },
};

export const shopCart = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
