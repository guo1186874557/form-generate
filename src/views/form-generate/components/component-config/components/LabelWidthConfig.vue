<script setup lang="ts">
const modelValue = defineModel<number>({ default: 0 });
</script>

<template>
  <el-form-item label="标签宽度">
    <el-input-number v-model="modelValue"></el-input-number>
  </el-form-item>
</template>

<style scoped></style>
