import { ComponentCategory, FieldType } from "@/el-obj/enum";
import { ElFormOption } from "@/el-obj/form";
import { ElInputObj } from "@/el-obj/input";

const useFormGenerate = defineStore("formGenerate", () => {
  /* 左侧组件列表  */
  const activeName = ref([ComponentCategory.BASIC]);
  const componentsList = ref([
    {
      title: "基础组件",
      name: ComponentCategory.BASIC,
      options: [new ElInputObj()],
    },
  ]);

  /** 当前选中的组件选项 */
  const selectedOption = ref<ElInputObj | null>(null);

  /** 表单配置项 */
  const formOption = ref<ElFormOption>(new ElFormOption());
  // 表单字段配置项
  type FormField = {
    id: string;
    fieldName: string;
    type: FieldType;
    used: boolean;
  };
  const formFields = ref<FormField[]>([]);

  return {
    activeName,
    componentsList,
    formOption,
    selectedOption,
    formFields,
  };
});

export default useFormGenerate;
