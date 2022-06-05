import { requestVerifyCode, requestSignUp, requestLogin, requestUserInfo } from "@/network/api/apis.js";

const state = {
  verifyCode: "" /* 验证码 */,
  token: localStorage.getItem("TOKEN") || "" /* 登录用户的标识符 */,
  userInfo: {} /* 登录用户的信息 */,
};

const getters = {
  // 取得用户你昵称
  userName(state) {
    return state.userInfo.nickName || "";
  },
};

const actions = {
  // 取得验证码
  async getVerifyCode(context, phone) {
    const result = await requestVerifyCode(phone);
    if (result.code.toString() === "200") {
      context.commit("SET_VERIFY_CODE", result.data);
      return "success";
    } else {
      return Promise.reject(result.message);
    }
  },

  // 注册用户
  async signUp(_context, userParams) {
    const result = await requestSignUp(userParams);
    if (result.code.toString() === "200") {
      return "success";
    } else {
      return Promise.reject(result.message);
    }
  },

  // 登录用户
  async login(context, userParams) {
    const result = await requestLogin(userParams);
    if (result.code.toString() === "200") {
      context.commit("SAVE_TOKEN", result.data.token);
      return "success";
    } else {
      return Promise.reject(result.message);
    }
  },

  // 获取用户信息
  async getUserInfo(context) {
    const result = await requestUserInfo();
    if (result.code.toString() === "200") {
      context.commit("SET_USER_INFO", result.data);
      return "success";
    } else {
      return Promise.reject(result.message);
    }
  },
};

const mutations = {
  // 设置仓库中的验证码
  SET_VERIFY_CODE(state, payload) {
    state.verifyCode = payload;
  },

  // 保存 token
  SAVE_TOKEN(state, token) {
    localStorage.setItem("TOKEN", token); /* 持久化保存 token, 下次打开页时直接使用 */
    state.token = token;
  },

  // 保存用户信息
  SET_USER_INFO(state, payload) {
    state.userInfo = payload;
  },
};

export const loginAndRegister = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
