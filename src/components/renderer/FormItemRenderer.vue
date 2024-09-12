<script setup lang="ts">
import type { FormItemRule } from "element-plus";

import InputRenderer from "@/components/renderer/InputRenderer.vue";
import { FormItem, Input } from "@/model";
import { Radio } from "@/model/Radio";

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
    :prop="instance.child.basicAttr.bindField"
    :label="instance.attr.label"
    :label-position="instance.attr.labelPosition ?? undefined"
    :label-width="instance.attr.labelWidth"
    :size="instance.attr.size"
    :rules="rules">
    <template v-if="instance.child.is(Input)">
      <InputRenderer v-model="instance.child"></InputRenderer>
    </template>
    <template v-else-if="instance.child.is(Radio)">
      <RadioRenderer v-model="instance.child"></RadioRenderer>
    </template>
  </el-form-item>
</template>

<style scoped></style>
