import { customRandom, random } from "nanoid";

const customId = customRandom("1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBMN", 10, random);
/**
 * 创建字段名
 * @param prefix 前缀
 */
export function createFieldName(prefix: string = "formData_"): string {
  return prefix + customId();
}
