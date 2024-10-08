<script setup lang="ts">
import InputRenderer from "@/components/renderer/InputRenderer.vue";
import RadioRenderer from "@/components/renderer/RadioRenderer.vue";
import { Checkbox, DatePicker, FormItem, Input, Select } from "@/model";
import { Radio } from "@/model/Radio";
import { LabelPosition, Size } from "@/types";

const props = defineProps<{ instance: FormItem }>();
const { instance } = toRefs(props);

const attr = computed(() => {
  const { child, attr } = instance.value;
  const props: {
    prop?: string;
    label?: string;
    size?: Size;
    labelWidth?: number;
    labelPosition?: LabelPosition;
    required?: boolean;
    showMessage: boolean;
  } = {
    prop: child.basicAttr.bindField,
    label: attr.label,
    showMessage: false,
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
  if (attr.required) {
    props.required = attr.required;
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
    <template v-else-if="instance.child.is(Select)">
      <SelectRenderer :instance="instance.child"></SelectRenderer>
    </template>
    <template v-else-if="instance.child.is(DatePicker)">
      <DatePickerRenderer :instance="instance.child"></DatePickerRenderer>
    </template>
  </el-form-item>
</template>

<style scoped></style>
