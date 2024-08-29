<script setup lang="ts">
import useFormGenerate from "@/stores/useFormGenerate";

import FormConfig from "./FormConfig.vue";
import InputConfig from "./InputConfig.vue";

const { selectedOption } = storeToRefs(useFormGenerate());
defineOptions({ name: "ComponentConfig" });
</script>

<template>
  <div class="attr-container w-[300px] px-2">
    <el-tabs class="w-full h-full">
      <el-tab-pane class="w-full h-full" label="组件配置">
        <InputConfig v-if="selectedOption" :key="selectedOption.id"></InputConfig>
      </el-tab-pane>
      <el-tab-pane class="w-full h-full" label="表单配置">
        <FormConfig></FormConfig>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.attr-container {
  border-left: 1px dashed #dcdfe6;
}
</style>
