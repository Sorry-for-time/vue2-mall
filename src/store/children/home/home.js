import { requestCategoryList } from "@/network/api/apis";

const state = {
  categoryList: [],
};

const getters = {};

const actions = {
  async categoryList(context) {
    const result = await requestCategoryList();
    if (result.code.toString() === "200") {
      context.commit("CATEGORY_LIST", result.data);
    }
  },
};

const mutations = {
  CATEGORY_LIST(state, payload) {
    state.categoryList = payload;
  },
};

export const home = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
