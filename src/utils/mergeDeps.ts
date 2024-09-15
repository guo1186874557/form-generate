import type { DepType } from "@/model";

/**
 * 合并依赖
 * @param deps 已经存在的依赖
 * @param mergeDeps  要合并的依赖
 */
export function mergeDeps(deps: DepType[], mergeDeps: DepType[]): DepType[] {
  const result: DepType[] = deps;
  mergeDeps.forEach((dep) => {
    const find = result.find((d) => d.from === dep.from);
    if (find) {
      find.import = Array.from(new Set([...find.import, ...dep.import]));
    } else {
      result.push(dep);
    }
  });
  return result;
}
