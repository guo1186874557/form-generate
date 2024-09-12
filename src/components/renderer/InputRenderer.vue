<script setup lang="ts">
import { Input } from "@/model";

defineProps<{
  instance: Input;
}>();
</script>

<template>
  <el-input
    :clearable="instance.attr.clearable"
    :readonly="instance.attr.readonly"
    :disabled="instance.basicAttr.disabled"
    :rows="instance.attr.rows"
    :type="instance.attr.type"
    :model-value="instance.basicAttr.defaultValue"
    :placeholder="instance.attr.placeholder">
  </el-input>
</template>

<style scoped></style>
