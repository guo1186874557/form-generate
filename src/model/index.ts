export * from "./form/Form";
export * from "./form-item/FormItem";
export * from "./form-item/FormItem";
export * from "./input/Input";

interface GenerateComponentObject {
  <T extends new (...arg: any[]) => any>(constructor: T, ...arg: ConstructorParameters<T>): InstanceType<T>;
}
export const gco: GenerateComponentObject = (constructor, ...arg) => {
  return new constructor(...arg);
};
