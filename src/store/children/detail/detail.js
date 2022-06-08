import { requestGoodDetail, requestUpdateShopCart } from "@/network/api/apis";
import { getOrSetUUID } from "@/utils/uuid_token.js";

const state = {
  // 商品信息
  goodDetail: {},

  // 用户身份
  userUUID: getOrSetUUID("uuid_token"), // 生成一个 UUID(默认从 localStorage 中取出, 没有的话就新生成一个)
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
    if (result.code == 200) {
      context.commit("GET_GOOD_DETAIL", result.data);
    }
  },

  // 更改当前属性选中项
  changeActive(context, payload) {
    context.commit("CHANGE_ACTIVE", payload);
  },

  // 添加到购物车或者更新购物车
  async addOrUpdateShopCart(_context, { skuId, skuNum }) {
    const result = await requestUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return result; // 响应成功的状态
    } else {
      return Promise.reject(new Error("Fail")); // 响应失败的情况
    }
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
