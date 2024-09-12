import { FormItem } from "@/model";
import { Component } from "@/model/common/Component";
import { LabelPosition, Size } from "@/types/enum";

interface FormAttrInterface {
  labelWidth: number;
  labelWidthAuto: boolean;
  labelPosition: LabelPosition;
  size: Size;
}

export class Form extends Component<FormAttrInterface> {
  children: FormItem[] = [];
  constructor(attr: Partial<FormAttrInterface> = {}, child?: FormItem | FormItem[]) {
    const defaultAttr: FormAttrInterface = {
      labelWidth: 80,
      labelWidthAuto: true,
      labelPosition: LabelPosition.RIGHT,
      size: Size.AUTO,
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
  override clone(): Form {
    return new Form(
      this.attr,
      this.children.map((v) => v.clone()),
    );
  }
}
