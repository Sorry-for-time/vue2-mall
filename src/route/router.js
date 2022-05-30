import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./config/routes.js";

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
      behavior: "smooth",
      y: 0,
    };
  },
});

export { router };
