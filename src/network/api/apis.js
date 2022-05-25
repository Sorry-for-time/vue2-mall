import { requestFn } from "../axios-config.js";

// 三级联动
export const requestCategoryList = () => {
  // 返回 Promise 封装对象
  return requestFn.get("/product/getBaseCategoryList");
};
