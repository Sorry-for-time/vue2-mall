import axios from "axios";
import nprogress from "nprogress";

// 引入加载进度条样式
import "@/../node_modules/nprogress/nprogress.css";
// 修改加载进度条部分默认样式
import "@/assets/css/modify-nprogress.css";

import { loginAndRegister } from "@/store/children/user/loginAndRegister";
import { detail } from "@/store/children/detail/detail.js"; // 取得 UUID 模块中定义的 UUID

const apiLink = "/api"; // 我就不在配置文件中设置代理了(理直气壮.jpg)
// 配置基本API路径
const requestFn = axios.create({
  baseURL: apiLink,
  timeout: 10000, // 请求超时
});

// 请求拦截器
requestFn.interceptors.request.use((config) => {
  nprogress.start(); // 设置加载滚动进度条开始加载

  // 为请求响应头设置临时唯一标识
  // 传递匿名用户唯一标识符信息
  if (detail.state.userUUID) {
    config.headers.userTempId = detail.state.userUUID;
  }

  // 携带 用户 token 给服务器(如果存在的话)
  if (loginAndRegister.state.token) {
    config.headers.token = loginAndRegister.state.token;
  }
  return config;
});

// 响应拦截器
requestFn.interceptors.response.use(
  // 响应成功的情况
  (res) => {
    nprogress.done();
    return res.data;
  },
  // 响应失败的情况
  (error) => {
    // 终止 Promise 链
    return Promise.reject(new Error(JSON.stringify(error.data)));
  }
);

export { requestFn };
