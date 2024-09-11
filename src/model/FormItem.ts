import { nanoid } from "nanoid";

import { Size } from "@/types/enum";

export interface FormItemAttrInterface {
  label: string;
  labelPosition: string;
  labelWidth: number;
  size: Size;
  required: boolean;
  requiredMsg: string;
  pattern: string;
  patternMsg: string;
  prop: string;
}
export class FormItem {
  id: string = nanoid();
  selected: boolean = false;
  attr: FormItemAttrInterface;
  children: any[] = [];
  constructor(attr: Partial<FormItemAttrInterface> = {}, child: any | any[]) {
    const defaultAttr: FormItemAttrInterface = {
      label: "标签名",
      labelPosition: "right",
      labelWidth: 80,
      size: Size.AUTO,
      required: false,
      requiredMsg: "该字段为必填项",
      pattern: "",
      patternMsg: "格式不符合要求",
      prop: "",
    };
    this.attr = { ...defaultAttr, ...attr };
    if (child) {
      if (Array.isArray(child)) {
        this.children.push(...child);
      } else {
        this.children.push(child);
      }
    }
  }
}
