import { FieldType, Size } from "./enum";

/** size属性的选项 */
export const sizeOptions: { label: Size; value: Size }[] = [
  { label: Size.LARGE, value: Size.LARGE },
  { label: Size.DEFAULT, value: Size.DEFAULT },
  { label: Size.SMALL, value: Size.SMALL },
];

/** 字段类型的选项 */
export const fieldTypeOptions: { label: FieldType; value: FieldType }[] = [
  { label: FieldType.ARRAY, value: FieldType.ARRAY },
  { label: FieldType.BOOLEAN, value: FieldType.BOOLEAN },
  { label: FieldType.NUMBER, value: FieldType.NUMBER },
  { label: FieldType.OBJECT, value: FieldType.OBJECT },
  { label: FieldType.STRING, value: FieldType.STRING },
];

/** 字段类型的选项-输入框 */
export const fieldTypeInputOptions: { label: FieldType; value: FieldType }[] = [
  { label: FieldType.STRING, value: FieldType.STRING },
  { label: FieldType.NUMBER, value: FieldType.NUMBER },
];
