import { ComponentObj, type ComponentObjConfig } from "@/el-obj/component";

import { ComponentAttrCategory, ComponentType, FieldType, InputType, LabelPosition, Size } from "./enum";

export interface InputObjConfig extends Partial<ComponentObjConfig> {
  defaultValue?: string | number;
  rows?: number;
  type?: InputType;
}
export class InputObj extends ComponentObj {
  componentName = "ElInput";
  componentType = ComponentType.INPUT;
  collapseValue = [ComponentAttrCategory.BASIC, ComponentAttrCategory.RULE];
  icon = "iconoir:input-field";
  name = "输入框";

  defaultValue: string | number = "";
  rows?: number;
  type?: InputType;
  constructor(config: InputObjConfig = {}) {
    super(
      config.label || "input",
      config.labelWidth || 0,
      config.labelPosition || LabelPosition.AUTO,
      config.size || Size.DEFAULT,
      config.disabled || false,
      config.placeholder || "请输入",
      config.required || false,
      config.requiredMessage || "该字段为必填项",
      config.validateRegStr || "",
      config.validateErrorMessage || "输入格式不正确",
      config.fieldType || FieldType.STRING,
    );
    this.defaultValue = config.defaultValue || "";
    this.rows = config.rows || 4;
    this.type = config.type || InputType.TEXT;
  }
  parserTemplateSelfAttr() {
    return {
      rows: this.type === InputType.TEXTAREA ? `rows="${this.rows}"` : "",
      type: this.type !== InputType.TEXT ? `type="${this.type}"` : "",
    };
  }
  toTemplate(): string {
    const attrObj = this.parserTemplateAttr();
    const selfAttrObj = this.parserTemplateSelfAttr();
    return `
      <el-form-item ${attrObj.label} ${attrObj.labelPosition} ${attrObj.labelWidth} ${attrObj.prop} ${attrObj.rules()}>
        <el-input ${attrObj.vModel} ${attrObj.disabled} ${attrObj.size} ${attrObj.placeholder} ${selfAttrObj.rows} ${selfAttrObj.type}></el-input>
      </el-form-item>
    `;
  }
  toFormData(): Record<string, any> | null {
    if (!this.bindKey) return null;
    return {
      [this.bindKey]: this.defaultValue,
    };
  }

  clone(): InputObj {
    return new InputObj(this as InputObjConfig);
  }
}
