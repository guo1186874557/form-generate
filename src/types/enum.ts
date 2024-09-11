/** 组件属性分类 */
export enum ComponentAttrCategory {
  BASIC = "basic",
  /** 设置字段属性 */
  FIELD = "field",
  /** 校验规则相关属性 */
  RULE = "rule",
}

/** 组件分类 */
export enum ComponentCategory {
  BASIC = "basic",
}

/**
 * 组件类型
 */
export enum ComponentType {
  INPUT = "input",
}

export enum Size {
  SMALL = "small",
  LARGE = "large",
  AUTO = "", // componentObj 使用 会根据全局组件大小自动调整大小
}
