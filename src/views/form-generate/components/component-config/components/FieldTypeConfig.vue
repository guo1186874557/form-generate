<script setup lang="ts">
import { FieldType } from "@/el-obj/enum";

const fieldTypeInputOptions: { label: FieldType; value: FieldType }[] = [
  { label: FieldType.STRING, value: FieldType.STRING },
  { label: FieldType.NUMBER, value: FieldType.NUMBER },
];
const modelValue = defineModel<string>({ default: "" });
</script>

<template>
  <el-form-item label="字段类型">
    <el-select-v2
      v-model="modelValue"
      placeholder="请选择数据类型"
      :options="fieldTypeInputOptions"
      clearable
      v-bind="$attrs"></el-select-v2>
  </el-form-item>
</template>

<style scoped></style>
