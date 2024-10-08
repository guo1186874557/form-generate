/** 组件属性分类 */
export enum ComponentAttrCategory {
  BASIC = "basic",
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
  RADIO = "radio",
  CHECKBOX = "checkbox",
  SELECT = "select",
  DATA_PICKER = "data-picker",
}

export enum Size {
  SMALL = "small",
  LARGE = "large",
  AUTO = "", //  使用 会根据全局组件大小自动调整大小
}

export enum LabelPosition {
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  AUTO = "", //  使用 会根据全局组件位置自动调整位置
}

export enum DatePickerType {
  DATE = "date",
  DATETIME = "datetime",
  YEAR = "year",
  MONTH = "month",
  EMPTY = "", //  默认为空，由组件自行决定
}
