<!-- 轮播图公共组件 -->
<template>
  <div class="swiper-container" id="floor1Swiper" ref="floor">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "@/../node_modules/swiper/css/swiper.min.css";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Carousel",
  props: {
    carouselList: {
      type: Array,
      required: true,
    },
  },

  watch: {
    carouselList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          //初始化Swiper类的实例
          new Swiper(this.$refs.floor, {
            direction: "horizontal",
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              type: "bullets",
              clickable: true,
            },
            //自动轮播
            autoplay: {
              delay: 1000,
              stopOnLastSlide: false,
              disableOnInteraction: false,
            },
            // 配置前进后退按钮
            navigation: {
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            },
          });
        });
      },
    },
  },
};
</script>
