import { api } from "../axios-config";

// 三级联动
export const requestCategoryList = () => {
  return api.get({ url: "/product/getBaseCategoryList" });
};
