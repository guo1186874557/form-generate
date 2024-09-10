<script setup lang="ts">
import { ComponentAttrCategory, FieldType, InputComponentObject, InputType } from "component-object";

import BindFieldConfig from "@/views/form-generate/components/component-config/components/BindFieldConfig.vue";
import ComponentSizeConfig from "@/views/form-generate/components/component-config/components/ComponentSizeConfig.vue";
import DisabledConfig from "@/views/form-generate/components/component-config/components/DisabledConfig.vue";
import FieldTypeConfig from "@/views/form-generate/components/component-config/components/FieldTypeConfig.vue";
import InputTypeConfig from "@/views/form-generate/components/component-config/components/input-config/InputTypeConfig.vue";
import RowsConfig from "@/views/form-generate/components/component-config/components/input-config/RowsConfig.vue";
import LabelNameConfig from "@/views/form-generate/components/component-config/components/LabelNameConfig.vue";
import LabelPositionConfig from "@/views/form-generate/components/component-config/components/LabelPositionConfig.vue";
import LabelWidthConfig from "@/views/form-generate/components/component-config/components/LabelWidthConfig.vue";
import PlaceholderConfig from "@/views/form-generate/components/component-config/components/PlaceholderConfig.vue";
import RequiredConfig from "@/views/form-generate/components/component-config/components/RequiredConfig.vue";
import RequiredMessageConfig from "@/views/form-generate/components/component-config/components/RequiredMessageConfig.vue";

const inputObject = defineModel<any>({ required: true });

// 校验正则
const regsObj = [
  {
    label: "手机号",
    value: "^1[3-9]\\d{9}$",
  },
  {
    label: "邮箱",
    value: "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
  },
  {
    label: "身份证号",
    value: "^\\d{17}[\\d|xX|X]{1}$|^\\d{15}$",
  },
];
</script>

<template>
  <el-scrollbar>
    <el-form :model="inputObject" label-position="left" label-width="auto" size="small">
      <el-collapse v-model="inputObject.collapseValue">
        <el-collapse-item :name="ComponentAttrCategory.BASIC">
          <template #title><h3>基础属性</h3></template>
          <LabelNameConfig v-model="inputObject.attr.label"></LabelNameConfig>
          <LabelWidthConfig
            v-model:label-width="inputObject.attr.labelWidth"
            v-model:label-width-auto="inputObject.attr.labelWidthAuto"></LabelWidthConfig>
          <LabelPositionConfig v-model="inputObject.attr.labelPosition"></LabelPositionConfig>
          <ComponentSizeConfig v-model="inputObject.attr.size"></ComponentSizeConfig>
          <DisabledConfig v-model="inputObject.attr.disabled"></DisabledConfig>
          <BindFieldConfig v-model="inputObject.attr.bindField"></BindFieldConfig>

          <!--以下输入框独有的属性配置-->
          <PlaceholderConfig v-model="inputObject.attr.placeholder"></PlaceholderConfig>
          <InputTypeConfig v-model="inputObject.attr.type"></InputTypeConfig>
          <RowsConfig v-if="inputObject.attr.type === InputType.TEXTAREA" v-model="inputObject.attr.rows"></RowsConfig>
          <FieldTypeConfig
            v-model="inputObject.attr.fieldType"
            @change="inputObject.attr.defaultValue = ''"></FieldTypeConfig>
          <el-form-item label="默认值">
            <el-input
              clearable
              v-if="inputObject.attr.fieldType === FieldType.STRING"
              v-model="inputObject.attr.defaultValue"
              placeholder="请输入默认值"></el-input>
            <el-input
              v-else
              clearable
              v-model.number="inputObject.attr.defaultValue"
              placeholder="请输入默认值"></el-input>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item :name="ComponentAttrCategory.RULE">
          <template #title><h3>配置规则</h3></template>
          <RequiredConfig v-model="inputObject.attr.required"></RequiredConfig>
          <required-message-config v-model="inputObject.attr.requiredMessage"></required-message-config>
          <!--以下是输入框独有的配置规则-->
          <el-form-item label="字段校验">
            <el-config-provider value-on-clear="">
              <el-select-v2
                v-model="inputObject.attr.validateRegStr"
                :options="regsObj"
                allow-create
                clearable
                placeholder="请输入正则字符串或选择规则"
                filterable
                :reserve-keyword="false"></el-select-v2>
            </el-config-provider>
          </el-form-item>
          <el-form-item label="校验失败信息">
            <el-input v-model="inputObject.attr.validateErrorMessage"></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
</style>
