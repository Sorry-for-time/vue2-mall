<template>
  <div class="spec-preview">
    <img :src="skuImageList[needShowIndex].imgUrl" />
    <!-- 传递鼠标的实时位置 -->
    <div class="event" @mousemove="moveHandler($event)"></div>
    <!-- 放大镜区域 -->
    <div class="big" fa-refresh>
      <img :src="skuImageList[needShowIndex].imgUrl" ref="bigShow" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      // 当前要展示的大图的索引值
      needShowIndex: 0,
      mask: null,
      bigShow: null,
    }
  },

  methods: {
    moveHandler(event) {
      const mask = this.mask;
      const bigShow = this.bigShow;

      let left = event.offsetX - mask.offsetWidth / 2, top = event.offsetY - mask.offsetHeight / 2;
      // 边界判断, 防止超出
      if (left <= 0) {
        left = 0;
      }
      if (left >= mask.offsetWidth) {
        left = mask.offsetWidth
      }
      if (top <= 0) {
        top = 0;
      }
      if (top >= mask.offsetHeight) {
        top = mask.offsetHeight;
      }
      mask.style.left = `${left}px`;
      mask.style.top = `${top}px`;

      bigShow.style.left = `${-2 * left}px`;
      bigShow.style.top = `${-2 * top}px`;
    },
  },

  mounted() {
    // 接收兄弟组件传递的修改信息
    this.$bus.$on("changeShowIndex", (index) => {
      this.needShowIndex = index;
    });

    this.mask = this.$refs.mask;
    this.bigShow = this.$refs.bigShow;
  }
}
</script>

<style lang="scss">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>
