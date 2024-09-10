// - 布局组件：布局组件是指一些用来控制页面布局的组件，比如栅格、分割线、弹层等。
import type { BasicComponentObject } from "./basic";
import { ComponentObject } from "./ComponentObject";

export abstract class ContainerComponentObject extends ComponentObject {
  abstract children: BasicComponentObject[];
  protected constructor(tag: string, name: string, icon: string) {
    super(tag, name, icon);
  }
}
