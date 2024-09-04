import { ElMessage } from "element-plus";
import { nanoid } from "nanoid";

import { ComponentAttrCategory, ComponentType, InputType, LabelPosition, Size } from "./enum";

export interface ElInputObjConfig {
  // formItem属性
  label?: string;
  labelWidth?: number;
  labelPosition?: LabelPosition;
  // 左侧列表相关属性
  name?: string;
  icon?: string;


  // 基本属性
  size?: Size;
  type?: InputType;
  defaultValue?: string | boolean | number | Record<string, any> | any[] | null;
  placeholder?: string;
  disabled?: boolean;
  rows?: number; // 多行输入框独有

  // 校验相关
  bindKey?: string;
  required?: boolean;
  requiredMessage?: string;
  validateRegStr?: string;
  validateErrorMessage?: string;
}

type ExcludeKeys = "id" | "bindKey" | "componentName" | "componentType" | "collapseValue" | "toCode" | "toFormData" | "isSelect";
export type GetElObjConfig<T> = T extends ElInputObj ? Omit<T, ExcludeKeys> : never;

export class ElInputObj {
  id: string = nanoid();

  /** 组件名称 */
  componentName: string = "ElInput";
  /** 组件类型 */
  componentType: ComponentType = ComponentType.INPUT;
  /** 右侧配置中记录collapsed的值 */
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC, ComponentAttrCategory.RULE];

  // 左侧列表相关属性
  icon: string;
  name: string;

  // 基本属性
  label: string;
  labelWidth: number;
  labelPosition: LabelPosition;
  type: InputType;
  size: Size;
  defaultValue: string | boolean | number | Record<string, any> | any[] | null;
  placeholder: string;
  disabled: boolean;
  // 多行输入框独有
  rows: number;

  // 校验相关
  bindKey: string = "";
  required: boolean;
  requiredMessage: string;
  validateRegStr: string;
  validateErrorMessage: string;

  // 自定义操作属性
  isSelect: boolean = false; // 是否选中

 


  constructor(config: ElInputObjConfig = {}) {
    this.type = config.type || InputType.TEXT;
    this.label = config.label || "input";
    this.labelWidth = config.labelWidth || 0;
    this.labelPosition = config.labelPosition || LabelPosition.AUTO;
    this.name = config.name || "输入框";
    this.icon = config.icon || "iconoir:input-field";
    this.size = config.size || Size.DEFAULT;
    this.rows = config.rows || 4;
    this.defaultValue = config.defaultValue || null;
    this.placeholder = config.placeholder || "请输入";
    this.required = config.required || false;
    this.requiredMessage = config.requiredMessage || `该字段为必填项`;
    this.validateRegStr = config.validateRegStr || "";
    this.validateErrorMessage = config.validateErrorMessage || "该字段格式不正确";
    this.disabled = config.disabled || false;
  }

  // 转化为code字符串
  toCode(formDataName: string = "formData"): string {
    return `
      <el-form-item 
        label="${this.label}" 
        :label-width="${this.labelWidth}" 
        ${this.bindKey ? `prop="${this.bindKey}"` : ""} 
        ${this.labelPosition ? `label-position="${this.labelPosition}"` : ""}>
        <el-input
          ${this.bindKey ? `v-model="${formDataName}.${this.bindKey}"` : ""}
          ${this.disabled ? "disabled" : ""}
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
