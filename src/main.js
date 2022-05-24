import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import { router } from "@/route/router.js";

new Vue({
  router, // 传入路由配置文件
  render: (h) => h(App),
}).$mount("#app");
