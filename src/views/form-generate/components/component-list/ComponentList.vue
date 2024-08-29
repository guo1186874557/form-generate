<script setup lang="ts">
import useFormGenerate from "@/stores/useFormGenerate";

import ComponentListItem from "./ComponentListItem.vue";

const { activeName, componentsList } = storeToRefs(useFormGenerate());
</script>

<template>
  <el-scrollbar class="component-list w-[250px]">
    <el-collapse v-model="activeName">
      <ComponentListItem
        v-for="(item, index) in componentsList"
        :name="item.name"
        :key="index"
        :title="item.title"
        :options="item.options"></ComponentListItem>
    </el-collapse>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.component-list {
  border-right: 1px dashed #dcdfe6;
}
</style>
