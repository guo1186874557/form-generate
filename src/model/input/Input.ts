import { Component } from "@/model/common/Component";
import { createFieldName } from "@/utils";

export enum InputType {
  TEXT = "",
  PASSWORD = "password",
  TEXTAREA = "textarea",
}

export interface InputAttrInterface {
  placeholder: string;
  clearable: boolean;
  readonly: boolean;
  type: InputType;
  rows: number;
  defaultValue: string;
  bindField: string;
}

export class Input extends Component<InputAttrInterface> {
  constructor(attr: Partial<InputAttrInterface> = {}) {
    const defaultAttr: InputAttrInterface = {
      placeholder: "请输入",
      clearable: false,
      readonly: false,
      type: InputType.TEXT,
      rows: 4,
      defaultValue: "",
      bindField: createFieldName(),
    };
    super({ ...defaultAttr, ...attr });
  }
  override clone(): Input {
    const newInput = new Input(this.attr);
    newInput.attr.bindField = createFieldName();
    return newInput;
  }
}
