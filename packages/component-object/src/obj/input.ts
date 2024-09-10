import { ElFormItem, ElInput } from "element-plus";
import type { VNode } from "vue";

import { ComponentAttrCategory, InputType } from "../helper/enum";
import { createFieldName } from "../utils";
import { type BasicComponentAttrInterface, BasicComponentObject, getComponentAttrDefault } from "./basic";
import type { SfCConfigInterface } from "./ComponentObject";

export interface InputAttrInterface extends BasicComponentAttrInterface {
  placeholder: string;
  clearable: boolean;
  readonly: boolean;
  type: InputType;
  validateRegStr: string;
  validateErrorMessage: string;
  rows: number;
  defaultValue: string;
}

export class InputComponentObject extends BasicComponentObject {
  attr: InputAttrInterface;
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC, ComponentAttrCategory.RULE];

  constructor(attr: Partial<InputAttrInterface> = {}) {
    super("el-input", "输入框", "iconoir:input-field");
    const defaultAttr: InputAttrInterface = {
      ...getComponentAttrDefault(attr as BasicComponentAttrInterface),
      placeholder: "请输入内容",
      clearable: true,
      readonly: false,
      type: InputType.TEXT,
      required: false,
      validateRegStr: "",
      validateErrorMessage: "输入格式不正确",
      rows: 4,
      defaultValue: "",
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
      rows: attr.type === InputType.TEXTAREA ? `rows="${attr.rows}"` : "",
      vModel: `v-model="formData.${attr.bindField}"`,
      prop: `prop="${attr.bindField}"`,
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
  sfc: SfCConfigInterface = {
    import: {
      "element-plus": ["ElInput"],
    },
  };
  toSfcTemplate(): string {
    const commonAttr = this.parseAttr();
    const attr = this.parseSelfAttr();
    const formItemAttr = [
      commonAttr.label,
      commonAttr.labelWidth,
      commonAttr.labelPosition,
      commonAttr.size,
      attr.prop,
      attr.rules(),
    ];
    const inputAttr = [attr.vModel, attr.placeholder, attr.type, attr.clearable, attr.readonly, attr.rows];
    return `<el-form-item ${formItemAttr.filter(Boolean).join(" ")}>
              <el-input ${inputAttr.filter(Boolean).join(" ")}></el-input>
            </el-form-item>`;
  }
  clone(): InputComponentObject {
    const newInput = new InputComponentObject(this.attr);
    newInput.attr.bindField = createFieldName();
    return newInput;
  }
  render(): VNode {
    const inputVNode = h(ElInput, {
      modelValue: this.attr.defaultValue,
      type: this.attr.type,
      disabled: this.attr.disabled,
      placeholder: this.attr.placeholder,
      rows: this.attr.type === InputType.TEXTAREA ? this.attr.rows : undefined,
    });
    return h(
      ElFormItem,
      {
        label: this.attr.label,
        labelPosition: this.attr.labelPosition as any,
        labelWidth: this.attr.labelWidthAuto ? undefined : this.attr.labelWidth,
        size: this.attr.size,
        required: this.attr.required,
        class: "m-0",
      },
      { default: () => inputVNode },
    );
  }
}
