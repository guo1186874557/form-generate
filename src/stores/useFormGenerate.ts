import { gco } from "@/model";
import { Form } from "@/model/Form";

const useFormGenerate = defineStore("formGenerate", () => {
  /** 根 form 实例 */
  const rootForm = ref<Form>(gco(Form));

  return {
    rootForm,
  };
});

export default useFormGenerate;
