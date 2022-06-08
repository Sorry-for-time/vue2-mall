<template>
  <div id="app">
    <!-- 页首 -->
    <MallHeader />
    <!-- 路由组件视图 -->
    <router-view />
    <!-- 页尾 -->
    <MallFooter v-show="$route.meta.show" />
  </div>
</template>

<script>
const MallHeader = () => import("@/components/header/MallHeader.vue");
const MallFooter = () => import("@/components/footer/MallFooter.vue");

export default {
  name: "App",
  components: { MallHeader, MallFooter },
  mounted() {
    // 在跟组件请求视图默认页视图数据(只请求一次), 减少页面切换带来的数据重复请求
    this.$store.dispatch("home/categoryList");
    // 获取 mock 模拟的数据
    this.$store.dispatch("home/getBannerList");
    this.$store.dispatch("home/getFloorList");
  },
};
</script>

<style lang="scss">
#app {
  cursor: default;
  margin: 0;
  padding: 0;
}
</style>
