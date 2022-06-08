import { requestSearchInfo } from "@/network/api/apis";

const state = {
  searchList: {},
};

const getters = {
  goodsList(state) {
    // 多加一个判断, 如果数据没请求到的话返回一个空数组
    return state.searchList.goodsList || [];
  },

  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },

  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

const actions = {
  // 获取搜索请求数据
  async getSearchList(context, params = {}) {
    const result = await requestSearchInfo(params);
    if (result.code == 200) {
      context.commit("GET_SEARCH_LIST", result.data);
    }
  },
};

const mutations = {
  GET_SEARCH_LIST(state, payload) {
    state.searchList = payload;
  },
};

export const search = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
