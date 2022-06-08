import Mock from "mockjs";

// webpack 环境下 json, 图片等资源文件为默认暴露, 不需要指定暴露
import banner from "@/mock/banner.json";
import floors from "@/mock/floors.json";

/**
 * @description 利用 mockjs 提供虚拟数据进行测试
 */

Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floors", { code: 200, data: floors });
