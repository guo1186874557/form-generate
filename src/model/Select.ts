import { nanoid } from "nanoid";

import { type BasicAttrInterface, BasicComponent } from "@/model/common/BasicComponent";

export interface SelectAttrInterface {
  options:
    | { label: string; value: string; id: string; disabled?: boolean }[]
    | { label: string; value: number; id: string; disabled?: boolean }[];
  multiple: boolean;
}

export class Select extends BasicComponent<SelectAttrInterface> {
  constructor(attr: Partial<SelectAttrInterface> = {}, basicAttr: Partial<BasicAttrInterface> = {}) {
    const defaultAttr: SelectAttrInterface = {
      options: [
        { label: "选项1", value: "1", id: nanoid() },
        { label: "选项2", value: "2", id: nanoid() },
      ],
      multiple: false,
    };
    const _attr = { ...defaultAttr, ...attr };
    const defaultBasicAttr: Partial<BasicAttrInterface> = {
      defaultValue: _attr.multiple ? [] : typeof _attr.options[0].value === "string" ? "" : null,
    };
    super(_attr, { ...defaultBasicAttr, ...basicAttr });
  }
}
