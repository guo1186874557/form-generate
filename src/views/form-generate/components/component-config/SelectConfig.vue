<script setup lang="ts">
import { Select } from "@/model";
import OptionsConfig from "@/views/form-generate/components/component-config/components/OptionsConfig.vue";

const instance = defineModel<Select>({ required: true });

function handleMultipleChange() {
  instance.value.basicAttr.defaultValue = instance.value.attr.multiple
    ? []
    : typeof instance.value.attr.options[0].value === "string"
      ? ""
      : null;
}
</script>

<template>
  <el-form-item label="占位符">
    <el-input v-model="instance.attr.placeholder" clearable></el-input>
  </el-form-item>
  <OptionsConfig v-model="instance.attr.options"></OptionsConfig>
  <el-form-item label="多选">
    <el-switch v-model="instance.attr.multiple" @change="handleMultipleChange"></el-switch>
  </el-form-item>
  <el-form-item label="默认值">
    <el-select-v2
      clearable
      :multiple="instance.attr.multiple"
      v-model="instance.basicAttr.defaultValue"
      :options="instance.attr.options"></el-select-v2>
  </el-form-item>
</template>

<style scoped></style>
