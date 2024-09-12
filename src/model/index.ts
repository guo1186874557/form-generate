export * from "./common/BasicComponent";
export * from "./common/Component";
export * from "./Form";
export * from "./FormItem";
export * from "./FormItem";
export * from "./Input";
export * from "./Radio";

interface GenerateComponentObject {
  <T extends new (...arg: any[]) => any>(constructor: T, ...arg: ConstructorParameters<T>): InstanceType<T>;
}
export const gco: GenerateComponentObject = (constructor, ...arg) => {
  return new constructor(...arg);
};
