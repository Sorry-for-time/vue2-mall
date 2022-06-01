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

  changeActive(context, payload) {
    context.commit("CHANGE_ACTIVE", payload);
  },
};

const mutations = {
  GET_GOOD_DETAIL(state, payload) {
    state.goodDetail = payload;
  },

  CHANGE_ACTIVE(_state, payload) {
    // 全部属性先移除掉样式绑定
    payload.spuSaleAttrValueList.forEach((element) => {
      element.isChecked = "0";
    });
    // 对点击的选项添加样式绑定
    payload.spuSaleAttrValue.isChecked = "1";
  },
};

export const detail = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
