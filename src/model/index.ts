import { FormItem } from "./FormItem";
import { Input } from "./Input";

export * from "./FormItem";
export * from "./Input";
interface GenerateComponentObject {
  <T extends new (...arg: any[]) => any>(
    constructor: T,
    attr: ConstructorParameters<T>[0],
    child?: any,
  ): InstanceType<T>;
}

export const gco: GenerateComponentObject = (constructor, attr, child) => {
  return new constructor(attr, child);
};

const formItemInput = gco(FormItem, { prop: "name" }, gco(Input, {}));
