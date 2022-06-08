import axios from "axios";
import nprogress from "nprogress";

/**
 * @description mock 模拟数据 API 配置
 */

import "@/../node_modules/nprogress/nprogress.css";
import "@/assets/css/modify-nprogress.css";

const apiLink = "/mock";
const mockApi = axios.create({
  baseURL: apiLink,
  timeout: 10000,
});

mockApi.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

mockApi.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error(JSON.stringify(error.data)));
  }
);

export { mockApi };
