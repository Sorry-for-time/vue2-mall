<template>
  <div id="app">
    <!-- 页首 -->
    <MallHeader />

    <!-- 路由组件出口 -->
    <router-view></router-view>

    <!-- 页尾 -->
    <MallFooter />
  </div>
</template>

<script>
import MallHeader from "./components/header/MallHeader.vue";
import MallFooter from "./components/footer/MallFooter.vue";
export default {
  name: "App",
  components: { MallHeader, MallFooter },
};
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
}
</style>
