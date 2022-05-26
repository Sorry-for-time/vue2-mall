import {
  requestCategoryList,
  requestBannerList,
  requestFloorList,
} from "@/network/api/apis";

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
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

  async getFloorList(context) {
    const result = await requestFloorList();
    if (result.code.toString() === "200") {
      context.commit("GET_FLOOR_LIST", result.data);
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

  GET_FLOOR_LIST(state, payload) {
    state.floorList = payload;
  },
};

export const home = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
