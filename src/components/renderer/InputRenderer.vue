<script setup lang="ts">
import { Input } from "@/model";

const instance = defineModel<Input>({ required: true });
</script>

<template>
  <el-input
    :clearable="instance.attr.clearable"
    :readonly="instance.attr.readonly"
    :rows="instance.attr.rows"
    :type="instance.attr.type"
    :model-value="instance.attr.defaultValue"
    :placeholder="instance.attr.placeholder">
  </el-input>
</template>

<style scoped></style>
