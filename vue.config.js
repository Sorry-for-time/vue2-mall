const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 根据环境决定是否启用 eslint 语法检查(开发时关闭, 编译打包时启用)
  lintOnSave: process.env.NODE_ENV === "production",
  // 在生产环境下禁用生成 map 文件
  productionSourceMap: process.env.NODE_ENV !== "production",
  devServer: {
    // 配置代理解决跨域访问问题
    proxy: {
      "/api": {
        /**
         * @note 这个接口是否可用取决于他们的服务器状态以及是否进行变更等(言外之意: 有可能会在某一时刻不能使用)
         */
        target: "http://gmall-h5-api.atguigu.cn/",
      },
    },
  },
});
