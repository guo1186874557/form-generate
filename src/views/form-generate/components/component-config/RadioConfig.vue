<script setup lang="ts">
import { Radio } from "@/model";
import OptionsConfig from "@/views/form-generate/components/component-config/components/OptionsConfig.vue";

const instance = defineModel<Radio>({ required: true });
</script>

<template>
  <OptionsConfig v-model="instance.attr.options"></OptionsConfig>
  <el-form-item label="默认值">
    <el-select-v2 clearable v-model="instance.basicAttr.defaultValue" :options="instance.attr.options"></el-select-v2>
  </el-form-item>
</template>

<style scoped></style>
