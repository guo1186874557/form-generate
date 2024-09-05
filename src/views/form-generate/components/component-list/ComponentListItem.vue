<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { VueDraggable } from "vue-draggable-plus";

import type { ComponentObj } from "@/el-obj/component";

defineProps<{
  title: string;
  options: ComponentObj[];
  name?: string;
}>();
</script>

<template>
  <el-collapse-item :name="name">
    <template #title> <h3 class="px-2">基础组件</h3> </template>
    <VueDraggable
      :group="{ name: 'component-drag', put: false, pull: 'clone' }"
      :model-value="options"
      :clone="(item: ComponentObj) => item.clone()"
      :sort="false"
      class="component-box">
      <div class="component-box_item" v-for="item in options" :key="item.id">
        <Icon class="component-box_item_icon" width="24" :icon="item.icon" />
        <div class="line-clamp-1">{{ item.name }}</div>
      </div>
    </VueDraggable>
  </el-collapse-item>
</template>

<style scoped lang="scss">
.el-collapse-item {
  :deep(.el-collapse-item__content) {
    padding-bottom: 10px;
  }
  .component-box {
    padding: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    .component-box_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 5px;
      cursor: pointer;
      transition: all 0.3s;
      .component-box_item_icon {
        transition: all 0.3s;
      }
      span {
        font-size: 14px;
        color: #606266;
      }
      &:hover {
        background-color: #f5f5f5;
        border-color: #5eadff;
        cursor: move;
        .component-box_item_icon {
          color: #5eadff;
        }
      }
    }
  }
}
</style>
