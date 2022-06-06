import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./config/routes.js";
import { loginAndRegister } from "@/store/children/user/loginAndRegister.js";
import { store } from "@/store/store.js";

Vue.use(VueRouter);

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 处理重复点击的情况
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const router = new VueRouter({
  mode: "history",
  routes,

  // 设置滚动行为
  scrollBehavior: () => {
    return {
      behavior: "auto",
      y: 0,
    };
  },
});

router.beforeEach(
  /**
   * @description 全局前置路由守卫配置
   * @param {*} to 目的路由
   * @param {*} _from 出发的路由
   * @param {*} next 放行器函数
   */
  (to, _from, next) => {
    const token = localStorage.getItem("TOKEN");
    const nickName = loginAndRegister.state.userInfo.nickName;
    // 已经登录的情况
    if (token) {
      /* 已登录且跳转到 /login 的情况 */
      if (to.path === "/login") {
        next("/home"); /* 强制跳转到主页 */
      }
      // 已经登录的情况, 访问的是正常情况
      else {
        /* 如果已经登录, 且存在用户信息的情况直接放行 */
        if (nickName) {
          next();
        }
        // 如果已登录但不存在用户信息
        else {
          store
            // 重新派发请求验证 token 的有效性
            .dispatch("loginAndRegister/getUserInfo")
            .then(
              // token 还没过期的情况就放行
              () => {
                next();
              }
            )
            .catch(
              // token 已经过期就清理数据且跳转到登录页
              async () => {
                // 清理之前的缓存数据
                await store.dispatch("loginAndRegister/logout");
                //  重新登录
                next("/login");
              }
            );
        }
      }
    }
    // 未登录的情况
    else {
      next();
    }
  }
);

// 配置全局后置守卫
router.afterEach((to, from) => {
  console.log(to, from);
});

export { router };
