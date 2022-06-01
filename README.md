# vue2-mall

## reason

> 看过了一些 vue 的教程和相关的博客, 也写了一些小小的玩具(todo-list 这种级别), 用了 ts&&vue3 最新的 composition API, suspense 组件... 等这些比较时髦的特性(不得不说用 ts 写真比起写原生 js 要愉悦很多 ✨)
> 但一直没有去写过一个比较实际的项目(商城啊什么的), 于是决定万能的 [B 站](https://www.bilibili.com) 找个偏实战项目的教程跟着学习~~CV~~一遍, 加深开发理解和肌肉记忆( ~~为了当一枚合格的切图业务员[严肃脸 🥲]~~).
> 这个项目基于 vue2[因为原视频教程就是基于 2], 你可以通过点击[这里](https://www.bilibili.com/video/BV1Vf4y1T7bw?share_source=copy_web)跳转到原教程视频
> 此外, 当愉快 cv 的时候也少不了看下 [MDN(YYDS✨)](https://developer.mozilla.org/), 和 vue2 的官方文档那些配置
>
> - 底下是免费五毛提示:
>   - ~~注意关弹幕保智商, 弹幕人均要么手写 JVM GC 染色标记回收算法或者精通 C/C++的大佬 😊,以至于连前端框架在大佬眼里简直就是逊啊 🙃(只会写 Spring CRUD 用点中间件的我感到害怕, 提前保护)~~
>   - So, 只是像我一样的普通学习者, 那么关掉弹幕, 不懂的地方老实 MDN 或者 vue 的官方文档吧

## A Little Change

- 对比原版, 我做了些我自己比较习惯的小小改动
  - 使用所有确定的文件命名替代清一色的 Index 命名(~不然我自己都分不清组件~)
  - 使用了 sass 替代 less, 且用数组和 `@each` 循环替代那一大堆的重复样式编写, ~~less 也可以, 但我更习惯 sass 的语法风格~~
  - 所有的 `vuex` 模块统一开启 `namespaced` 属性
  - 如果你发现数据请求失败了, 那么是他们的数据接口换了或者挂掉了, 可以看下他们的最新接口更新或者自己 `springBoot` 写个玩玩[~~反正我不写 🥲~~]

## 目录结构

```txt
├───assets
│   └───css
├───components
│   ├───carousel
│   ├───footer
│   │   └───images
│   ├───header
│   │   └───images
│   └───pagination
├───mock
├───network
│   └───api
├───pages
│   ├───Detail
│   │   ├───ImageList
│   │   ├───images
│   │   └───Zoom
│   ├───Home
│   │   ├───GuessYouLike
│   │   │   └───images
│   │   ├───ListContainer
│   │   │   └───images
│   │   ├───MallBrand
│   │   │   └───images
│   │   ├───MallFloor
│   │   │   └───images
│   │   ├───MallRank
│   │   │   └───images
│   │   ├───Recommend
│   │   │   └───images
│   │   └───TypeNav
│   ├───Login
│   ├───Register
│   └───Search
│       ├───images
│       └───SearchSelector
│           └───images
├───plugin
├───route
│   └───config
└───store
    └───children
        ├───detail
        ├───home
        └───search
```

## Done!
