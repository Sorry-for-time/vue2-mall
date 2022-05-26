import Vue from "vue";
import App from "./App.vue";
import TypeNav from "@/pages/Home/TypeNav/TypeNav.vue";

Vue.config.productionTip = false;

// 修改 webkit系浏览器默认滚动条样式
import "@/assets/css/scroll-bar.css";

import { router } from "@/route/router.js";
import { store } from "@/store/store.js";

// 注册全局组件 -> 三级联动组件
Vue.component(TypeNav.name, TypeNav);

new Vue({
  store,
  router, // 传入路由配置文件
  render: (h) => h(App),
}).$mount("#app");
