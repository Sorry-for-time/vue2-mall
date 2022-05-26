import { requestCategoryList, requestBannerList } from "@/network/api/apis";

const state = {
  categoryList: [],
  bannerList: [],
};

const getters = {};

const actions = {
  async categoryList(context) {
    const result = await requestCategoryList();
    if (result.code.toString() === "200") {
      context.commit("CATEGORY_LIST", result.data);
    }
  },

  async getBannerList(context) {
    const result = await requestBannerList();
    if (result.code.toString() === "200") {
      context.commit("GET_BANNER_LIST", result.data);
    }
  },
};

const mutations = {
  CATEGORY_LIST(state, payload) {
    state.categoryList = payload;
  },

  GET_BANNER_LIST(state, payload) {
    state.bannerList = payload;
  },
};

export const home = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
