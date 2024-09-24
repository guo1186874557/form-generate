<script setup lang="ts">
import { nanoid } from "nanoid";

import useActiveVars from "@/stores/useActiveVars";
import { ComponentCategory, ComponentType } from "@/types/enum";
import type { ComponentListType } from "@/views/form-generate/components/component-list/interface";

import ComponentListItem from "./ComponentListItem.vue";

const { componentListActive } = storeToRefs(useActiveVars());

const componentsList = ref<ComponentListType[]>([
  {
    title: "基础组件",
    name: ComponentCategory.BASIC,
    options: [
      {
        id: nanoid(),
        name: "输入框",
        icon: "iconoir:input-field",
        type: ComponentType.INPUT,
      },
      {
        id: nanoid(),
        name: "单选框",
        icon: "akar-icons:radio-fill",
        type: ComponentType.RADIO,
      },
      {
        id: nanoid(),
        name: "多选框",
        icon: "mdi:checkbox-outline",
        type: ComponentType.CHECKBOX,
      },
      {
        id: nanoid(),
        name: "下拉框",
        icon: "tabler:select",
        type: ComponentType.SELECT,
      },
      {
        id: nanoid(),
        name: "日期选择",
        icon: "lets-icons:date-range-duotone",
        type: ComponentType.DATA_PICKER,
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
