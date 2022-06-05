import { requestFn } from "@/network/axios-config.js";
import { mockApi } from "@/network/mock-api-service.js";

// 三级联动
export function requestCategoryList() {
  // 返回 Promise 封装对象
  return requestFn.get("/product/getBaseCategoryList");
}

// mock 提供的 banner 数据
export function requestBannerList() {
  return mockApi.get("/banner");
}

// mock 提供的 floors 数据
export function requestFloorList() {
  return mockApi.get("/floors");
}

// 取得搜索数据
export function requestSearchInfo(params) {
  return requestFn.post("/list", params);
}

// 获取产品详情信息
export function requestGoodDetail(id) {
  return requestFn.get(`/item/${id}`);
}

// 将产品添加到购物车当中
export function requestUpdateShopCart(skuId, skuNum) {
  return requestFn.post(`/cart/addToCart/${skuId}/${skuNum}`);
}

// 获取购物车数据
export function requestShopCartList() {
  return requestFn.get("/cart/cartList");
}

// 删除购物车产品
export function requestDeleteCartById(id) {
  return requestFn.delete(`/cart/deleteCart/${id}`);
}

// 修改商品选中状态
export function requestUpdateCartCheckedStatus(skuId, isChecked) {
  return requestFn.get(`/cart/checkCart/${skuId}/${isChecked}`);
}

// 获取验证码
export function requestVerifyCode(phone) {
  return requestFn.get(`/user/passport/sendCode/${phone}`);
}

// 注册用户
export function requestSignUp(params) {
  return requestFn.post(`/user/passport/register`, params);
}

// 登录
export function requestLogin(params) {
  return requestFn.post("/user/passport/login", params);
}

// 获取用户信息(需要在 header 中设置好 token)
export function requestUserInfo() {
  return requestFn.get("user/passport/auth/getUserInfo");
}
