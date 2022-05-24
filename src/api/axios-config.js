import axios from "axios";
import nprogress from "nprogress";

// 引入加载进度条样式
import "../../node_modules/nprogress/nprogress.css";

// 配置基本API路径
const api = axios.create({
  baseURL: "http://gmall-h5-api.atguigu.cn", // 基本配置路径
  timeout: 5000, // 请求超时
});

// 请求拦截器
api.interceptors.request.use((config) => {
  nprogress.start(); // 进度条开始
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  // 响应成功
  (res) => {
    nprogress.done();
    return res.data;
  },
  // 响应失败
  (error) => {
    return Promise.reject(new Error(JSON.stringify(error.data)));
  }
);

export { api };
