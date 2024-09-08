import { customRandom, nanoid, random } from "nanoid";
import type { VNode } from "vue";

import { ComponentAttrCategory, FieldType, LabelPosition, Size } from "@/el-obj/enum";

const idGenerator = customRandom("1234567890abcdefghijklmnopqrstuvwxyz", 10, random);

export abstract class ComponentObj {
  id: string = nanoid();
  bindKey: string = "formData_" + idGenerator();
  isSelect: boolean = false; // 是否选中
  abstract componentName: string;
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
    public required: boolean,
    public requiredMessage: string,
    public fieldType: FieldType,
  ) {}
  /** 转换代码 */
  toTemplate(): string {
    return "";
  }
  /** 转换表单数据 */
  toFormData(): Record<string, any> | null {
    return null;
  }
  /** 克隆 */
  abstract clone(): ComponentObj;
  /** 解析模板公共属性 */
  parserTemplateAttr() {
    return {
      prop: `prop="${this.bindKey}"`,
      label: `label="${this.label}"`,
      labelWidth: this.labelWidth !== 0 ? `labelWidth="${this.labelWidth}px"` : "",
      labelPosition: LabelPosition.AUTO === this.labelPosition ? "" : `labelPosition="${this.labelPosition}"`,
      size: Size.AUTO === this.size ? "" : `size="${this.size}"`,
      disabled: this.disabled ? "disabled" : "",
      rules: () => {
        const rules: string[] = [];
        if (this.required) {
          rules.push(`{ required: true, message: '${this.requiredMessage}' }`);
        }
        return rules.length > 0 ? `:rules="[${rules}]"` : "";
      },
      vModel: this.bindKey ? `v-model="formData.${this.bindKey}"` : "",
    };
  }
  /** 解析模板自身属性 */
  abstract parserTemplateSelfAttr(): any;
  /** 渲染函数 */
  abstract render(): VNode;
}
export type ExcludeFunctions<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;

export type ComponentObjConfig = ExcludeFunctions<
  Omit<ComponentObj, "id" | "isSelect" | "bindKey" | "componentName" | "collapseValue" | "icon" | "name">
>;
