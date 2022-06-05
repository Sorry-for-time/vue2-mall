import Vue from "vue";
import App from "@/App.vue";
import { LazyTool } from "@/plugin/plugin.js";

const TypeNav = () => import("@/pages/Home/TypeNav/TypeNav.vue");
const Carousel = () => import("@/components/carousel/Carousel.vue");
const Pagination = () => import("@/components/pagination/Pagination.vue");

import "@/mock/mock-data-simulate.js"; /* mockjs 模拟数据 */
import "@/assets/css/scroll-bar.css"; /* 修改 webkit系浏览器默认滚动条样式 */

import { router } from "@/route/router.js";
import { store } from "@/store/store.js";

Vue.config.productionTip = false;
Vue.use(LazyTool);

// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

new Vue({
  store,
  router,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
