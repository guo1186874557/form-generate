import { ElRadio, ElRadioGroup } from "element-plus";
import type { VNode } from "vue";

import { ComponentObj, type ComponentObjConfig } from "@/el-obj/component";
import { ComponentAttrCategory, FieldType, LabelPosition, Size } from "@/el-obj/enum";

export interface RadioObjConfig extends Partial<ComponentObjConfig> {
  defaultValue?: boolean | number | string | null;
  options?: { label: string; value: boolean | number | string }[];
}
export class RadioObj extends ComponentObj {
  componentName = "ElRadioGroup";
  collapseValue = [ComponentAttrCategory.BASIC, ComponentAttrCategory.RULE];
  icon = "akar-icons:radio-fill";
  name = "单选框";

  defaultValue: boolean | number | string | null = null;
  options: { label: string; value: boolean | number | string }[] = [];
  constructor(config: RadioObjConfig = {}) {
    super(
      config.label || "radio",
      config.labelWidth || 0,
      config.labelPosition || LabelPosition.AUTO,
      config.size || Size.AUTO,
      config.disabled || false,
      config.required || false,
      config.requiredMessage || "该字段为必填项",
      config.fieldType || FieldType.STRING,
    );

    this.options = config.options || [
      { label: "选项1", value: "1" },
      { label: "选项2", value: "2" },
      { label: "选项3", value: "3" },
    ];
  }

  clone() {
    return new RadioObj(this);
  }

  parserTemplateSelfAttr() {
    return {};
  }

  toTemplate(): string {
    const attrObj = this.parserTemplateAttr();
    return `
     <el-form-item ${attrObj.size} ${attrObj.label} ${attrObj.labelPosition} ${attrObj.labelWidth} ${attrObj.prop} ${attrObj.rules()}>
        <el-radio-group ${attrObj.vModel} ${attrObj.disabled}>
          ${this.options
            .map((item) => {
              return `<el-radio :value="${item.value}">${item.label}</el-radio>`;
            })
            .join("\n")}
        </el-radio-group>
      </el-form-item>
    `;
  }
  render(): VNode {
    return h(
      ElRadioGroup,
      {
        modelValue: this.defaultValue as any,
        disabled: this.disabled,
      },
      {
        default: () =>
          this.options.map((item) => {
            return h(
              ElRadio,
              {
                key: item.value as any,
                value: item.value,
              },
              {
                default: () => item.label,
              },
            );
          }),
      },
    );
  }
}
