import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const MallHome = () => import("@/pages/Home/MallHome.vue");
const MallLogin = () => import("@/pages/Login/MallLogin.vue");
const MallSearch = () => import("@/pages/Search/MallSearch.vue");
const MallRegister = () => import("@/pages/Register/MallRegister.vue");

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home",
      meta: {
        show: true,
      },
    },

    {
      name: "register",
      path: "/register",
      component: MallRegister,
      meta: {
        show: true,
      },
    },

    {
      name: "login",
      path: "/login",
      component: MallLogin,
      meta: {
        show: false,
      },
    },

    {
      name: "search",
      path: "/search/:keyword?", // 添加 ? 可设置参数可传可不传(类似正则表达式)
      component: MallSearch,
      // props: true, // 路由组件传递 props, 这种方式只传递 params 参数
      // props: {}, // 对象写法

      // 函数写法最常用, 可以传递 params 和 query 参数(在组件指定 props 接收)
      props($route) {
        return {
          keyword: $route.params.keyword,
        };
      },
      meta: {
        show: true,
      },
    },

    {
      name: "home",
      path: "/home",
      component: MallHome,
      meta: {
        show: true,
      },
    },
  ],
});

export { router };
