import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import { router } from "@/route/router.js";

Vue.use(router);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
