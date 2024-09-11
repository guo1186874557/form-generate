import { type InputComponentObject } from "component-object/src/obj/input";
import { prettierCode } from "component-object/src/utils";

import { ComponentAttrCategory, LabelPosition, Size } from "../helper/enum";
import { BasicComponentObject } from "./basic";
import type { SfCConfigInterface } from "./ComponentObject";
import { ContainerComponentObject } from "./container";

interface FormAttrInterface {
  labelWidth: number;
  labelWidthAuto: boolean;
  labelPosition: LabelPosition;
  size: Size;
}

export class FormComponentObject extends ContainerComponentObject {
  children: BasicComponentObject[] = [];
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC];
  attr: FormAttrInterface;
  sfc: SfCConfigInterface = {
    import: {
      "element-plus": ["ElForm", "ElFormItem", "ElButton"],
      vue: ["ref"],
    },
  };

  constructor(config: Partial<FormAttrInterface> = {}) {
    super("el-form", "表单容器", "fluent:form-20-filled");
    const defaultAttr: FormAttrInterface = {
      labelWidth: 80,
      labelWidthAuto: true,
      labelPosition: LabelPosition.RIGHT,
      size: Size.AUTO,
    };
    this.attr = { ...defaultAttr, ...config };
  }

  clone(): FormComponentObject {
    const newObj = new FormComponentObject(this.attr);
    newObj.children = this.children.map((child) => child.clone());
    return newObj;
  }

  parseAttr() {
    const attr = this.attr;
    return {
      labelWidth: attr.labelWidthAuto ? "" : `label-width="${attr.labelWidth}px"`,
      labelPosition: attr.labelPosition === LabelPosition.AUTO ? "" : `label-position="${attr.labelPosition}"`,
      size: attr.size === Size.AUTO ? "" : `size="${attr.size}"`,
    };
  }

  toSfcTemplate(): string {
    const attr = this.parseAttr();
    const useAttrs = [attr.size, attr.labelWidth, attr.labelPosition];
    return `<div class="p-[20px]">
              <el-form ref="formRef" :model="formData" ${useAttrs.filter((v) => v).join(" ")}>
                ${this.children.map((child) => child.toSfcTemplate()).join("\n")}
              </el-form>
               <div class="text-center">
              <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button type="warning" @click="onReset">重置</el-button>
              </div>  
            </div>`;
  }

  /**
   * 解析import
   * @param key 要引入的包
   */
  parserImport(key: keyof SfCConfigInterface["import"]): string {
    const importArr = Array.from(
      new Set(
        this.children
          .reduce((pre, cur) => pre.concat(cur.sfc.import[key] || []), [] as string[])
          .concat(this.sfc.import[key] || []),
      ),
    );
    return importArr.length > 0 ? `import { ${importArr.join(", ")} } from "${key}";` : "";
  }

  /**
   * 解析formData
   * parserFormData
   */
  parserFormData(): string {
    const entries = this.children
      .map((item) =>
        (item as InputComponentObject).attr.bindField
          ? [(item as InputComponentObject).attr.bindField, (item as InputComponentObject).attr.defaultValue]
          : [],
      )
      .filter((v) => v.length > 0);
    return JSON.stringify(Object.fromEntries(entries), null, 2);
  }

  toSfcScript(): string {
    this.parserFormData();
    return `${this.parserImport("element-plus")}
            ${this.parserImport("vue")}
            
            const formRef = ref<InstanceType<typeof ElForm> | null>(null)
         
            const formData = ref(${this.parserFormData()})
            
            function onSubmit() {
              formRef.value?.validate((valid) => {
                if (valid) {
                  // TODO: 提交表单数据
                 }
              })
            }
        
            function onReset() {
              formRef.value?.resetFields();
            }`;
  }

  async toSfc() {
    const htmlStr = await prettierCode(this.toSfcTemplate(), "html");
    const scriptStr = await prettierCode(this.toSfcScript(), "typescript");
    return `<template> ${htmlStr}</template>
            <script setup lang="ts">${scriptStr}</script>
            <style scoped lang="scss"></style>`;
  }

  render(): any {}
}
