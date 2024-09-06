import type { FormItemRule, FormRules } from "element-plus";
import { customRandom, nanoid, random } from "nanoid";

import { ComponentAttrCategory, ComponentType, FieldType, LabelPosition, Size } from "@/el-obj/enum";
import { ElFormOption } from "@/el-obj/form";

const idGenerator = customRandom("1234567890abcdefghijklmnopqrstuvwxyz", 10, random);

export abstract class ComponentObj {
  id: string = nanoid();
  bindKey: string = "formData_" + idGenerator();
  isSelect: boolean = false; // 是否选中
  abstract componentName: string;
  abstract componentType: ComponentType;
  abstract collapseValue: ComponentAttrCategory[];
  abstract icon: string;
  abstract name: string;

  abstract defaultValue: any;
  protected constructor(
    public label: string,
    public labelWidth: number,
    public labelPosition: LabelPosition,
    public size: Size,
    public disabled: boolean,
    public placeholder: string,
    public required: boolean,
    public requiredMessage: string,
    public validateRegStr: string,
    public validateErrorMessage: string,
    public fieldType: FieldType,
  ) {}
  /** 转换代码 */
  abstract toTemplate(formDataName?: string): string;
  /** 转换表单数据 */
  abstract toFormData(): Record<string, any> | null;
  /** 克隆 */
  abstract clone(): ComponentObj;
  /** 解析模板公共属性 */
  parserTemplateAttr() {
    return {
      prop: `prop="${this.bindKey}"`,
      label: `label="${this.label}"`,
      labelWidth: this.labelWidth !== 0 ? `labelWidth="${this.labelWidth}px"` : "",
      labelPosition: LabelPosition.AUTO === this.labelPosition ? "" : `labelPosition="${this.labelPosition}"`,
      size: Size.DEFAULT === this.size ? "" : `size="${this.size}"`,
      disabled: this.disabled ? "disabled" : "",
      placeholder: this.placeholder ? `placeholder="${this.placeholder}"` : "",
      rules: () => {
        const rules: string[] = [];
        if (this.required) {
          rules.push(`{ required: true, message: '${this.requiredMessage}' }`);
        }
        if (this.validateRegStr) {
          rules.push(`{ pattern: /${this.validateRegStr}/, message: '${this.validateErrorMessage}' }`);
        }
        return rules.length > 0 ? `:rules="[${rules}]"` : "";
      },
      vModel: this.bindKey ? `v-model="formData.${this.bindKey}"` : "",
    };
  }
  /** 解析模板自身属性 */
  abstract parserTemplateSelfAttr(): any;
}

export type ComponentObjConfig = Omit<
  ComponentObj,
  "id" | "isSelect" | "bindKey" | "componentName" | "componentType" | "collapseValue" | "icon" | "name"
>;
