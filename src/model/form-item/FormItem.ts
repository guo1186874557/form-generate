import { Component } from "@/model/common/Component";
import { LabelPosition, Size } from "@/types/enum";

export interface FormItemAttrInterface {
  label: string;
  labelPosition: LabelPosition;
  labelWidth: number;
  size: Size;
  required: boolean;
  requiredMsg: string;
  pattern: string;
  patternMsg: string;
  prop: string;
}
export class FormItem extends Component<FormItemAttrInterface> {
  children: Component[] = [];
  constructor(attr: Partial<FormItemAttrInterface> = {}, child?: Component | Component[]) {
    const defaultAttr: FormItemAttrInterface = {
      label: "标签名",
      labelPosition: LabelPosition.AUTO,
      labelWidth: 80,
      size: Size.AUTO,
      required: false,
      requiredMsg: "该字段为必填项",
      pattern: "",
      patternMsg: "格式不符合要求",
      prop: "",
    };
    super({ ...defaultAttr, ...attr });
    if (child) {
      if (Array.isArray(child)) {
        this.children.push(...child);
      } else {
        this.children.push(child);
      }
    }
  }

  override clone(): FormItem {
    const newChild = this.children.map((item) => item.clone());
    return new FormItem({ ...this.attr, prop: newChild[0].attr.bindField as string }, newChild);
  }
}
