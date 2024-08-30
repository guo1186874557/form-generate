import { nanoid } from "nanoid";

import { ComponentAttrCategory, ComponentType, LabelPosition, Size } from "./enum";
import type { ElInputObj } from "./input";

export class ElFormOption {
  componentType: ComponentType = ComponentType.FORM;
  /** 右侧配置中记录collapsed的值 */
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC];

  id: string = nanoid();
  labelWidth: number = 80;
  labelPosition: LabelPosition = LabelPosition.RIGHT;
  size: Size = Size.DEFAULT;
  children: ElInputObj[] = [];
  formData: Record<string, any> = {};
}
