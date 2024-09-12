import type { Component } from "@/model";
import { ComponentCategory } from "@/types";

const useActiveVars = defineStore("activeVars", () => {
  /** 控制页面左侧折叠面板的展开 */
  const componentListActive = ref<ComponentCategory[]>([ComponentCategory.BASIC]);

  /** 中间组件展示去选中的组件 */
  const selectComponentObj = ref<Component | null>(null);

  return {
    componentListActive,
    selectComponentObj,
  };
});

export default useActiveVars;
