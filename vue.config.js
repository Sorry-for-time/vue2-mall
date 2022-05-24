const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 根据环境决定是否启用 eslint 语法检查(开发时关闭, 编译打包时启用)
  lintOnSave: process.env.NODE_ENV === "production",
  // 代理跨越配置
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
});
