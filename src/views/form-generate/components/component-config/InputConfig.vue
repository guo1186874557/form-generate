<script setup lang="ts">
import { Input, InputType } from "@/model";

const instance = defineModel<Input>({ required: true });
</script>

<template>
  <el-form-item label="占位符">
    <el-input v-model="instance.attr.placeholder" clearable></el-input>
  </el-form-item>
  <el-form-item label="输入框类型">
    <el-select-v2
      v-model="instance.attr.type"
      clearable
      :options="[
        { label: InputType.PASSWORD, value: InputType.PASSWORD },
        { label: InputType.TEXTAREA, value: InputType.TEXTAREA },
      ]"></el-select-v2>
  </el-form-item>
  <el-form-item label="行数" v-if="instance.attr.type === InputType.TEXTAREA">
    <el-input-number v-model="instance.attr.rows"></el-input-number>
  </el-form-item>
  <el-form-item label="默认值">
    <el-input clearable v-model="instance.basicAttr.defaultValue" placeholder="请输入默认值"></el-input>
  </el-form-item>
  <el-form-item label="只读">
    <el-switch clearable v-model="instance.attr.readonly"></el-switch>
  </el-form-item>
  <el-form-item label="清空">
    <el-switch clearable v-model="instance.attr.clearable"></el-switch>
  </el-form-item>
</template>

<style scoped></style>
