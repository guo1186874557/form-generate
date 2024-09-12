<script setup lang="ts">
import { Radio } from "@/model/Radio";

const instance = defineModel<Radio>({ required: true });
</script>

<template>
  <el-radio-group :model-value="instance.basicAttr.defaultValue" :disabled="instance.basicAttr.disabled">
    <el-radio v-for="item in instance.attr.options" :key="item.value" :value="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<style scoped></style>
