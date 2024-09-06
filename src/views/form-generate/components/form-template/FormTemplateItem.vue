<script setup lang="ts">
import { Icon } from "@iconify/vue";

import type { ComponentObj } from "@/el-obj/component";
import type { InputObj } from "@/el-obj/input";

defineProps<{
  option: ComponentObj;
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
  <div class="relative my-[10px]" :class="{ active: option.isSelect }" @click="$emit('click')">
    <!-- 拖拽提示 -->
    <div v-if="option.isSelect" class="handle move-tooltip">
      <Icon width="14" icon="carbon:move"></Icon>
      <span class="text-[12px]">{{ option.name }}</span>
    </div>
    <!-- 操作栏 -->
    <div v-if="option.isSelect" class="operation-bar">
      <Icon
        class="cursor-pointer hover:text-blue-300"
        width="20"
        icon="material-symbols-light:delete-outline"
        @click="$emit('del')"></Icon>

      <Icon class="cursor-pointer hover:text-blue-300" width="20" icon="ph:copy" @click="$emit('copy')"></Icon>
    </div>
    <!-- 表单 -->
    <el-form-item
      :label="option.label"
      :label-width="option.labelWidth"
      :label-position="option.labelPosition as any"
      :required="option.required"
      class="m-0">
      <el-input
        :model-value="option.defaultValue as any"
        :type="(option as InputObj).type"
        :placeholder="option.placeholder"
        :disabled="option.disabled"
        :rows="(option as InputObj).rows" />
    </el-form-item>
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
  border: $borderWidth solid $borderColor;
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
