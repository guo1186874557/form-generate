<script setup lang="ts">
const modelValue = defineModel<string>({ default: "" });
</script>

<template>
  <el-form-item label="占位符">
    <el-input v-model="modelValue"></el-input>
  </el-form-item>
</template>

<style scoped></style>
