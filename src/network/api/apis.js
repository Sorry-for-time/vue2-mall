import { requestFn } from "@/network/axios-config.js";
import { mockApi } from "@/network/mock-api-service.js";

// 三级联动
export const requestCategoryList = () => {
  // 返回 Promise 封装对象
  return requestFn.get("/product/getBaseCategoryList");
};

// mock 提供的 banner 数据
export const requestBannerList = () => {
  return mockApi.get("/banner");
};

// mock 提供的 floors 数据
export const requestFloorList = () => {
  return mockApi.get("/floors");
};

// 取得搜索数据
export function requestSearchInfo(params) {
  return requestFn.post("/list", params);
}
