<script setup lang="ts">
import { LabelPosition, Size } from "@/el-obj/enum";
import { sizeOptions } from "@/el-obj/options";

const modelValue = defineModel<Size>({ default: Size.AUTO });
</script>

<template>
  <el-form-item label="组件大小">
    <el-config-provider value-on-clear="">
      <el-select-v2
        placeholder="默认跟随全局组件大小"
        clearable
        v-model="modelValue"
        :options="sizeOptions"></el-select-v2>
    </el-config-provider>
  </el-form-item>
</template>

<style scoped></style>
