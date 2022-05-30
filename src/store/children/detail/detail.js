import { requestGoodDetail } from "@/network/api/apis";

const state = {
  goodDetail: {},
};

const getters = {};

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
