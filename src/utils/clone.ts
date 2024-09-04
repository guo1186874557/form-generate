import { ElInputObj } from "@/el-obj/input";

export function cloneFormItem(item: ElInputObj) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, bindKey, ...arg } = item;
  return new ElInputObj(arg);
}
