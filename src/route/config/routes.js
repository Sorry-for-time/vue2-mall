// 动态引入组件
const MallHome = () => import("@/pages/Home/MallHome.vue");
const MallLogin = () => import("@/pages/Login/MallLogin.vue");
const MallSearch = () => import("@/pages/Search/MallSearch.vue");
const MallRegister = () => import("@/pages/Register/MallRegister.vue");
const GoodDetail = () => import("@/pages/Detail/GoodDetail.vue");
const AddCartSuccess = () => import("@/pages/AddCartSuccess/AddCartSuccess.vue");
const ShopCart = () => import("@/pages/ShopCart/ShopCart.vue");
const Trade = () => import("@/pages/Trade/Trade.vue");
const Pay = () => import("@/pages/Pay/Pay.vue");

export const routes = [
  // 默认首页
  {
    path: "/",
    redirect: "/home",
    meta: {
      show: true,
    },
  },

  // 主体展示区域
  {
    name: "home",
    path: "/home",
    component: MallHome,
    meta: {
      show: true,
    },
  },

  // 登录
  {
    name: "login",
    path: "/login",
    component: MallLogin,
    meta: {
      show: false,
    },
  },

  // 注册
  {
    name: "register",
    path: "/register",
    component: MallRegister,
    meta: {
      show: true,
    },
  },

  // search 路由配置
  {
    name: "search",
    // 添加 ? 可设置参数可传可不传(类似正则表达式)
    path: "/search/:keyword?",
    component: MallSearch,

    /**
     * props: true
     * 路由组件传递 props, 这种方式只传递 params 参数
     * props: {}, 对象写法
     * 函数写法最常用, 可以传递 params 和 query 参数(在组件指定 props 接收)
     */
    props(route) {
      return {
        keyword: route.params.keyword,
      };
    },

    //元数据信息
    meta: {
      show: true,
    },
  },

  // 商品详情页
  {
    name: "detail",
    path: "/detail/:skuId?",
    component: GoodDetail,
    meta: {
      show: true,
    },
  },

  // 添加到购物车成功页面
  {
    name: "addCartSuccess",
    path: "/addCartSuccess",
    component: AddCartSuccess,
    meta: {
      show: true,
    },
  },

  // 购物车页面
  {
    name: "shopCart",
    path: "/shopCart",
    component: ShopCart,
    meta: {
      show: true,
    },
  },

  // 交易界面
  {
    name: "trade",
    path: "/trade",
    component: Trade,
    meta: {
      show: true,
    },
  },

  // 支付界面
  {
    name: "pay",
    path: "/pay",
    component: Pay,
    meta: {
      show: true,
    },
  },
];
