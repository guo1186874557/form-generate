<script setup lang="ts">
import { LabelPosition } from "@/el-obj/enum";

const modelValue = defineModel<LabelPosition>({ default: LabelPosition.AUTO });
</script>

<template>
  <el-form-item label="标签位置">
    <el-radio-group v-model="modelValue">
      <el-radio-button label="左侧" :value="LabelPosition.LEFT" />
      <el-radio-button label="顶部" :value="LabelPosition.TOP" />
      <el-radio-button label="右侧" :value="LabelPosition.RIGHT" />
      <el-radio-button label="自动" :value="LabelPosition.AUTO" />
    </el-radio-group>
  </el-form-item>
</template>

<style scoped></style>
