import { nanoid } from "nanoid";

import { LabelPosition, Size } from "./enum";
import type { ElInputObj } from "./input";

export interface ElFormConfig {}

export class ElFormOption {
  id: string = nanoid();
  labelWidth: string | number = "auto";
  labelPosition: LabelPosition = LabelPosition.RIGHT;
  size: Size = Size.DEFAULT;
  children: ElInputObj[] = [];
}
