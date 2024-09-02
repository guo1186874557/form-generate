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
}

export class ElInputObj {
  /** 组件名称 */
  componentName: string = "ElInput";
  /** 组件类型 */
  componentType: ComponentType = ComponentType.INPUT;
  /** 右侧配置中记录collapsed的值 */
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC];

  icon: string;
  name: string;
  id: string = nanoid();
  bindKey: string;
  label: string;
  labelWidth: number;
  labelPosition: LabelPosition;
  type: InputType;
  isSelect: boolean;
  size: Size;
  defaultValue: string;
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
    this.defaultValue = config.defaultValue || "";
    this.placeholder = config.placeholder || "请输入";
    this.bindKey = config.bindKey || "";
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
          type="${this.type}"
          :rows="${this.rows}"
          placeholder="${this.placeholder}"
          size="${this.size}"
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
