import { type BasicAttrInterface, BasicComponent } from "@/model/common/BasicComponent";
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
}

export class Input extends BasicComponent<InputAttrInterface> {
  constructor(attr: Partial<InputAttrInterface> = {}, basicAttr: Partial<BasicAttrInterface> = {}) {
    const defaultAttr: InputAttrInterface = {
      placeholder: "请输入",
      clearable: false,
      readonly: false,
      type: InputType.TEXT,
      rows: 4,
    };
    super({ ...defaultAttr, ...attr }, basicAttr);
  }
  override clone(): Input {
    const newInput = new Input(this.attr, this.basicAttr);
    newInput.basicAttr.bindField = createFieldName();
    return newInput;
  }
}
