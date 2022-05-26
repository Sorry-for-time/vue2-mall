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
import MallHeader from "./components/header/MallHeader.vue";
import MallFooter from "./components/footer/MallFooter.vue";

export default {
  name: "App",
  components: { MallHeader, MallFooter },
};
</script>

<style lang="scss">
#app {
  cursor: default;
  margin: 0;
  padding: 0;
}
</style>
