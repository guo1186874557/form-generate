import { ComponentObj } from "@/el-obj/component";
import { ComponentCategory } from "@/el-obj/enum";
import { ElFormOption } from "@/el-obj/form";
import { InputObj } from "@/el-obj/input";

const useFormGenerate = defineStore("formGenerate", () => {
  /* 左侧组件列表  */
  const activeName = ref([ComponentCategory.BASIC]);
  const componentsList = ref([
    {
      title: "基础组件",
      name: ComponentCategory.BASIC,
      options: [new InputObj()],
    },
  ]);

  /** 当前选中的组件选项 */
  const selectedOption = ref<ComponentObj | null>(null);

  /** 表单配置项 */
  const formOption = ref<ElFormOption>(new ElFormOption());

  return {
    activeName,
    componentsList,
    formOption,
    selectedOption,
  };
});

export default useFormGenerate;
