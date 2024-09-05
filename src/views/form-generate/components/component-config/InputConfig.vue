<script setup lang="ts">
import { ElMessage } from "element-plus";

import { ComponentAttrCategory, FieldType, InputType, LabelPosition } from "@/el-obj/enum";
import type { InputObj } from "@/el-obj/input";
import { fieldTypeInputOptions } from "@/el-obj/options";
import useFormGenerate from "@/stores/useFormGenerate";

const { selectedOption, formOption } = storeToRefs(useFormGenerate());

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

/**
 * 字段发生变化时触发，
 * 并判断是否和其他组件的bindKey重复
 * 如果重复则不赋值给出提示
 * */
function onBindKeyChange(val: string) {
  const isRepeat = formOption.value.children.find((item) => item.bindKey === val);
  if (isRepeat) {
    ElMessage.warning(`${val}字段绑定重复，请重新输入！`);
  } else {
    selectedOption.value!.bindKey = val;
  }
}
</script>

<template>
  <el-scrollbar>
    <el-form :model="selectedOption!" label-position="left" label-width="auto" size="small">
      <el-collapse v-model="selectedOption!.collapseValue">
        <el-collapse-item :name="ComponentAttrCategory.BASIC">
          <template #title><h3>基础属性</h3></template>
          <el-form-item label="标签名称">
            <el-input v-model="selectedOption!.label"></el-input>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input-number v-model="selectedOption!.labelWidth"></el-input-number>
          </el-form-item>
          <el-form-item label="标签位置">
            <el-radio-group v-model="selectedOption!.labelPosition">
              <el-radio-button label="左侧" :value="LabelPosition.LEFT" />
              <el-radio-button label="顶部" :value="LabelPosition.TOP" />
              <el-radio-button label="右侧" :value="LabelPosition.RIGHT" />
              <el-radio-button label="自动" :value="LabelPosition.AUTO" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="输入类型">
            <el-select-v2
              v-model="(selectedOption! as InputObj).type"
              :options="[
                { label: InputType.TEXT, value: InputType.TEXT },
                { label: InputType.PASSWORD, value: InputType.PASSWORD },
                { label: InputType.TEXTAREA, value: InputType.TEXTAREA },
              ]"></el-select-v2>
          </el-form-item>
          <el-form-item label="行数" v-if="(selectedOption! as InputObj).type === InputType.TEXTAREA">
            <el-input-number v-model="(selectedOption! as InputObj).rows"></el-input-number>
          </el-form-item>
          <el-form-item label="占位符">
            <el-input v-model="selectedOption!.placeholder"></el-input>
          </el-form-item>
          <el-form-item label="禁用">
            <el-switch v-model="selectedOption!.disabled"></el-switch>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item :name="ComponentAttrCategory.RULE">
          <template #title><h3>配置规则</h3></template>
          <el-form-item label="字段">
            <el-input :model-value="selectedOption!.bindKey" @input="onBindKeyChange" clearable></el-input>
          </el-form-item>
          <el-form-item label="数据类型">
            <el-select-v2
              v-model="selectedOption!.fieldType"
              placeholder="请选择数据类型"
              :options="fieldTypeInputOptions"
              @change="selectedOption!.defaultValue = ''"
              clearable></el-select-v2>
          </el-form-item>
          <el-form-item label="默认值">
            <el-input
              clearable
              v-if="selectedOption!.fieldType === FieldType.STRING"
              v-model="selectedOption!.defaultValue"
              placeholder="请输入默认值"></el-input>
            <el-input
              v-else
              clearable
              v-model.number="selectedOption!.defaultValue"
              placeholder="请输入默认值"></el-input>
          </el-form-item>

          <el-form-item label="必填">
            <el-switch v-model="selectedOption!.required"></el-switch>
          </el-form-item>
          <el-form-item label="必填校验信息">
            <el-input v-model="selectedOption!.requiredMessage"></el-input>
          </el-form-item>
          <el-form-item label="字段校验">
            <el-config-provider value-on-clear="">
              <el-select-v2
                v-model="selectedOption!.validateRegStr"
                :options="regsObj"
                allow-create
                clearable
                placeholder="请输入正则字符串或选择规则"
                filterable
                :reserve-keyword="false"></el-select-v2>
            </el-config-provider>
          </el-form-item>
          <el-form-item label="校验失败信息">
            <el-input v-model="selectedOption!.validateErrorMessage"></el-input>
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
