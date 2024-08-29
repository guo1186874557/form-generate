import { nanoid } from "nanoid";

import { ComponentType, LabelPosition, Size } from "./enum";
import type { ElInputObj } from "./input";

export interface ElFormConfig {}

export class ElFormOption {
  id: string = nanoid();
  labelWidth: number = 80;
  labelPosition: LabelPosition = LabelPosition.RIGHT;
  componentType: ComponentType = ComponentType.FORM;
  size: Size = Size.DEFAULT;
  children: ElInputObj[] = [];
}
