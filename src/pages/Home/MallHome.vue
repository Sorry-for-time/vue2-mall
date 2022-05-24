<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav />

    <ListContainer />
  </div>
</template>
<script>
import ListContainer from "@/pages/Home/ListContainer/ListContainer.vue";
export default {
  name: "MallHome",
  components: { ListContainer },
};
</script>
<style lang="scss" scoped></style>
