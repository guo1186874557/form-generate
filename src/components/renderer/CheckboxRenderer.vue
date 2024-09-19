<script setup lang="ts">
import { Checkbox } from "@/model";

defineProps<{
  instance: Checkbox;
}>();
</script>

<template>
  <el-checkbox-group :model-value="instance.basicAttr.defaultValue" :disabled="instance.basicAttr.disabled">
    <el-checkbox v-for="item in instance.attr.options" :key="item.id" :label="item.label" :value="item.value" />
  </el-checkbox-group>
</template>

<style scoped></style>
