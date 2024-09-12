<script setup lang="ts">
import type { FormItemRule } from "element-plus";

import InputRenderer from "@/components/renderer/InputRenderer.vue";
import { FormItem, Input } from "@/model";

const instance = defineModel<FormItem>({ required: true });

const rules = computed<FormItemRule[]>(() => {
  const { required, requiredMsg, pattern, patternMsg } = instance.value.attr;
  const arr: FormItemRule[] = [];
  if (required) {
    arr.push({ required: true, message: requiredMsg });
  }
  if (pattern) {
    arr.push({ pattern: new RegExp(pattern), message: patternMsg });
  }
  return arr;
});
</script>

<template>
  <el-form-item
    :prop="instance.attr.prop"
    :label="instance.attr.label"
    :label-position="instance.attr.labelPosition ?? undefined"
    :label-width="instance.attr.labelWidth"
    :size="instance.attr.size"
    :rules="rules">
    <template v-for="(item, index) in instance.children" :key="item.id">
      <template v-if="item.is(Input)">
        <InputRenderer v-model="instance.children[index]"></InputRenderer>
      </template>
    </template>
  </el-form-item>
</template>

<style scoped></style>
