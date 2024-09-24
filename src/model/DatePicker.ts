import { type BasicAttrInterface, BasicComponent } from "@/model/common/BasicComponent";
import type { DepType } from "@/model/common/Component";
import { DatePickerType, Size } from "@/types";

export interface DatePickerAttrInterface {
  type: DatePickerType;
  placeholder: string;
  size: Size;
  valueFormat: string;
  format: string;
  readonly: boolean;
}

export class DatePicker extends BasicComponent<DatePickerAttrInterface> {
  constructor(attr: Partial<DatePickerAttrInterface> = {}, basicAttr: Partial<BasicAttrInterface> = {}) {
    const defaultAttr: DatePickerAttrInterface = {
      type: DatePickerType.DATE,
      placeholder: "请选择日期",
      size: Size.AUTO,
      valueFormat: "YYYY-MM-DD",
      format: "YYYY-MM-DD",
      readonly: false,
    };
    const _attr = { ...defaultAttr, ...attr };
    super(_attr, basicAttr);
  }

  override clone(): BasicComponent {
    return new DatePicker(this.attr, this.basicAttr);
  }

  override getDeps(): DepType[] {
    return [{ import: ["ElDatePicker"], from: "element-plus" }];
  }

  override toTemplate(): string {
    const attr = this.attr;
    const parserAttr = {
      type: ![DatePickerType.DATE, DatePickerType.EMPTY].includes(attr.type) ? `type="${attr.type}"` : "",
      placeholder: attr.placeholder ? `placeholder="${attr.placeholder}"` : "",
      size: attr.size ? `size="${attr.size}"` : "",
      vModel: `v-model="formData.${this.basicAttr.bindField}"`,
      valueFormat: attr.valueFormat ? `value-format="${attr.valueFormat}"` : "",
      format: attr.format ? `format="${attr.format}"` : "",
      readonly: attr.readonly ? `readonly` : "",
      disabled: this.basicAttr.disabled ? `disabled` : "",
      style: `style="width: 100%;"`,
    };
    return `<el-date-picker ${Object.values(parserAttr).filter(Boolean).join(" ")}></el-date-picker>`;
  }
}
