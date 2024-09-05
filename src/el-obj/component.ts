import { customRandom, nanoid, random } from "nanoid";

import { ComponentAttrCategory, ComponentType, FieldType, Size } from "@/el-obj/enum";

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
    public labelPosition: string,
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
}

export type ComponentObjConfig = Omit<
  ComponentObj,
  "id" | "isSelect" | "bindKey" | "componentName" | "componentType" | "collapseValue" | "icon" | "name"
>;
