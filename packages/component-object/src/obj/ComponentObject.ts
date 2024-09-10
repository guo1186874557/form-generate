import { nanoid } from "nanoid";

import { ComponentAttrCategory } from "../helper/enum";

export interface SfCConfigInterface {
  import: {
    "element-plus"?: string[];
    vue?: string[];
  };
}

export abstract class ComponentObject {
  public readonly id: string = nanoid();
  abstract attr: any;
  abstract collapseValue: ComponentAttrCategory[];
  abstract sfc: SfCConfigInterface;
  /** 组件是否被选中 */
  public selected: boolean = false;
  protected constructor(
    public tag: string,
    public name: string,
    public icon: string,
  ) {}
  abstract parseAttr(): any;
  abstract toSfcTemplate(): string;
  abstract clone(): any;
  abstract render(): any;
}
