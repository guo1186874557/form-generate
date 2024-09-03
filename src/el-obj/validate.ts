import type { FormItemRule } from "element-plus";

/**
 * 手机号校验函数
 */
export const phoneRule: FormItemRule["validator"] = (rule, value, callback) => {
  const reg = /^1[3-9]\d{9}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号"));
  }
};

/**
 * 邮箱校验函数
 */
export const emailRule: FormItemRule["validator"] = (rule, value, callback) => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的邮箱"));
  }
};

/**
 * 中国大陆身份证验证
 */
export const idCardRule: FormItemRule["validator"] = (rule, value, callback) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的身份证号"));
  }
};

/**
 * 自定义校验
 */
export const customRule = (reg: RegExp, errorMessage: string): FormItemRule["validator"] => {
  return (rule, value, callback) => {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error(errorMessage));
    }
  };
};
