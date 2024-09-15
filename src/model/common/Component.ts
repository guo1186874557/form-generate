import { nanoid } from "nanoid";

export type DepType = {
  import: string[];
  from: string;
};
export class Component<T = any> {
  id: string = nanoid();
  selected: boolean = false;

  constructor(public attr: T) {}

  /**
   * 判断是否为某类型
   * @param constructor
   */
  is<C extends new (...arg: any[]) => any>(constructor: C): this is GetInstanceType<C> {
    return this instanceof constructor;
  }

  /**
   * clone 组件
   */
  clone(): Component {
    return new Component(this.attr);
  }

  /**
   * 转换为模板字符串
   */
  toTemplate(): string {
    return "";
  }

  /**
   * 获取组件依赖
   */
  getDeps(): DepType[] {
    return [];
  }
}
type GetInstanceType<T> = T extends new (...arg: any[]) => infer R ? R : never;
