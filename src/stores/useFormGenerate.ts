import { FormComponentObject } from "component-object";

const useFormGenerate = defineStore("formGenerate", () => {
  /** 根 form 实例 */
  const rootForm = ref<FormComponentObject>(new FormComponentObject());

  return {
    rootForm,
  };
});

export default useFormGenerate;
