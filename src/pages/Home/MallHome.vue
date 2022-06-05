<template>
  <div>
    <!-- 分类导航栏 -->
    <TypeNav />
    <!-- 主体大图展示区域 -->
    <ListContainer />
    <!-- 推荐 -->
    <Recommend />
    <!-- 排行 -->
    <MallRank />
    <!-- 猜你喜欢(推荐) -->
    <MallGuessLike />
    <!-- 专栏推荐 -->
    <MallFloor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <!-- 品牌展示区 -->
    <MallBrand />
  </div>
</template>
<script>
import { mapState } from "vuex";

// 使用异步引入, 编译编译拆分
const ListContainer = () => import("@/pages/Home/ListContainer/ListContainer.vue");
const Recommend = () => import("@/pages/Home/Recommend/Recommend.vue");
const MallRank = () => import("@/pages/Home/MallRank/MallRank.vue");
const MallGuessLike = () => import("@/pages/Home/GuessYouLike/MallGuessLike.vue");
const MallFloor = () => import("@/pages/Home/MallFloor/MallFloor.vue");
const MallBrand = () => import("@/pages/Home/MallBrand/MallBrand.vue");

export default {
  name: "MallHome",
  components: {
    ListContainer,
    Recommend,
    MallRank,
    MallGuessLike,
    MallFloor,
    MallBrand,
  },
  computed: {
    ...mapState("home", {
      floorList: (state) => state.floorList,
    }),
  },
  mounted() {
    // 在挂载成功后请求对应的用户状态数据
    this.$store.dispatch("loginAndRegister/getUserInfo").then(
      (success) => {
        console.log(success);
      },
      // 未登录的情况(不存在已有 token)
      (whenOffline) => {
        console.log(whenOffline);
      }
    );
  },
};
</script>
<style lang="scss" scoped></style>
