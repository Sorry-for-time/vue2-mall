<h1 style="text-align: center; color: cadetblue;">vue2-mall</h1>

<div align="center">
	<img src="https://img.shields.io/badge/vue-2.6.14-green" />
	<img src="https://img.shields.io/badge/vue--cli-5.0x-orange" />
	<img src="https://img.shields.io/badge/sass-1.52.1-pink" />
	<img src="https://img.shields.io/badge/nprogress-0.2-lightgrey" />
	<img src="https://img.shields.io/badge/and%20more-...-yellowgreen" />
	<img src="https://img.shields.io/badge/license-MIT-blue" />
</div>

## 一个简单的介绍 👋

看过了一些 vue 的教程和相关的博客, 也写了一些小小的玩具(todo-list 这种级别), 也体验了下 vue3 的一些新 feature(更完善的 ts 支持, teleport 和 suspense 组件...), 但一直没有去写过一个比较实际的项目(商城啊什么的), 于是决定万能的 [B 站](https://www.bilibili.com) 找个偏实战项目的教程跟着学习<span style="text-decoration: line-through; font-size: 10px;">CV</span>一遍, 加深开发理解和肌肉记忆 )<span style="text-decoration: line-through; font-size: 10px;">为了当一枚合格的切图业务员(严肃脸 🥲)</span>.
这个项目基于 vue2<span style="font-size: 12px; background-color: blueviolet;">因为原视频教程就是基于 2</span>, 你可以通过点击[这里](https://www.bilibili.com/video/BV1Vf4y1T7bw?share_source=copy_web)跳转到原教程视频
此外, 愉快 CV 的时候也少不了看下 [MDN✨](https://developer.mozilla.org/) 和 vue2 的官方文档那些说明
ps: 我不知道他们的原始项目 github 链接是哪个, 所以这里我以他们的教程视频链接为准
[视频地址](https://www.bilibili.com/video/BV1Vf4y1T7bw?share_source=copy_web)

##### 这是额外的免费个人五毛提示

> 如果你也跟我一样打算也通过那个视频熟悉点开发感觉(可能吧), 那么少开或者直接关掉弹幕吧
>
> - reason: 弹幕大概率有不少大佬对你劝退叫你别学了啥的 🙃, 且 "高手" 太多了---来自各种静态语言的自称使用者, 有的可能还精通 JVM GC 回收算法等(能和大神在刷同一个基础教程可真的是幸运[doge]), 所以不会的东西还是尽量自己借助搜索引擎吧...

## 一些基于原教程的部分改动

- 对比原版, 我做了些我自己比较习惯的小小改动
  - 使用所有确定的文件命名替代清一色的 Index 命名<span style="text-decoration: line-through; font-size: 10px;">不然我自己都分不清组件</span>
  - 使用了 sass 替代 less, 且用数组和 `@each` 循环替代那一大堆的重复样式编写, <span style="text-decoration: line-through; font-size: 10px;">less 也可以, 但我更习惯 sass 的语法风格</span>
  - 所有的 `vuex` 模块统一开启 `namespaced` 属性, 且根配置开发时环境设置了 strict
  - 如果你发现数据请求失败了, 那么大概率可能是他们的数据接口换了或者挂掉了, 可以看下他们的最新接口详情或者自己 `springBoot` 快速搭建个[~~反正我不写 🥲~~]

## 运行 && 打包

前提: `您必须已经安安装好了node(>=12)环境和 vue-cli(5.0+) 脚手架`

```sh
# shell: bash
# 安装项目必须的开发依赖
cd vue2-mall && npm run install

# 打开本地开发服务器
npm run serve

# 构建打包
npm run build
```

`你可以修改 package.json 下 scripts 更改对应的脚本`

`底下是一个简单的 nginx 配置示例, 用于简单部署`

```conf
server {
listen         80;
  server_name  192.xxx.xxx.xxx;
  location / {
      # 切记将实际路径换你自己的
      root      ${your-self_path}${project_name};
      index     index.html;
      try_files $uri $uri/ /index.html;
  }

  location /api {
      # 资源请求路径配置(接口可能会发生改动或者失效)
      proxy_pass http://gmall-h5-api.atguigu.cn/;
  }
}
```

## 目录结构以及部分标注

```txt
├───assets                  #静态资源文件
│   ├───css
├───components              # 通用组件
│   ├───carousel            # 轮播图
│   ├───footer              # 页脚
│   ├───header              # 页首
│   └───pagination          # 分页器
├───mock 本地数据模拟
├───network                 # 网络相关配置
│   └───api                 # 接口配置
├───pages
│   ├───AddCartSuccess      # 添加到购物车
│   ├───Center              # 支付订单中心
│   │   ├───children
│   │   │   ├───GroupOrder  # 团购订单(静态内容)
│   │   │   └───MyOrder     # 个人订单
│   ├───Detail              # 商品详情
│   │   ├───ImageList       # 商品详情小图列表
│   │   └───Zoom            # 图片预览放大镜组件
│   ├───Home                # 主页
│   │   ├───GuessYouLike    # 猜你喜欢
│   │   ├───ListContainer   # 首页三级联动列表容器(包含商品分类列表, 轮播图, 静态内容导航)
│   │   ├───MallBrand       # 底部品牌推荐
│   │   ├───MallFloor       # 商品楼层
│   │   ├───MallRank        # 竞价排行
│   │   ├───MallCommend     # 推荐
│   │   └───TypeNav         # 主页导航分类
│   ├───Login               # 登录
│   ├───Pay                 # 支付
│   ├───PaySuccess          # 支付成功页面
│   ├───Register            # 注册
│   ├───SearchResult        # 搜索结果展示列表
│   │   └───SearchSelector  # 搜索结果分类选项列表
│   ├───ShopCart            # 购物车
│   └───Trade               # 交易页面
├───route                   # 路由配置
│   └───config
├───store                   # 统一状态管理
│   └───children
│       ├───detail
│       ├───home
│       ├───search
│       ├───shopCart
│       ├───trade
│       └───user
└───utils                    # 工具类
```

## Last, Enjoy
