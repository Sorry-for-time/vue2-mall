<template>
  <div>
    <TypeNav />
    <ListContainer />
    <ReCommend />
    <MallRank />
    <MallGuessLike />

    <MallFloor v-for="floor in floorList" :key="floor.id" :floor="floor" />

    <MallBrand />
  </div>
</template>
<script>
import { mapState } from "vuex";
import ListContainer from "@/pages/Home/ListContainer/ListContainer.vue";
import ReCommend from "@/pages/Home/ReCommend/ReCommend.vue";
import MallRank from "@/pages/Home/MallRank/MallRank.vue";
import MallGuessLike from "@/pages/Home/GuessYouLike/MallGuessLike.vue";
import MallFloor from "@/pages/Home/MallFloor/MallFloor.vue";
import MallBrand from "@/pages/Home/MallBrand/MallBrand.vue";

export default {
  name: "MallHome",
  components: {
    ListContainer,
    ReCommend,
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
};
</script>
<style lang="scss" scoped></style>
