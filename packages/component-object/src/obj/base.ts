// 组件分为
// - 基础组件：基础组件是指一些最基本的组件，比如按钮、输入框、表格等。
// - 布局组件：布局组件是指一些用来控制页面布局的组件，比如栅格、分割线、弹层等。
import { FieldType, LabelPosition, Size } from "component-object/src/helper/enum";
import { createFieldName } from "component-object/src/utils/createFieldName";
import { nanoid } from "nanoid";

/** 组件属性 */
export interface ComponentAttrInterface {
  bindField: string;
  fieldType: FieldType;
  size: Size;
  label: string;
  labelWidth: number;
  labelWidthAuto: boolean;
  labelPosition: LabelPosition;
  required: boolean;
  requiredMessage: string;
  disabled: false;
}
export const getComponentAttrDefault = (attr: Partial<ComponentAttrInterface>): ComponentAttrInterface => {
  return {
    fieldType: FieldType.STRING,
    label: "标签名称",
    labelWidth: 80,
    labelWidthAuto: true,
    labelPosition: LabelPosition.AUTO,
    required: false,
    requiredMessage: "该字段为必填项",
    disabled: false,
    size: Size.AUTO,
    ...attr,
    bindField: createFieldName(),
  };
};

/** 组件对象基类 */
export abstract class ComponentObject {
  /** 组件的唯一标识符  */
  public readonly id: string = nanoid();
  /** 组件是否被选中 */
  public selected: boolean = false;
  /** 组件属性 */
  abstract attr: ComponentAttrInterface;
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

  /** 解析组件属性 */
  parseAttr() {
    const attr = this.attr;
    return {
      label: `label="${attr.label}"`,
      labelWidth: attr.labelWidthAuto ? "" : `label-width="${attr.labelWidth}px"`,
      labelPosition: attr.labelPosition === LabelPosition.AUTO ? "" : `label-position="${attr.labelPosition}"`,
      vModel: `v-model="formData.${attr.bindField}"`,
      prop: `prop="${attr.bindField}"`,
      disabled: attr.disabled ? "disabled" : "",
      size: attr.size === Size.AUTO ? "" : `size="${attr.size}"`,
      rules: attr.required ? `rules=[{ required: true, message: "${attr.requiredMessage}" }]` : "",
    };
  }
  abstract parseSelfAttr(): Record<string, any>;
  /** 转换为sfc template字符串 */
  abstract toSfcTemplate(): string;
}
