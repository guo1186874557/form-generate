<script setup lang="ts">
const labelWidth = defineModel<number>("labelWidth", { default: 0 });
const labelWidthAuto = defineModel<boolean>("labelWidthAuto", { default: true });
</script>

<template>
  <el-form-item label="标签宽度">
    <el-input-number :disabled="labelWidthAuto" v-model="labelWidth"></el-input-number>
    <el-checkbox class="ml-2" v-model="labelWidthAuto">自动</el-checkbox>
  </el-form-item>
</template>

<style scoped></style>
