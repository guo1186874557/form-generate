import { nanoid } from "nanoid";

import { generateTemplate } from "@/el-obj/codeTemplate";
import { ComponentObj } from "@/el-obj/component";

import { ComponentAttrCategory, ComponentType, LabelPosition, Size } from "./enum";

export class ElFormOption {
  componentType: ComponentType = ComponentType.FORM;
  /** 右侧配置中记录collapsed的值 */
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC, ComponentAttrCategory.FIELD];

  id: string = nanoid();
  labelWidth: number = 80;
  labelWidthAuto: boolean = true; // 自动label宽度
  labelPosition: LabelPosition = LabelPosition.RIGHT;
  size: Size = Size.DEFAULT;
  children: ComponentObj[] = [];
  formData: Record<string, any> = {};

  /**
   * 转换代码
   */
  async toCode(): Promise<string> {
    const subComponentNames = new Set(this.children.map((child) => child.componentName).filter((v) => v));
    const defaultImportComponents = ["ElForm", "ElFormItem", "ElButton"];
    const importComponentCode = `import { ${subComponentNames.size > 0 ? Array.from(subComponentNames).join(", ") + ", " : ""}${defaultImportComponents.join(", ")} } from "element-plus";`;
    const importVueCode = `import { ref } from "vue";`;

    Object.assign(
      this.formData,
      this.children
        .map((c) => c.toFormData())
        .filter((v) => v !== null)
        .reduce((pre, cur) => ({ ...pre, ...cur }), {}),
    );

    const createRules = () => {
      return this.children
        .map((child) => {
          if (!child.bindKey) return "";
          return `${child.bindKey}: [
          ${child.required ? `{required: true, message: '${child.requiredMessage}'},` : ""}
          ${child.validateRegStr ? `{ validator: customRule(new RegExp(${JSON.stringify(child.validateRegStr)}),'${child.validateErrorMessage}')}` : ""}
        ]
        `;
        })
        .filter((v) => v !== "");
    };

    return generateTemplate({
      template: `
        <div class="p-[20px]">
          <el-form :rules="rules" ref="formRef" :model="formData" label-width="${this.labelWidthAuto ? "auto" : this.labelWidth + "px"}" label-position="${this.labelPosition}">
            ${this.children.map((child) => child.toTemplate()).join("\n")}
          </el-form>
          <div class="text-center">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button type="warning" @click="onReset">重置</el-button>
          </div>
        </div>
      `,
      script: `
        ${importComponentCode}
        import type { FormItemRule } from "element-plus";
        ${importVueCode}
        
        const formData = ref(${JSON.stringify(this.formData, null, 2)});
        
        const formRef = ref<InstanceType<typeof ElForm> | null>(null);

        const customRule = (reg: RegExp, errorMessage: string): FormItemRule["validator"] => {
          return (rule, value, callback) => {
            if(value === '' || value === undefined || value === null) return callback();
            if (!reg.test(value)) {
              return callback(new Error(errorMessage));
            } 
            callback();
          };
        };
        const rules:FormItemRule[] = {
          ${createRules()}
        }
        
        function onSubmit() {
          formRef.value?.validate((valid) => {
            if (valid) {
              // TODO: 提交表单数据
             }
          })
        }
        
        function onReset() {
          formRef.value?.resetFields();
        }
      `,
    });
  }
}
