import type { ComponentObject } from "component-object";

import { ComponentCategory } from "@/types/enum";

const useActiveVars = defineStore("activeVars", () => {
  /** 控制页面左侧折叠面板的展开 */
  const componentListActive = ref<ComponentCategory[]>([ComponentCategory.BASIC]);

  /** 中间组件展示去选中的组件 */
  const selectComponentObj = ref<ComponentObject | null>(null);

  return {
    componentListActive,
    selectComponentObj,
  };
});

export default useActiveVars;
