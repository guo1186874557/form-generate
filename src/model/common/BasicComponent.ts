import { Component } from "@/model/common/Component";
import { createFieldName } from "@/utils";

export interface BasicAttrInterface {
  bindField: string;
  defaultValue: any;
  disabled: boolean;
}

export class BasicComponent<A = any> extends Component<A> {
  basicAttr: BasicAttrInterface;
  constructor(attr: A, basicAttr: Partial<BasicAttrInterface> = {}) {
    const defaultBasicAttr: BasicAttrInterface = {
      bindField: createFieldName(),
      disabled: false,
      defaultValue: "",
    };
    super(attr);
    this.basicAttr = { ...defaultBasicAttr, ...basicAttr };
  }

  override clone(): BasicComponent {
    const newComponent = new BasicComponent(this.attr, this.basicAttr);
    newComponent.basicAttr.bindField = createFieldName();
    return newComponent;
  }
}
