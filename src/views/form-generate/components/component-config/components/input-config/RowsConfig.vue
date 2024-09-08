<script setup lang="ts">
const modelValue = defineModel<number>({ default: 4 });
</script>

<template>
  <el-form-item label="行数">
    <el-input-number v-model="modelValue"></el-input-number>
  </el-form-item>
</template>

<style scoped></style>
