<script setup lang="ts">
import { Icon } from "@iconify/vue";

import { FormItem } from "@/model";

defineProps<{
  option: FormItem;
}>();

const emit = defineEmits<{
  click: [];
  del: [];
  copy: [];
}>();

onMounted(() => {
  emit("click");
});
</script>

<template>
  <div class="relative my-[10px]" :class="{ active: option.selected }" @click="$emit('click')">
    <!-- 拖拽提示 -->
    <div v-if="option.selected" class="handle move-tooltip">
      <Icon width="14" icon="carbon:move"></Icon>
    </div>
    <!-- 操作栏 -->
    <div v-if="option.selected" class="operation-bar">
      <Icon
        class="cursor-pointer hover:text-blue-300"
        width="20"
        icon="material-symbols-light:delete-outline"
        @click="$emit('del')"></Icon>
      <Icon class="cursor-pointer hover:text-blue-300" width="20" icon="ph:copy" @click="$emit('copy')"></Icon>
    </div>
    <!-- 表单 -->
    <FormItemRenderer class="m-0" :instance="option"></FormItemRenderer>
  </div>
</template>

<style lang="scss" scoped>
$borderColor: #409eff;
$borderWidth: 2px;

@mixin selectItem() {
  position: absolute;
  background-color: $borderColor;
  z-index: 2;
  display: flex;
  align-items: center;
  color: #fff;
}

.active {
  outline: $borderWidth solid $borderColor;
}
.move-tooltip {
  top: -$borderWidth;
  left: -$borderWidth;
  padding: 2px 3px;
  cursor: move;
  @include selectItem();
}
.operation-bar {
  bottom: -$borderWidth;
  right: -$borderWidth;
  gap: 3px;
  @include selectItem();
  padding: 2px;
}
</style>
