<script setup lang="ts">
import ComponentConfig from "./components/component-config/index.vue";
import ComponentList from "./components/component-list/ComponentList.vue";
import FormTemplate from "./components/form-template/FormTemplate.vue";

defineOptions({ name: "FormGenerate" });
</script>

<template>
  <section class="w-full h-full flex flex-col">
    <header class="flex items-center h-[48px]">
      <h3 class="pl-2">表单生成器</h3>
    </header>
    <section class="flex-1 min-h-0 flex">
      <ComponentList></ComponentList>
      <FormTemplate></FormTemplate>
      <ComponentConfig></ComponentConfig>
    </section>
  </section>
</template>

<style scoped lang="scss">
header {
  border-bottom: 1px dashed #dcdfe6;
}
</style>
