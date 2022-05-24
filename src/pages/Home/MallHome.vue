<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav />

    <ListContainer />

    <ReCommend />
  </div>
</template>
<script>
import ListContainer from "@/pages/Home/ListContainer/ListContainer.vue";
import ReCommend from "./ReCommend/ReCommend.vue";
export default {
  name: "MallHome",
  components: { ListContainer, ReCommend },
};
</script>
<style lang="scss" scoped></style>
