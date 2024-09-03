import { FieldType } from "./enum";
/* ------------------------------- 根据数据类型获取初始值 ------------------------------ */
export function getInitValue(type?: FieldType): any {
  switch (type) {
    case FieldType.ARRAY:
      return [];
    case FieldType.BOOLEAN:
      return null;
    case FieldType.NUMBER:
      return null;
    case FieldType.OBJECT:
      return {};
    case FieldType.STRING:
      return "";
    default:
      return null;
  }
}
