<script setup lang="ts">
const modelValue = defineModel<boolean>({ default: false });
</script>

<template>
  <el-form-item label="必填">
    <el-switch v-model="modelValue"></el-switch>
  </el-form-item>
</template>

<style scoped></style>
