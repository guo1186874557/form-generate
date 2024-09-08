import { InputType } from "../helper/enum";
import { type ComponentAttrInterface, ComponentObject, getComponentAttrDefault } from "./base";

export interface InputAttrInterface extends ComponentAttrInterface {
  placeholder: string;
  clearable: boolean;
  readonly: boolean;
  type: InputType;
  validateRegStr: string;
  validateErrorMessage: string;
}

export class InputComponentObject extends ComponentObject {
  attr: InputAttrInterface;
  constructor(attr: Partial<InputAttrInterface> = {}) {
    super("el-input", "输入框", "iconoir:input-field");
    const defaultAttr: InputAttrInterface = {
      ...getComponentAttrDefault(attr as ComponentAttrInterface),
      placeholder: "请输入内容",
      clearable: true,
      readonly: false,
      type: InputType.TEXT,
      required: false,
      validateRegStr: "",
      validateErrorMessage: "输入格式不正确",
    };
    this.attr = { ...defaultAttr, ...attr };
  }

  parseSelfAttr() {
    const attr = this.attr;
    return {
      placeholder: attr.placeholder ? `placeholder="${attr.placeholder}"` : "",
      clearable: attr.clearable ? "clearable" : "",
      readonly: attr.readonly ? "readonly" : "",
      type: attr.type !== InputType.TEXT ? `type="${attr.type}"` : "",
      rules: () => {
        const rules: string[] = [];
        if (attr.required) {
          rules.push(`{ required: true, message: '${attr.requiredMessage}' }`);
        }
        if (attr.validateRegStr) {
          rules.push(`{ pattern: /${attr.validateRegStr}/, message: '${attr.validateErrorMessage}' }`);
        }
        return rules.length > 0 ? `:rules="[${rules}]"` : "";
      },
    };
  }

  toSfcTemplate(): string {
    const commonAttr = this.parseAttr();
    const attr = this.parseSelfAttr();
    const formItemAttr = [
      commonAttr.label,
      commonAttr.labelWidth,
      commonAttr.labelPosition,
      commonAttr.prop,
      commonAttr.size,
      attr.rules(),
    ];
    const inputAttr = [commonAttr.vModel, attr.placeholder, attr.type, attr.clearable, attr.readonly];
    return `
      <el-form-item ${formItemAttr.filter(Boolean).join(" ")}>
        <el-input ${inputAttr.filter(Boolean).join(" ")}></el-input>
      </el-form-item>
    `;
  }
}
