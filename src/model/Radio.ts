import { cloneDeep } from "lodash-es";
import { nanoid } from "nanoid";

import { type BasicAttrInterface, BasicComponent } from "@/model/common/BasicComponent";
import type { DepType } from "@/model/common/Component";
import type { OptionsItemInterface } from "@/types";
import { createFieldName } from "@/utils";

interface RadioAttrInterface {
  options: OptionsItemInterface[];
}

export class Radio extends BasicComponent<RadioAttrInterface> {
  constructor(attr: Partial<RadioAttrInterface> = {}, basicAttr: Partial<BasicAttrInterface> = {}) {
    const defaultAttr: RadioAttrInterface = {
      options: [
        { label: "选项1", value: "1", id: nanoid() },
        { label: "选项2", value: "2", id: nanoid() },
      ],
    };
    super({ ...defaultAttr, ...attr }, basicAttr);
  }

  override clone(): Radio {
    const newRadio = new Radio(this.attr, this.basicAttr);
    newRadio.basicAttr.bindField = createFieldName();
    newRadio.attr.options = cloneDeep(this.attr.options);
    return newRadio;
  }

  override getDeps(): DepType[] {
    return [
      {
        import: ["ElRadioGroup", "ElRadio"],
        from: "element-plus",
      },
    ];
  }

  override toTemplate(): string {
    return `<el-radio-group v-model="formData.${this.basicAttr.bindField}">
              ${this.attr.options.map((option) => `<el-radio value="${option.value}" >${option.label}</el-radio>`).join("\n")}
            </el-radio-group>`;
  }
}
