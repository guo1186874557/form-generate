import type { BasicComponent } from "@/model/common/BasicComponent";
import { Component, type DepType } from "@/model/common/Component";
import { ComponentAttrCategory, LabelPosition, Size } from "@/types/enum";
import { mergeDeps } from "@/utils/mergeDeps";

export interface FormItemAttrInterface {
  label: string;
  labelPosition: LabelPosition;
  labelWidth: number;
  labelWidthAuto: boolean;
  size: Size;
  required: boolean;
  requiredMsg: string;
  pattern: string;
  patternMsg: string;
}
export class FormItem extends Component<FormItemAttrInterface> {
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC, ComponentAttrCategory.RULE];

  constructor(
    attr: Partial<FormItemAttrInterface> = {},
    public child: BasicComponent,
  ) {
    const defaultAttr: FormItemAttrInterface = {
      label: "标签名",
      labelPosition: LabelPosition.AUTO,
      labelWidth: 80,
      labelWidthAuto: true,
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

  override getDeps(): DepType[] {
    const childDeps = this.child.getDeps();
    const selfDeps = [{ import: ["ElFormItem"], from: "element-plus" }];
    return mergeDeps(selfDeps, childDeps);
  }

  override toTemplate(): string {
    const attr = this.attr;
    const parserAttr = {
      label: `label="${attr.label}"`,
      labelWidth: attr.labelWidthAuto ? "" : `label-width="${attr.labelWidth}px"`,
      labelPosition: attr.labelPosition === LabelPosition.AUTO ? "" : `label-position="${attr.labelPosition}"`,
      size: attr.size === Size.AUTO ? "" : `size="${attr.size}"`,
      prop: this.child.basicAttr.bindField ? `prop="${this.child.basicAttr.bindField}"` : "",
      rules: () => {
        const rules: string[] = [];
        if (attr.required) {
          rules.push(`{ required: true, message: '${attr.requiredMsg}' }`);
        }
        if (attr.pattern) {
          rules.push(`{ pattern: /${attr.pattern}/, message: '${attr.patternMsg}' }`);
        }
        return rules.length > 0 ? `:rules="[${rules}]"` : "";
      },
    };
    const useAttr = Object.values(parserAttr)
      .map((v) => (typeof v === "function" ? v() : v))
      .filter(Boolean)
      .join(" ");
    return `<el-form-item ${useAttr}>
              ${this.child.toTemplate()}
            </el-form-item>`;
  }
}
