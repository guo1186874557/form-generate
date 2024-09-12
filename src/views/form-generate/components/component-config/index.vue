<script setup lang="ts">
import useActiveVars from "@/stores/useActiveVars";
import useFormGenerate from "@/stores/useFormGenerate";
import FormItemConfig from "@/views/form-generate/components/component-config/FormItemConfig.vue";

import FormConfig from "./FormConfig.vue";

const { selectComponentObj } = storeToRefs(useActiveVars());
const { rootForm } = storeToRefs(useFormGenerate());

defineOptions({ name: "ComponentConfig" });
</script>

<template>
  <div class="attr-container w-[300px] px-2">
    <el-tabs class="w-full h-full">
      <el-tab-pane class="w-full h-full" label="组件配置">
        <template v-if="selectComponentObj">
          <FormItemConfig :key="selectComponentObj.id" v-model="selectComponentObj"></FormItemConfig>
        </template>
        <el-empty v-else description="请先选择组件"></el-empty>
      </el-tab-pane>
      <el-tab-pane class="w-full h-full" label="表单配置">
        <FormConfig v-model="rootForm"></FormConfig>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.attr-container {
  border-left: 1px dashed #dcdfe6;
}
</style>
