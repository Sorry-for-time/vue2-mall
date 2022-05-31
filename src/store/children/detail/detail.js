import { requestGoodDetail } from "@/network/api/apis";

const state = {
  goodDetail: {},
};

const getters = {
  // 导航路径分类
  categoryView(state) {
    // 如果异步数据还没返回的话(此时组件读取到的是 undefined )那就先返回一个空对象防止组件读取数据报错(帽子戏法++)
    return state.goodDetail.categoryView || {};
  },

  // 产品的主要信息
  skuInfo(state) {
    return state.goodDetail.skuInfo || {};
  },

  // 产品售卖属性
  spuSaleAttrList(state) {
    return state.goodDetail.spuSaleAttrList || [];
  },
};

const actions = {
  // 获取产品信息
  async getGoodDetail(context, id) {
    const result = await requestGoodDetail(id);
    if (result.code.toString() === "200") {
      context.commit("GET_GOOD_DETAIL", result.data);
    }
  },
};

const mutations = {
  GET_GOOD_DETAIL(state, payload) {
    state.goodDetail = payload;
  },
};

export const detail = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
