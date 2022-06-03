import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

import { home } from "@/store/children/home/home.js";
import { search } from "@/store/children/search/search.js";
import { detail } from "@/store/children/detail/detail.js";
import { shopCart } from "@/store/children/shopCart/shopCart.js";

export const store = new vuex.Store({
  /**
   * 默认情况下，模块内部的 action 和 mutation 仍然是注册在全局命名空间的——这样使得多个模块能够对同一个 action 或 mutation 作出响应
   * 如果希望模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
   * 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
   */
  strict: process.env.NODE_ENV !== "production",
  modules: {
    home,
    search,
    detail,
    shopCart,
  },
});
