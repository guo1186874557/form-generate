import { nanoid } from "nanoid";

import { generateTemplate } from "@/el-obj/codeTemplate";

import { ComponentAttrCategory, ComponentType, LabelPosition, Size } from "./enum";
import type { ElInputObj } from "./input";

export class ElFormOption {
  componentType: ComponentType = ComponentType.FORM;
  /** 右侧配置中记录collapsed的值 */
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC, ComponentAttrCategory.FIELD];

  id: string = nanoid();
  labelWidth: number = 80;
  labelPosition: LabelPosition = LabelPosition.RIGHT;
  size: Size = Size.DEFAULT;
  children: ElInputObj[] = [];
  formData: Record<string, any> = {};

  /**
   * 转换代码
   */
  async toCode(): Promise<string> {
    const subComponentNames = new Set(this.children.map((child) => child.componentName).filter((v) => v));
    const defaultImportComponents = ["ElForm", "ElFormItem", "ElButton"];
    const importComponentCode = `import { ${subComponentNames.size > 0 ? Array.from(subComponentNames).join(", ") + ", " : ""}${defaultImportComponents.join(", ")} } from "element-plus";`;
    const importVueCode = `import { ref } from "vue";`;

    console.log(this.children.map((c) => c.toFormData()).filter((v) => v !== null));
    Object.assign(
      this.formData,
      this.children
        .map((c) => c.toFormData())
        .filter((v) => v !== null)
        .reduce((pre, cur) => ({ ...pre, ...cur }), {}),
    );
    return generateTemplate({
      template: `
        <div class="p-[20px]">
          <el-form ref="formRef" :model="formData" label-width="${this.labelWidth}px" label-position="${this.labelPosition}">
            ${this.children.map((child) => child.toCode()).join("\n\r")}
          </el-form>
          <div class="text-center">
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </div>
        </div>
      `,
      script: `
        ${importComponentCode}
        
        ${importVueCode}
        
        const formData = ref(${JSON.stringify(this.formData, null, 2)});
        
        const formRef = ref<InstanceType<typeof ElForm>>(null);
        
        function onSubmit() {
          formRef.value?.validate((valid) => {
            if (valid) {
              // TODO: 提交表单数据
             }
          })
        }
      `,
    });
  }
}
