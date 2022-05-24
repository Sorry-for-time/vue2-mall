import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const MallHome = () => import("@/pages/Home/MallHome.vue");
const MallLogin = () => import("@/pages/Login/MallLogin.vue");
const MallSearch = () => import("@/pages/Search/MallSearch.vue");
const MallRegister = () => import("@/pages/Register/MallRegister.vue");

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "register",
      path: "/register",
      component: MallRegister,
    },

    {
      name: "login",
      path: "/login",
      component: MallLogin,
    },

    {
      name: "search",
      path: "/search",
      component: MallSearch,
    },

    {
      name: "home",
      path: "/home",
      component: MallHome,
    },
  ],
});
