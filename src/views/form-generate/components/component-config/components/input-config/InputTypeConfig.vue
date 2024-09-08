<script setup lang="ts">
import { InputType } from "@/el-obj/enum";

const modelValue = defineModel<InputType>({ default: InputType.TEXT });
</script>

<template>
  <el-form-item label="输入框类型">
    <el-select-v2
      v-model="modelValue"
      :options="[
        { label: InputType.TEXT, value: InputType.TEXT },
        { label: InputType.PASSWORD, value: InputType.PASSWORD },
        { label: InputType.TEXTAREA, value: InputType.TEXTAREA },
      ]"></el-select-v2>
  </el-form-item>
</template>

<style scoped></style>
