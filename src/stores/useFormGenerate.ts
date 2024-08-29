import { ElFormOption } from "@/el-obj/form";
import { ElInputObj } from "@/el-obj/input";

const useFormGenerate = defineStore("formGenerate", () => {
  const activeName = ref(["basic"]);
  const componentsList = ref([
    {
      title: "基础组件",
      name: "basic",
      options: [new ElInputObj()],
    },
  ]);

  const formOption = ref<ElFormOption>(new ElFormOption());
  const selectedOption = ref<ElInputObj | null>(null);

  return {
    activeName,
    componentsList,
    formOption,
    selectedOption,
  };
});

export default useFormGenerate;
