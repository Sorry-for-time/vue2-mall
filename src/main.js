import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import { router } from "@/route/router.js";

import TypeNav from "@/pages/Home/TypeNav/TypeNav.vue";

// 注册全局组件 - 三级联动组件
Vue.component(TypeNav.name, TypeNav);

new Vue({
  router, // 传入路由配置文件
  render: (h) => h(App),
}).$mount("#app");
