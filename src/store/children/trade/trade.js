import { requestAddressInfo, requestOrderInfo } from "@/network/api/apis";

const state = {
  addressInfo: [],
  orderInfo: {},
};

const getters = {};

const actions = {
  // 返回地址信息(需要存在有效 token, 无需多说)
  async getUserAddressInfo(context) {
    const result = await requestAddressInfo();
    if (result.code == 200) {
      context.commit("SET_ADDRESS_INFO", result.data);
      return "success";
    } else {
      return Promise.reject("request fail");
    }
  },

  // 获取商品清单信息
  async getUserOrderInfo(context) {
    const result = await requestOrderInfo();
    if (result.code == 200) {
      context.commit("SET_ORDER_INFO", result.data);
      return "success";
    } else {
      return Promise.reject("request fail");
    }
  },

  // 更改默认选中项
  changeDefaultSelect(context, needSelect) {
    context.commit("SET_DEFAULT_SELECT", needSelect);
  },
};

const mutations = {
  // 保存订单交易页面数据
  SET_ADDRESS_INFO(state, payload) {
    state.addressInfo = payload;
  },

  SET_ORDER_INFO(state, payload) {
    state.orderInfo = payload;
  },

  SET_DEFAULT_SELECT(state, payload) {
    state.addressInfo.forEach((element) => {
      element.isDefault = "0";
    });
    payload.isDefault = "1";
  },
};

export const trade = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
