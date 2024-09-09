import { FieldType, InputType, LabelPosition } from "../helper/enum";
import { createFieldName } from "../utils/createFieldName";
import { ComponentObject } from "./base";

export interface InputAttrInterface {
  bindField: string;
  fieldType: FieldType;
  placeholder: string;
  clearable: boolean;
  label: string;
  labelWidth: number;
  labelWidthAuto: boolean;
  labelPosition: LabelPosition;
  readonly: boolean;
  disabled: boolean;
  type: InputType;
  required: boolean;
  requiredMessage: string;
  validateRegStr: string;
  validateErrorMessage: string;
}

export class InputComponentObject extends ComponentObject {
  attr: InputAttrInterface;
  constructor(attr: Partial<InputAttrInterface> = {}) {
    super("el-input", "输入框", "iconoir:input-field");
    const defaultAttr: InputAttrInterface = {
      bindField: createFieldName(),
      fieldType: FieldType.STRING,
      placeholder: "请输入内容",
      clearable: true,
      label: "input",
      labelWidth: 80,
      labelWidthAuto: true,
      labelPosition: LabelPosition.AUTO,
      readonly: false,
      disabled: false,
      type: InputType.TEXT,
      required: false,
      requiredMessage: "该字段为必填项",
      validateRegStr: "",
      validateErrorMessage: "",
    };
    this.attr = { ...defaultAttr, ...attr };
  }
  toCode(): string {
    return "";
  }
}

console.log(new InputComponentObject());
