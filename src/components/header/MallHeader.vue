<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 状态 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 未登录情况 -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>

          <!-- 登录后的情况 -->
          <p v-else>
            <span> {{ userName }}</span>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>

        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <a>我的尚品汇</a>
          <a>尚品汇会员</a>
          <a>企业采购</a>
          <a>关注尚品汇</a>
          <a>合作招商</a>
          <a>商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="图片貌似没加载出来..." />
        </router-link>
      </h1>

      <div class="searchArea">
        <form action="###" class="searchForm">
          <!-- 搜索输入框 -->
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model.trim="keyword"
            @keydown.enter.prevent="goSearch"
          />
          <!-- 搜索按钮 -->
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "MallHeader",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    // 跳转到搜索区域
    goSearch() {
      // 路由 query 传递参数, 字符串形式
      // this.$router.push(`/search/${this.keyword}/`);
      const location = {
        name: "search",
        // 使用 undefined 可以解决路径为空串的情况
        params: { keyword: this.keyword || undefined },
      };
      // 如果路径中也包含了 query 参数就跟着传递过去(空对象的情况也传个空对象过去)
      location.query = this.$route.query || {};
      this.$router.push(location);
    },

    // 退出登录
    logout() {
      this.$store
        .dispatch("loginAndRegister/logout")
        .then(() => {
          this.$router.replace("/home");
        })
        // 发送给服务端删除登录状态失败的情况
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    // 映射用户名
    ...mapGetters("loginAndRegister", ["userName"]),
  },

  mounted() {
    this.$bus.$on("clearKeyword", () => {
      this.keyword = "";
    });
  },
};
</script>

<style lang="scss" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
