<script setup lang="ts">
import { nanoid } from "nanoid";

import useActiveVars from "@/stores/useActiveVars";
import { ComponentType } from "@/types/enum";
import type { ComponentListType } from "@/views/form-generate/components/component-list/interface";

import ComponentListItem from "./ComponentListItem.vue";

const { componentListActive } = storeToRefs(useActiveVars());

const componentsList = ref<ComponentListType[]>([
  {
    title: "基础组件",
    name: "basic",
    options: [
      {
        id: nanoid(),
        name: "输入框",
        icon: "iconoir:input-field",
        type: ComponentType.INPUT,
      },
    ],
  },
]);
</script>

<template>
  <el-scrollbar class="component-list w-[250px]">
    <el-collapse v-model="componentListActive">
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
