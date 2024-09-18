import { cloneDeep } from "lodash-es";
import { nanoid } from "nanoid";

import { type BasicAttrInterface, BasicComponent } from "@/model/common/BasicComponent";
import type { DepType } from "@/model/common/Component";
import type { OptionsItemInterface } from "@/types";

export interface CheckboxAttrInterface {
  options: OptionsItemInterface[];
}

export class Checkbox extends BasicComponent<CheckboxAttrInterface> {
  constructor(
    attr: Partial<CheckboxAttrInterface> = {},
    basicAttr: Partial<BasicAttrInterface> = { defaultValue: [] },
  ) {
    const defaultAttr: CheckboxAttrInterface = {
      options: [
        { label: "选项1", value: "1", id: nanoid() },
        { label: "选项2", value: "2", id: nanoid() },
      ],
    };
    super({ ...defaultAttr, ...attr }, basicAttr);
  }

  override clone(): Checkbox {
    return new Checkbox(cloneDeep(this.attr), cloneDeep(this.basicAttr));
  }
  override getDeps(): DepType[] {
    return [
      { import: ["ElCheckbox"], from: "element-plus" },
      { import: ["ElCheckboxGroup"], from: "element-plus" },
    ];
  }
  override toTemplate(): string {
    return `<el-checkbox-group v-model="formData.${this.basicAttr.bindField}">
              ${this.attr.options.map((option) => `<el-checkbox label="${option.label}" value="${option.value}" />`).join("\n")}
            </el-checkbox-group>`;
  }
}
