<script setup lang="ts">
import { Select } from "@/model/index.js";

defineProps<{ instance: Select }>();
</script>

<template>
  <el-select
    :model-value="instance.basicAttr.defaultValue"
    :placeholder="instance.attr.placeholder"
    :disabled="instance.basicAttr.disabled"
    :multiple="instance.attr.multiple">
    <el-option
      v-for="item in instance.attr.options"
      :key="item.value"
      :value="item.value"
      :label="item.label"
      :disabled="item.disabled"></el-option>
  </el-select>
</template>

<style lang="scss" scoped></style>
