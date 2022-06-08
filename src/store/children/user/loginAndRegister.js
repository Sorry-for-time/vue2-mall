import { requestVerifyCode, requestSignUp, requestLogin, requestUserInfo, requestLogout } from "@/network/api/apis.js";

const state = {
  verifyCode: "" /* 验证码 */,
  token: localStorage.getItem("TOKEN") || "" /* 登录用户的标识符 */,
  // 登录用户的信息, 如果已经在使过程用中, 即使 token 过期也等到下一次打开页面时在重新跳转到登录页面重新登录
  userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || {},
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
    if (result.code == 200) {
      context.commit("SET_VERIFY_CODE", result.data);
      return "success";
    } else {
      return Promise.reject(result.message);
    }
  },

  // 注册用户
  async signUp(_context, userParams) {
    const result = await requestSignUp(userParams);
    if (result.code == 200) {
      return "success";
    } else {
      return Promise.reject(result.message);
    }
  },

  // 登录用户
  async login(context, userParams) {
    const result = await requestLogin(userParams);
    if (result.code == 200) {
      context.commit("SAVE_TOKEN", result.data.token);
      return "success";
    } else {
      return Promise.reject(result.message);
    }
  },

  // 获取用户信息
  async getUserInfo(context) {
    const result = await requestUserInfo();
    if (result.code == 200) {
      context.commit("SET_USER_INFO", result.data);
      return "success";
    } else {
      return Promise.reject(result.message);
    }
  },

  // 退出登录
  async logout(context) {
    const result = await requestLogout();
    // 不管服务端的响应何, 都先删除本地的缓存数据
    context.commit("REMOVE_USER_TOKEN");

    if (result.code == 200) {
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
    state.token = token;
    localStorage.setItem("TOKEN", token); /* 持久化保存 token, 下次打开页面时直接使用 */
  },

  // 保存用户信息
  SET_USER_INFO(state, payload) {
    state.userInfo = payload;
    sessionStorage.setItem("userInfo", JSON.stringify(payload));
  },

  // 退出登录
  REMOVE_USER_TOKEN(state) {
    // 移除 token 和 当前用户信息
    state.token = "";
    state.userInfo = {};
    localStorage.removeItem("TOKEN");
    sessionStorage.removeItem("userInfo");
  },
};

export const loginAndRegister = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
