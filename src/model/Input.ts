import { type BasicAttrInterface, BasicComponent } from "@/model/common/BasicComponent";
import type { DepType } from "@/model/common/Component";
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

  override getDeps(): DepType[] {
    return [
      {
        import: ["ElInput"],
        from: "element-plus",
      },
    ];
  }

  override toTemplate(): string {
    const parserAttr: Record<keyof InputAttrInterface, string> = {
      placeholder: `placeholder="${this.attr.placeholder}"`,
      clearable: this.attr.clearable ? `clearable="${this.attr.clearable}"` : "",
      readonly: this.attr.readonly ? `readonly="${this.attr.readonly}"` : "",
      type: this.attr.type !== InputType.TEXT ? `type="${this.attr.type}"` : "",
      rows: this.attr.type === InputType.TEXTAREA ? `rows="${this.attr.rows}"` : "",
    };
    return `<el-input v-model="formData.${this.basicAttr.bindField}" ${Object.values(parserAttr).filter(Boolean).join(" ")}></el-input>`;
  }
}
