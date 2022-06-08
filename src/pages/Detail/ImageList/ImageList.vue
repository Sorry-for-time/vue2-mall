<template>
  <div class="swiper-container" ref="carouselMounter">
    <div class="swiper-wrapper">
      <!-- 每一张的图片 -->
      <div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id">
        <img
          :src="item.imgUrl"
          alt="图片貌似没有加载出来??"
          :class="{ active: index === currentImgActiveIndex }"
          @click="changeActive(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "@/../node_modules/swiper/css/swiper.min.css";

export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentImgActiveIndex: 0,
    };
  },
  methods: {
    changeActive(index) {
      this.currentImgActiveIndex = index;
      // 通知兄弟组件更改展示的大图数据
      this.$bus.$emit("changeShowIndex", index);
    },
  },

  watch: {
    // 监测 props 更改
    skuImageList: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.carouselMounter, {
            loop: false,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 设置同时展示个数(简单官网的配置CV下)
            slidesPerView: 3,
            // 每次滚动的图片数量
            slidesPerGroup: 1 /* 算了还是一张, 教程接口提供的图片不多 */,
          });
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>
