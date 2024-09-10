// 组件分为
// - 基础组件：基础组件是指一些最基本的组件，比如按钮、输入框、表格等。
import { createFieldName } from "component-object/src/utils";

import { FieldType, LabelPosition, Size } from "../helper/enum";
import { ComponentObject } from "./ComponentObject";

/** 组件属性 */
export interface BasicComponentAttrInterface {
  bindField: string;
  fieldType: FieldType;
  size: Size;
  label: string;
  labelWidth: number;
  labelWidthAuto: boolean;
  labelPosition: LabelPosition;
  required: boolean;
  requiredMessage: string;
  disabled: false;
}
export const getComponentAttrDefault = (attr: Partial<BasicComponentAttrInterface>): BasicComponentAttrInterface => {
  return {
    fieldType: FieldType.STRING,
    label: "标签名称",
    labelWidth: 80,
    labelWidthAuto: true,
    labelPosition: LabelPosition.AUTO,
    required: false,
    requiredMessage: "该字段为必填项",
    disabled: false,
    size: Size.AUTO,
    bindField: createFieldName(),
    ...attr,
  };
};

/** 组件对象基类 */
export abstract class BasicComponentObject extends ComponentObject {
  /** 组件属性 */
  abstract attr: BasicComponentAttrInterface;

  protected constructor(tag: string, name: string, icon: string) {
    super(tag, name, icon);
  }

  /** 解析组件属性 */
  abstract parseSelfAttr(): Record<string, any>;
  parseAttr() {
    const attr = this.attr;
    return {
      label: `label="${attr.label}"`,
      labelWidth: attr.labelWidthAuto ? "" : `label-width="${attr.labelWidth}px"`,
      labelPosition: attr.labelPosition === LabelPosition.AUTO ? "" : `label-position="${attr.labelPosition}"`,
      disabled: attr.disabled ? "disabled" : "",
      size: attr.size === Size.AUTO ? "" : `size="${attr.size}"`,
      rules: attr.required ? `rules=[{ required: true, message: "${attr.requiredMessage}" }]` : "",
    };
  }
}
