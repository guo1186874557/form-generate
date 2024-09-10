export enum LabelPosition {
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  AUTO = "", // componentObj 使用 会根据全局组件位置自动调整位置
}

export enum Size {
  SMALL = "small",
  LARGE = "large",
  AUTO = "", // componentObj 使用 会根据全局组件大小自动调整大小
}

/** 输入框类型 */
export enum InputType {
  TEXT = "text",
  PASSWORD = "password",
  TEXTAREA = "textarea",
}

/** 字段数据类型 */
export enum FieldType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  ARRAY = "array",
  OBJECT = "object",
}

/** 组件属性分类 */
export enum ComponentAttrCategory {
  BASIC = "basic",
  /** 设置字段属性 */
  FIELD = "field",
  /** 校验规则相关属性 */
  RULE = "rule",
}
