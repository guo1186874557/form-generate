import type { BasicComponent } from "@/model/common/BasicComponent";
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
}
export class FormItem extends Component<FormItemAttrInterface> {
  constructor(
    attr: Partial<FormItemAttrInterface> = {},
    public child: BasicComponent,
  ) {
    const defaultAttr: FormItemAttrInterface = {
      label: "标签名",
      labelPosition: LabelPosition.AUTO,
      labelWidth: 80,
      size: Size.AUTO,
      required: false,
      requiredMsg: "该字段为必填项",
      pattern: "",
      patternMsg: "格式不符合要求",
    };
    super({ ...defaultAttr, ...attr });
  }

  override clone(): FormItem {
    const newChild = this.child.clone();
    return new FormItem(this.attr, newChild);
  }
}
