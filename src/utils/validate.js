import VeeValidate from "vee-validate";
import Vue from "vue";
import zh_CN from "vee-validate/dist/locale/zh_CN";

Vue.use(VeeValidate);

VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`,
  },
  attributes: {
    // 校验字段
    phone: "手机号码",
    code: "验证码",
    password: "密码",
    confirmPassword: "确认密码",
    isAllow: "协议",
  },
});

// 自定义校验规则
VeeValidate.Validator.extend("needAllow", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});
