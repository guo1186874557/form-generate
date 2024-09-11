import { nanoid } from "nanoid";

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

export class Input {
  id: string = nanoid();
  selected: boolean = false;
  attr: InputAttrInterface;
  constructor(attr: Partial<InputAttrInterface> = {}) {
    const defaultAttr: InputAttrInterface = {
      placeholder: "请输入",
      clearable: false,
      readonly: false,
      type: InputType.TEXT,
      rows: 4,
      defaultValue: "",
      bindField: "",
    };
    this.attr = { ...defaultAttr, ...attr };
  }
}
