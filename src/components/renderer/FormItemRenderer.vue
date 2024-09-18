<script setup lang="ts">
import type { FormItemRule } from "element-plus";

import InputRenderer from "@/components/renderer/InputRenderer.vue";
import RadioRenderer from "@/components/renderer/RadioRenderer.vue";
import { Checkbox, FormItem, Input } from "@/model";
import { Radio } from "@/model/Radio";
import { LabelPosition, Size } from "@/types";

const props = defineProps<{ instance: FormItem }>();
const { instance } = toRefs(props);

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

const attr = computed(() => {
  const { child, attr } = instance.value;
  const props: {
    prop?: string;
    label?: string;
    size?: string;
    labelWidth?: number;
    labelPosition?: LabelPosition;
  } = {
    prop: child.basicAttr.bindField,
    label: attr.label,
  };
  if (attr.size !== Size.AUTO) {
    props.size = attr.size;
  }
  if (!attr.labelWidthAuto) {
    props.labelWidth = attr.labelWidth;
  }
  if (attr.labelPosition !== LabelPosition.AUTO) {
    props.labelPosition = attr.labelPosition;
  }
  return props;
});
</script>

<template>
  <el-form-item v-bind="attr">
    <template v-if="instance.child.is(Input)">
      <InputRenderer :instance="instance.child"></InputRenderer>
    </template>
    <template v-else-if="instance.child.is(Radio)">
      <RadioRenderer :instance="instance.child"></RadioRenderer>
    </template>
    <template v-else-if="instance.child.is(Checkbox)">
      <CheckboxRenderer :instance="instance.child"></CheckboxRenderer>
    </template>
  </el-form-item>
</template>

<style scoped></style>
