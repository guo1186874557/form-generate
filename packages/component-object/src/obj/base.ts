// 组件分为
// - 基础组件：基础组件是指一些最基本的组件，比如按钮、输入框、表格等。
// - 布局组件：布局组件是指一些用来控制页面布局的组件，比如栅格、分割线、弹层等。
import { nanoid } from "nanoid";

/** 组件对象基类 */
export abstract class ComponentObject {
  /** 组件的唯一标识符  */
  public readonly id: string = nanoid();
  /** 组件是否被选中 */
  public selected: boolean = false;
  /** 组件属性 */
  abstract attr: Record<string, any>;
  /**
   * 构造函数
   * @param tag 组件标签  比如 elementPlus中input 的标签是 el-input
   * @param name 组件名称 比如 输入框、单选框等
   * @param icon 组件图标 iconIfy的图标名称
   * @protected
   */
  protected constructor(
    public tag: string,
    public name: string,
    public icon: string,
  ) {}
}
