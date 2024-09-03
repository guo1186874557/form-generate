import type { FormItemRule } from "element-plus";
import { ElMessage } from "element-plus";
import { nanoid } from "nanoid";

import { ComponentAttrCategory, ComponentType, InputType, LabelPosition, Size } from "./enum";

export interface ElInputObjConfig {
  type?: InputType;
  label?: string;
  isSelect?: boolean;
  name?: string;
  icon?: string;
  size?: Size;
  rows?: number;
  labelWidth?: number;
  labelPosition?: LabelPosition;
  defaultValue?: string;
  placeholder?: string;
  bindKey?: string;
  collapseValue?: string[];
  required?: boolean;
  requiredMessage?: string;
  validateRegStr?: string;
  validateErrorMessage?: string;
}

export class ElInputObj {
  /** 组件名称 */
  componentName: string = "ElInput";
  /** 组件类型 */
  componentType: ComponentType = ComponentType.INPUT;
  /** 右侧配置中记录collapsed的值 */
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC, ComponentAttrCategory.RULE];

  icon: string;
  name: string;
  id: string = nanoid();
  bindKey: string;
  label: string;
  labelWidth: number;
  labelPosition: LabelPosition;
  isSelect: boolean;
  // 校验相关
  required: boolean;
  requiredMessage: string;
  validateRegStr: string;
  validateErrorMessage: string;
  type: InputType;
  size: Size;
  defaultValue: string | boolean | number | Record<string, any> | any[] | null;
  placeholder: string;
  /** 多行输入框的输入行数 */
  rows: number;

  constructor(config: ElInputObjConfig = {}) {
    this.type = config.type || InputType.TEXT;
    this.label = config.label || "input";
    this.labelWidth = config.labelWidth || 0;
    this.labelPosition = config.labelPosition || LabelPosition.AUTO;
    this.isSelect = config.isSelect || false;
    this.name = config.name || "输入框";
    this.icon = config.icon || "iconoir:input-field";
    this.size = Size.DEFAULT;
    this.rows = config.rows || 4;
    this.defaultValue = config.defaultValue || null;
    this.placeholder = config.placeholder || "请输入";
    this.bindKey = config.bindKey || "";

    this.required = config.required || false;
    this.requiredMessage = config.requiredMessage || `该字段为必填项`;
    this.validateRegStr = config.validateRegStr || "";
    this.validateErrorMessage = config.validateErrorMessage || "该字段格式不正确";
  }

  // 转化为code字符串
  toCode(formDataName: string = "formData"): string {
    return `
      <el-form-item 
        label="${this.label}" 
        ${this.required ? "required" : ""}
        :label-width="${this.labelWidth}" 
        ${this.bindKey ? `prop="${this.bindKey}"` : ""} 
        ${this.labelPosition ? `label-position="${this.labelPosition}"` : ""}>
        <el-input
          ${this.bindKey ? `v-model="${formDataName}.${this.bindKey}"` : ""}
          type="${this.type}"
          ${this.type === InputType.TEXTAREA ? `:rows="${this.rows}"` : ""}
          placeholder="${this.placeholder}"
          ${this.size === Size.DEFAULT ? "" : `size="${this.size}"`}
        >
        </el-input>
      </el-form-item>
    `;
  }

  // 转化表单所需要的数据对象
  toFormData(): Record<string, any> | null {
    if (!this.bindKey) return null;
    try {
      const defVal = JSON.parse(this.defaultValue ? (this.defaultValue as any) : null);
      return {
        [this.bindKey]: defVal,
      };
    } catch (error) {
      ElMessage.error(`字段${this.bindKey}默认值格式错误，请检查！`);
      return null;
    }
  }
}
