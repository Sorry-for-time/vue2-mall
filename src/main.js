import Vue from "vue";
import App from "@/App.vue";
import TypeNav from "@/pages/Home/TypeNav/TypeNav.vue";
import Carousel from "@/components/carousel/Carousel.vue";

Vue.config.productionTip = false;

import "@/mock/mock-data-simulate.js"; // mockjs 模拟数据

// 修改 webkit系浏览器默认滚动条样式
import "@/assets/css/scroll-bar.css";

import { router } from "@/route/router.js";
import { store } from "@/store/store.js";

// 注册全局组件 -> 三级联动组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);

new Vue({
  store,
  router,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$UUID = () => {
      return window.crypto.randomUUID();
    };
  },
}).$mount("#app");
