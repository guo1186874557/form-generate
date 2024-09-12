import { type BasicAttrInterface, BasicComponent } from "@/model/common/BasicComponent";
import type { OptionsItemInterface } from "@/types";
import { createFieldName } from "@/utils";

interface RadioAttrInterface {
  options: OptionsItemInterface[];
}

export class Radio extends BasicComponent<RadioAttrInterface> {
  constructor(attr: Partial<RadioAttrInterface> = {}, basicAttr: Partial<BasicAttrInterface> = {}) {
    const defaultAttr: RadioAttrInterface = {
      options: [
        { label: "选项1", value: "1" },
        { label: "选项2", value: "2" },
      ],
    };
    super({ ...defaultAttr, ...attr }, basicAttr);
  }

  override clone(): Radio {
    const newRadio = new Radio(this.attr, this.basicAttr);
    newRadio.basicAttr.bindField = createFieldName();
    return newRadio;
  }
}
