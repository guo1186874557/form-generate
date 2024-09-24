import { cloneDeep } from "lodash-es";
import { nanoid } from "nanoid";

import { type BasicAttrInterface, BasicComponent } from "@/model/common/BasicComponent";
import type { DepType } from "@/model/common/Component";
import type { OptionsItemInterface } from "@/types";
import { createFieldName } from "@/utils";

export interface SelectAttrInterface {
  options: OptionsItemInterface[];
  multiple: boolean;
  clearable: boolean;
  placeholder: string;
}

export class Select extends BasicComponent<SelectAttrInterface> {
  constructor(attr: Partial<SelectAttrInterface> = {}, basicAttr: Partial<BasicAttrInterface> = {}) {
    const defaultAttr: SelectAttrInterface = {
      options: [
        { label: "选项1", value: "1", id: nanoid() },
        { label: "选项2", value: "2", id: nanoid() },
      ],
      multiple: false,
      clearable: true,
      placeholder: "请选择",
    };
    const _attr = { ...defaultAttr, ...attr };
    const defaultBasicAttr: Partial<BasicAttrInterface> = {
      defaultValue: _attr.multiple ? [] : typeof _attr.options[0].value === "string" ? "" : null,
    };
    super(_attr, { ...defaultBasicAttr, ...basicAttr });
  }

  override getDeps(): DepType[] {
    return [
      {
        import: ["ElSelect", "ElOption"],
        from: "element-plus",
      },
    ];
  }

  override toTemplate(): string {
    const parserSelectAttr = {
      vModel: `v-model="formData.${this.basicAttr.bindField}"`,
      multiple: this.attr.multiple ? "multiple" : "",
      clearable: this.attr.clearable ? "clearable" : "",
      placeholder: this.attr.placeholder ? `placeholder="${this.attr.placeholder}"` : "",
    };
    return `<el-select ${Object.values(parserSelectAttr).filter(Boolean).join(" ")}>
              ${this.attr.options
                .map((v) => {
                  const parserOptionAttr = {
                    disabled: v.disabled ? "disabled" : "",
                    value: typeof v.value === "string" ? `value="${v.value}"` : `:value="${v.value}"`,
                    label: `label="${v.label}"`,
                  };
                  return `<el-option ${Object.values(parserOptionAttr).filter(Boolean).join(" ")}></el-option>`;
                })
                .join("\n")}
            </el-select>`;
  }

  override clone(): Select {
    const newSelect = new Select(this.attr, this.basicAttr);
    newSelect.attr.options = cloneDeep(this.attr.options);
    newSelect.basicAttr.bindField = createFieldName();
    return newSelect;
  }
}
