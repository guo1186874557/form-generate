import { nanoid } from "nanoid";

import { ComponentType, InputType, LabelPosition, Size } from "./enum";

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
}

export class ElInputObj {
  icon: string;
  name: string;
  id: string = nanoid();
  componentType: ComponentType = ComponentType.INPUT;
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
    this.bindKey = config.bindKey || this.id;
  }
}
