import { ElInput } from "element-plus";
import type { VNode } from "vue";

import { ComponentObj, type ComponentObjConfig } from "@/el-obj/component";

import { ComponentAttrCategory, FieldType, InputType, LabelPosition, Size } from "./enum";

export interface InputObjConfig extends Partial<ComponentObjConfig> {
  defaultValue?: string | number;
  rows?: number;
  type?: InputType;
  placeholder?: string;
  validateRegStr?: string;
  validateErrorMessage?: string;
}
export class InputObj extends ComponentObj {
  componentName = "ElInput";
  collapseValue = [ComponentAttrCategory.BASIC, ComponentAttrCategory.RULE];
  icon = "iconoir:input-field";
  name = "输入框";

  defaultValue: string | number = "";
  rows?: number;
  type?: InputType;
  placeholder: string;
  validateRegStr: string;
  validateErrorMessage: string;
  constructor(config: InputObjConfig = {}) {
    super(
      config.label || "input",
      config.labelWidth || 0,
      config.labelPosition || LabelPosition.AUTO,
      config.size || Size.AUTO,
      config.disabled || false,
      config.required || false,
      config.requiredMessage || "该字段为必填项",
      config.fieldType || FieldType.STRING,
    );
    this.defaultValue = config.defaultValue || "";
    this.rows = config.rows || 4;
    this.type = config.type || InputType.TEXT;
    this.placeholder = config.placeholder || "请输入";
    this.validateRegStr = config.validateRegStr || "";
    this.validateErrorMessage = config.validateErrorMessage || "输入格式不正确";
  }
  parserTemplateSelfAttr() {
    return {
      placeholder: this.placeholder ? `placeholder="${this.placeholder}"` : "",
      rows: this.type === InputType.TEXTAREA ? `rows="${this.rows}"` : "",
      type: this.type !== InputType.TEXT ? `type="${this.type}"` : "",
      rules: () => {
        const rules: string[] = [];
        if (this.required) {
          rules.push(`{ required: true, message: '${this.requiredMessage}' }`);
        }
        if (this.validateRegStr) {
          rules.push(`{ pattern: /${this.validateRegStr}/, message: '${this.validateErrorMessage}' }`);
        }
        return rules.length > 0 ? `:rules="[${rules}]"` : "";
      },
    };
  }
  toTemplate(): string {
    const attrObj = this.parserTemplateAttr();
    const selfAttrObj = this.parserTemplateSelfAttr();
    return `
      <el-form-item ${attrObj.size} ${attrObj.label} ${attrObj.labelPosition} ${attrObj.labelWidth} ${attrObj.prop} ${selfAttrObj.rules()}>
        <el-input ${attrObj.vModel} ${attrObj.disabled}  ${selfAttrObj.placeholder} ${selfAttrObj.rows} ${selfAttrObj.type}></el-input>
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
  render(): VNode {
    return h(ElInput, {
      modelValue: this.defaultValue,
      type: this.type,
      disabled: this.disabled,
      placeholder: this.placeholder,
      rows: this.type === InputType.TEXTAREA ? this.rows : undefined,
    });
  }
}
