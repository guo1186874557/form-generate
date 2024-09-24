<script setup lang="ts">
import { DatePicker } from "@/model";
import { DatePickerType } from "@/types";

const instance = defineModel<DatePicker>({ required: true });

const dateTypeOptions: { label: string; value: DatePickerType }[] = [
  { label: "日期", value: DatePickerType.DATE },
  { label: "日期时间", value: DatePickerType.DATETIME },
  { label: "年", value: DatePickerType.YEAR },
  { label: "月", value: DatePickerType.MONTH },
];
function handleTypeChange(value: DatePickerType) {
  if (value === DatePickerType.DATETIME) {
    instance.value.attr.format = "YYYY-MM-DD HH:mm:ss";
    instance.value.attr.valueFormat = "YYYY-MM-DD HH:mm:ss";
  } else if (value === DatePickerType.DATE) {
    instance.value.attr.format = "YYYY-MM-DD";
    instance.value.attr.valueFormat = "YYYY-MM-DD";
  } else if (value === DatePickerType.YEAR) {
    instance.value.attr.format = "YYYY";
    instance.value.attr.valueFormat = "YYYY";
  } else if (value === DatePickerType.MONTH) {
    instance.value.attr.format = "YYYY-MM";
    instance.value.attr.valueFormat = "YYYY-MM";
  } else {
    instance.value.attr.format = "";
    instance.value.attr.valueFormat = "";
  }
}

// 默认值组件的属性
const defaultValueComProps = computed(() => {
  return {
    format: instance.value.attr.format,
    valueFormat: instance.value.attr.valueFormat,
    type: instance.value.attr.type as any,
  };
});
</script>

<template>
  <el-form-item label="只读">
    <el-switch clearable v-model="instance.attr.readonly"></el-switch>
  </el-form-item>
  <el-form-item label="组件类型">
    <el-config-provider value-on-clear="">
      <el-select v-model="instance.attr.type" @change="handleTypeChange">
        <el-option
          v-for="item in dateTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>
    </el-config-provider>
  </el-form-item>
  <el-form-item label="显示格式">
    <el-input v-model="instance.attr.format"></el-input>
  </el-form-item>
  <el-form-item label="输入格式">
    <el-input v-model="instance.attr.valueFormat"></el-input>
  </el-form-item>
  <el-form-item label="占位符">
    <el-input v-model="instance.attr.placeholder"></el-input>
  </el-form-item>
  <el-form-item label="默认值">
    <el-date-picker v-model="instance.basicAttr.defaultValue" v-bind="defaultValueComProps" placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
</template>

<style scoped></style>
