import Vue from "vue";
import App from "@/App.vue";
import { LazyTool } from "@/plugin/plugin.js";
import VueLazyload from "vue-lazyload";
import "@/utils/validate.js"; /* 表单校验 */

import "@/mock/mock-data-simulate.js"; /* mockjs 模拟数据 */
import "@/assets/css/scroll-bar.css"; /* 修改 webkit系浏览器默认滚动条样式 */
import loadingImage from "@/assets/loading.gif";
import errorImage from "@/assets/load-error.png";

import { router } from "@/route/router.js";
import { store } from "@/store/store.js";
import { Button, MessageBox } from "element-ui";

const TypeNav = () => import("@/pages/Home/TypeNav/TypeNav.vue");
const Carousel = () => import("@/components/carousel/Carousel.vue");
const Pagination = () => import("@/components/pagination/Pagination.vue");

Vue.config.productionTip = false;
Vue.use(LazyTool);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadingImage,
  error: errorImage,
}); /* 使用插件实现图片懒加载 */

// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);

new Vue({
  store,
  router,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 绑定组件的弹窗方到 Vue 原型上
    Vue.prototype.$msgBox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
}).$mount("#app");
