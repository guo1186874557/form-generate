<script setup lang="ts">
import { ElMessage } from "element-plus";

import useFormGenerate from "@/stores/useFormGenerate";

const modelValue = defineModel<string>({ default: "" });

const { rootForm } = storeToRefs(useFormGenerate());
/**
 * 字段发生变化时触发，
 * 并判断是否和其他组件的bindKey重复
 * 如果重复则不赋值给出提示
 * */
function onBindKeyChange(val: string) {
  const isRepeat = rootForm.value.children.find((item) => item.attr.bindField === val);
  if (isRepeat) {
    ElMessage.warning(`${val}字段绑定重复，请重新输入！`);
  } else {
    modelValue.value = val;
  }
}
</script>

<template>
  <el-form-item label="绑定字段">
    <el-input :model-value="modelValue" @input="onBindKeyChange" clearable></el-input>
  </el-form-item>
</template>

<style scoped></style>
