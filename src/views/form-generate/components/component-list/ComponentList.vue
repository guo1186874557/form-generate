<script setup lang="ts">
import { InputComponentObject } from "component-object/src/obj/input";

import { ComponentCategory } from "@/el-obj/enum";
import useActiveVars from "@/stores/useActiveVars";

import ComponentListItem from "./ComponentListItem.vue";

const { componentListActive } = storeToRefs(useActiveVars());

const componentsList = ref([
  {
    title: "基础组件",
    name: ComponentCategory.BASIC,
    options: [new InputComponentObject()],
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
