export const LazyTool = {
  install(Vue) {
    /**
     * @description 取得一个 uuid 字符串, browser require: support es2015
     * @param {*} start 截取起始起点, default 0
     * @param {*} end 截取结束, default 36
     * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID">crypto.randomUUID()</a>
     * @returns {String} UUID
     */
    Vue.prototype.$UUID = (start = 0, end = 36) => {
      return window.crypto.randomUUID().substring(start, end);
    };
  },
};
